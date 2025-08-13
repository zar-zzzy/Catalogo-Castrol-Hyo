/*
Actualiza description, specs y features en script.js desde un Excel.
No toca name, viscosity ni formats.

Excel esperado (primera hoja):
- name: string (coincide exactamente con el nombre en products)
- viscosity: string (coincide exactamente con la viscosidad en products)
- description: string
- specs.api (opcional)
- specs.acea (opcional)
- specs.jaso (opcional)
- specs.dexos (opcional)
- specs.vw (opcional)
- specs.iso (opcional)
- specs.type (opcional)
- features: separado por | (ej: "Alta protección|Bajo desgaste|Larga vida")

Empareja por name + viscosity.
*/

const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const recast = require('recast');

const PROJECT_ROOT = process.cwd();
const SCRIPT_PATH = path.join(PROJECT_ROOT, 'script.js');
// Cambia el nombre del archivo aquí si es distinto
const EXCEL_PATH = path.join(PROJECT_ROOT, 'datos productos (1).xlsx');

function normalizeString(str) {
    return String(str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizeViscosity(str) {
    if (!str) return '';
    const m = String(str).match(/(\d{1,2})\s*W\s*-?\s*(\d{2})/i);
    if (!m) return '';
    return `${m[1]}W-${m[2]}`;
}

function stripViscosityFromName(name) {
    return String(name).replace(/\d{1,2}\s*W\s*-?\s*\d{2}/ig, '').replace(/\s+/g, ' ').trim();
}

function loadExcelRows() {
    if (!fs.existsSync(EXCEL_PATH)) {
        throw new Error(`No se encontró el Excel en: ${EXCEL_PATH}`);
    }
    const wb = xlsx.readFile(EXCEL_PATH);
    const firstSheet = wb.SheetNames[0];
    const ws = wb.Sheets[firstSheet];
    const rows = xlsx.utils.sheet_to_json(ws, { defval: '' });
    const normalized = rows.map((r) => {
        // Esquema español detectado
        const producto = r.PRODUCTO || r.Producto || r.producto || '';
        const atributos = r['PRINCIPALES ATRIBUTOS DEL PRODUCTO'] || '';
        const adicionales = r['ATRIBUTOS ADICIONALES'] || '';
        const importantes = r['ES IMPORTANTE SABER…'] || r['ES IMPORTANTE SABER...'] || '';

        // Viscosidad extraída del nombre del producto
        const viscosity = normalizeViscosity(producto);
        const name = String(producto).trim();

        // Derivar specs de "PRINCIPALES ATRIBUTOS..."
        const textSpecs = `${atributos}`;
        const specs = {
            api: '', acea: '', jaso: '', dexos: '', vw: '', iso: '', type: ''
        };
        const find = (re) => {
            const m = textSpecs.match(re);
            return m ? m[1].replace(/\s+/g, ' ').trim() : '';
        };
        specs.api = find(/API\s*([A-Z0-9/ .-]+)/i);
        specs.acea = find(/ACEA\s*([A-Z0-9/ .,-]+)/i);
        specs.jaso = find(/JASO\s*([A-Z0-9/ .-]+)/i);
        specs.dexos = find(/DEXOS\s*([A-Z0-9/ .-]+)/i);
        // Capturar todos los códigos VW presentes en la línea
        const vwMatch = textSpecs.match(/VW\s*([0-9]{3}[^\n,;]*)/i);
        specs.vw = vwMatch ? vwMatch[1].replace(/\s+/g, ' ').trim() : '';
        specs.iso = find(/ISO\s*([A-Z0-9/ .-]+)/i);

        // Features desde ATRIBUTOS ADICIONALES (por líneas)
        const features = String(adicionales)
            .split(/\r?\n|\.|;|\u2022|-/)
            .map((s) => s.replace(/\s+/g, ' ').trim())
            .filter((s) => s && s.length > 2);

        // Descripción: priorizar "ES IMPORTANTE SABER..."; si no, primera línea de adicionales
        let description = String(importantes).replace(/\s+/g, ' ').trim();
        if (!description) {
            description = (features[0] || '').toString();
        }

        return {
            name,
            viscosity,
            description,
            specs,
            features,
            _matchKey: normalizeString(stripViscosityFromName(name).replace(/castrol/ig, '')),
        };
    }).filter((r) => r.name && r.viscosity);
    return normalized;
}

function updateProducts(ast, excelRows) {
    const b = recast.types.builders;
    let updatedCount = 0;

    recast.types.visit(ast, {
        visitVariableDeclarator(pathVar) {
            const { node } = pathVar;
            if (
                node.id && node.id.name === 'products' &&
                node.init && node.init.type === 'ObjectExpression'
            ) {
                // Recorremos categorías
                node.init.properties.forEach((prop) => {
                    if (prop.type !== 'ObjectProperty' && prop.type !== 'Property') return;
                    const value = prop.value;
                    if (!value || value.type !== 'ArrayExpression') return;

                    // Recorremos productos de la categoría
                    value.elements.forEach((el) => {
                        if (!el || el.type !== 'ObjectExpression') return;
                        let nameNode, viscosityNode, descriptionNode, specsNode;
                        // Buscar campos
                        el.properties.forEach((p) => {
                            if ((p.key.name || p.key.value) === 'name') nameNode = p;
                            if ((p.key.name || p.key.value) === 'viscosity') viscosityNode = p;
                            if ((p.key.name || p.key.value) === 'description') descriptionNode = p;
                            if ((p.key.name || p.key.value) === 'specs') specsNode = p;
                        });
                        if (!nameNode || !viscosityNode) return;
                        const nameVal = nameNode.value.value;
                        const viscosityVal = viscosityNode.value.value;

                        const productMatchKey = normalizeString(
                            stripViscosityFromName(nameVal).replace(/castrol/ig, '')
                        );
                        const viscosityKey = normalizeViscosity(viscosityVal);

                        const candidates = excelRows.filter(
                            (r) => r._matchKey === productMatchKey && r.viscosity === viscosityKey
                        );
                        const match = candidates.length === 1 ? candidates[0] : null;
                        if (!match) return;

                        // Actualizar description si viene
                        if (match.description) {
                            if (descriptionNode) {
                                descriptionNode.value = b.stringLiteral(match.description);
                            } else {
                                el.properties.push(
                                    b.objectProperty(
                                        b.identifier('description'),
                                        b.stringLiteral(match.description)
                                    )
                                );
                            }
                        }

                        // Asegurar specs existe como objeto
                        if (!specsNode) {
                            specsNode = b.objectProperty(
                                b.identifier('specs'),
                                b.objectExpression([])
                            );
                            el.properties.push(specsNode);
                        }
                        if (specsNode.value.type !== 'ObjectExpression') {
                            specsNode.value = b.objectExpression([]);
                        }

                        const specsMap = new Map();
                        specsNode.value.properties.forEach((sp) => {
                            specsMap.set(sp.key.name || sp.key.value, sp);
                        });

                        // Campos simples de specs
                        const simpleKeys = ['api', 'acea', 'jaso', 'dexos', 'vw', 'iso', 'type'];
                        simpleKeys.forEach((key) => {
                            const val = match.specs[key];
                            if (typeof val === 'string' && val.length > 0) {
                                if (specsMap.has(key)) {
                                    specsMap.get(key).value = b.stringLiteral(val);
                                } else {
                                    specsNode.value.properties.push(
                                        b.objectProperty(b.identifier(key), b.stringLiteral(val))
                                    );
                                }
                            }
                        });

                        // features como array de strings
                        if (Array.isArray(match.features) && match.features.length > 0) {
                            const featuresElems = match.features.map((f) => b.stringLiteral(f));
                            // buscar nodo features
                            let featuresNode = specsNode.value.properties.find(
                                (p) => (p.key.name || p.key.value) === 'features'
                            );
                            if (featuresNode) {
                                featuresNode.value = b.arrayExpression(featuresElems);
                            } else {
                                specsNode.value.properties.push(
                                    b.objectProperty(
                                        b.identifier('features'),
                                        b.arrayExpression(featuresElems)
                                    )
                                );
                            }
                        }

                        updatedCount += 1;
                    });
                });
                return false; // no descender más
            }
            this.traverse(pathVar);
        },
    });

    return updatedCount;
}

function main() {
    const excelRows = loadExcelRows();
    const source = fs.readFileSync(SCRIPT_PATH, 'utf8');
    const ast = recast.parse(source, { parser: require('recast/parsers/babel') });
    const updated = updateProducts(ast, excelRows);
    const output = recast.print(ast, { quote: 'single' }).code;
    fs.writeFileSync(SCRIPT_PATH, output, 'utf8');
    console.log(`Productos actualizados: ${updated}`);
}

if (require.main === module) {
    try {
        main();
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}


