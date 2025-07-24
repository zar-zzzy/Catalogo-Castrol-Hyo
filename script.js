// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Global state
let currentFilters = {
    search: '',
    category: '',
    oilType: ''
};
let currentSort = 'name';
let currentView = 'grid';
let comparisonList = [];
let allProducts = [];

// Product data with enhanced specifications
const products = {
    diesel: [
        // Full Sintético
        { 
            id: 'd-s1', 
            name: 'Castrol Vecton Long Drain E6/E9 10W-40', 
            viscosity: '10W-40', 
            oilType: 'Full Sintético', 
            format: '5 gal / 208 L', 
            description: 'Aceite sintético de larga duración para motores diésel Euro VI y anteriores.', 
            category: 'diesel', 
            image: 'img/Vecton LD CK-4.jpg', 
            specs: { 
                api: 'CK-4', 
                acea: 'E6/E9', 
                features: [
                    'Intervalos de cambio extendidos hasta 120,000 km',
                    'Protección superior contra desgaste',
                    'Control excepcional de hollín',
                    'Resistencia a la oxidación mejorada',
                    'Compatible con sistemas de postratamiento'
                ]
            }
        },
        { 
            id: 'd-s2', 
            name: 'Castrol Vecton LD CK-4/E9 10W-30', 
            viscosity: '10W-30', 
            oilType: 'Full Sintético', 
            format: '5 gal / 208 L', 
            description: 'Aceite sintético para motores diésel modernos, máxima eficiencia y protección.', 
            category: 'diesel', 
            image: 'img/CastrolVectonLD.jpg', 
            specs: { 
                api: 'CK-4', 
                acea: 'E9', 
                features: [
                    'Eficiencia de combustible mejorada',
                    'Protección avanzada del motor',
                    'Control superior de depósitos',
                    'Estabilidad térmica excepcional'
                ]
            }
        },
        // Sintético
        { 
            id: 'd-s3', 
            name: 'Castrol Vecton CK-4/SN 15W-40', 
            viscosity: '15W-40', 
            oilType: 'Sintético', 
            format: '5 gal / 208 L', 
            description: 'Aceite sintético para motores diésel de alto desempeño y protección avanzada.', 
            category: 'diesel', 
            image: 'img/Vecton CK-4.jpg', 
            specs: { 
                api: 'CK-4/SN', 
                features: [
                    'Tecnología sintética avanzada',
                    'Protección contra la corrosión',
                    'Control de viscosidad a altas temperaturas',
                    'Compatibilidad con biodiesel'
                ]
            }
        },
        // Semi-sintético
        { 
            id: 'd-ss1', 
            name: 'Castrol CRB Multi CK-4 15W-40', 
            viscosity: '15W-40', 
            oilType: 'Semi-sintético', 
            format: '18.9 L / 5 gal', 
            description: 'Aceite semi-sintético para motores diésel, excelente limpieza y protección.', 
            category: 'diesel', 
            image: 'img/CRB Multi CK-4.jpg', 
            specs: { 
                api: 'CK-4', 
                features: [
                    'Fórmula semi-sintética balanceada',
                    'Limpieza superior del motor',
                    'Protección multi-grado',
                    'Rendimiento confiable'
                ]
            }
        },
        // Mineral
        { 
            id: 'd-m1', 
            name: 'Castrol CRB Turbomax CI-4/SL/E7 15W-40', 
            viscosity: '15W-40', 
            oilType: 'Mineral', 
            format: '18.9 L / 5 gal', 
            description: 'Aceite mineral para motores diésel, protección robusta y confiable.', 
            category: 'diesel', 
            image: 'img/CRB Tmax CI-4-SL-E7 .jpg', 
            specs: { 
                api: 'CI-4/SL', 
                acea: 'E7', 
                features: [
                    'Base mineral de alta calidad',
                    'Protección contra desgaste',
                    'Control de espesamiento por hollín',
                    'Excelente flujo en frío'
                ]
            }
        },
        { 
            id: 'd-m2', 
            name: 'Castrol CRB Viscus 25W-60', 
            viscosity: '25W-60', 
            oilType: 'Mineral', 
            format: 'galón / 946 ml', 
            description: 'Aceite mineral de alta viscosidad para motores diésel exigentes.', 
            category: 'diesel', 
            image: 'img/CRB Viscus 25W-60.jpg', 
            specs: { 
                features: [
                    'Alta viscosidad para motores desgastados',
                    'Sellado mejorado',
                    'Reducción de consumo de aceite',
                    'Protección en condiciones extremas'
                ]
            }
        },
        { 
            id: 'd-m3', 
            name: 'Castrol CRB Monograde SAE 40 / 50', 
            viscosity: 'SAE 40 / 50', 
            oilType: 'Mineral', 
            format: '5 gal / 208 L', 
            description: 'Aceite monogrado mineral para motores diésel convencionales.', 
            category: 'diesel', 
            image: 'img/CRB Monograde SAE 40 - 50.jpg', 
            specs: { 
                type: 'Monogrado', 
                features: [
                    'Fórmula monogrado tradicional',
                    'Ideal para climas cálidos',
                    'Costo-efectivo',
                    'Protección básica confiable'
                ]
            }
        },
        { 
            id: 'd-m4', 
            name: 'Castrol HD Motor Oil SAE 40 / 50', 
            viscosity: 'SAE 40 / 50', 
            oilType: 'Mineral', 
            format: '12x946 ml', 
            description: 'Aceite mineral para motores diésel, protección básica y económica.', 
            category: 'diesel', 
            image: 'img/HD Motor Oil SAE 40 - 50.jpg', 
            specs: { 
                type: 'Monogrado', 
                features: [
                    'Opción económica',
                    'Para uso general',
                    'Fácil disponibilidad',
                    'Rendimiento básico'
                ]
            }
        }
    ],
    gasolina: [
        // Full Sintético
        { 
            id: 'g-s1', 
            name: 'Castrol EDGE Professional V 0W-20', 
            viscosity: '0W-20', 
            oilType: 'Full Sintético', 
            format: '6x946 ml', 
            description: 'Aceite sintético premium para motores gasolina modernos.', 
            category: 'gasolina', 
            image: 'img/EDGE Prof V 0W-20.jpg', 
            specs: { 
                api: 'SP', 
                features: [
                    'Tecnología Fluid TITANIUM',
                    'Máxima eficiencia de combustible',
                    'Arranque en frío superior',
                    'Protección avanzada del motor'
                ]
            }
        },
        { 
            id: 'g-s2', 
            name: 'Castrol EDGE Professional EC 0W-20', 
            viscosity: '0W-20', 
            oilType: 'Full Sintético', 
            format: '6x946 ml', 
            description: 'Aceite sintético para máxima eficiencia y protección.', 
            category: 'gasolina', 
            image: 'img/EDGE Professional EC 0W-20.jpg', 
            specs: { 
                api: 'SP', 
                features: [
                    'Eco-eficiencia certificada',
                    'Reducción de emisiones',
                    'Protección del catalizador',
                    'Rendimiento de combustible optimizado'
                ]
            }
        },
        { 
            id: 'g-s3', 
            name: 'Castrol EDGE 0W-30 HC1', 
            viscosity: '0W-30', 
            oilType: 'Full Sintético', 
            format: '12x1 L', 
            description: 'Aceite sintético para motores de alto rendimiento.', 
            category: 'gasolina', 
            image: 'img/EDGE 0W-30 HC1.jpg', 
            specs: { 
                api: 'SP', 
                features: [
                    'Fórmula HC1 avanzada',
                    'Resistencia extrema a la presión',
                    'Protección contra desgaste',
                    'Flujo instantáneo'
                ]
            }
        },
        { 
            id: 'g-s4', 
            name: 'Castrol EDGE US Dexos 5W-30', 
            viscosity: '5W-30', 
            oilType: 'Full Sintético', 
            format: '6x946 ml / 5 qt', 
            description: 'Aceite sintético Dexos para motores gasolina.', 
            category: 'gasolina', 
            image: 'img/EDGE US Dexos 5W-30.jpg', 
            specs: { 
                api: 'SP', 
                dexos: 'dexos1 Gen 3', 
                features: [
                    'Certificación dexos1 Gen 3',
                    'Especialmente para GM',
                    'Protección de inyectores',
                    'Control de depósitos'
                ]
            }
        },
        { 
            id: 'g-s5', 
            name: 'Castrol EDGE K 5W-30', 
            viscosity: '5W-30', 
            oilType: 'Full Sintético', 
            format: '5 qt', 
            description: 'Aceite sintético para motores de última generación.', 
            category: 'gasolina', 
            image: 'img/EDGE K 5W-30.jpg', 
            specs: { 
                api: 'SP', 
                features: [
                    'Tecnología K-Series',
                    'Protección avanzada',
                    'Limpieza del motor',
                    'Durabilidad extendida'
                ]
            }
        },
        { 
            id: 'g-s6', 
            name: 'Castrol EDGE A3/B4 5W-40', 
            viscosity: '5W-40', 
            oilType: 'Full Sintético', 
            format: '6x946 ml', 
            description: 'Aceite sintético para motores de alto desempeño.', 
            category: 'gasolina', 
            image: 'img/EDGE A3-B4 5W-40.jpg', 
            specs: { 
                api: 'SP', 
                acea: 'A3/B4', 
                features: [
                    'Especificación A3/B4',
                    'Para motores de alta potencia',
                    'Resistencia al cizallamiento',
                    'Protección en condiciones severas'
                ]
            }
        },
        { 
            id: 'g-s7', 
            name: 'Castrol EDGE Turbo Diesel 5W-40', 
            viscosity: '5W-40', 
            oilType: 'Full Sintético', 
            format: '12x1 L / 4x4 L', 
            description: 'Aceite sintético para motores turbo gasolina y diésel.', 
            category: 'gasolina', 
            image: 'img/EDGE Turbo Diesel 5W-40.jpg', 
            specs: { 
                api: 'SP/CK-4', 
                features: [
                    'Dual gasolina/diésel',
                    'Protección turbo',
                    'Resistencia a altas temperaturas',
                    'Control de depósitos'
                ]
            }
        },
        // Semi-sintético
        { 
            id: 'g-ss1', 
            name: 'Castrol MAGNATEC C3 5W-30', 
            viscosity: '5W-30', 
            oilType: 'Semi-sintético', 
            format: '12x1 L / 4x4 L', 
            description: 'Aceite semi-sintético con moléculas inteligentes para protección continua.', 
            category: 'gasolina', 
            image: 'img/MAGNATEC C3 5W-30.jpg', 
            specs: { 
                api: 'SP', 
                acea: 'C3', 
                features: [
                    'Moléculas inteligentes DUALOCK',
                    'Protección desde el arranque',
                    'Compatible con DPF',
                    'Reducción de emisiones'
                ]
            }
        },
        { 
            id: 'g-ss2', 
            name: 'Castrol MAGNATEC 508 88 5W-40', 
            viscosity: '5W-40', 
            oilType: 'Semi-sintético', 
            format: '12x1 L', 
            description: 'Aceite semi-sintético para motores europeos.', 
            category: 'gasolina', 
            image: 'img/MAGNATEC 508 88 5W-40.jpg', 
            specs: { 
                vw: 'VW 508 88', 
                features: [
                    'Especificación VW 508 88',
                    'Para motores VAG',
                    'Intervalos extendidos',
                    'Low SAPS'
                ]
            }
        },
        { 
            id: 'g-ss3', 
            name: 'Castrol MAGNATEC 10W-30', 
            viscosity: '10W-30', 
            oilType: 'Semi-sintético', 
            format: '6x946 ml / 3.78 L', 
            description: 'Aceite semi-sintético para motores gasolina.', 
            category: 'gasolina', 
            image: 'img/MAGNATEC 10W-30.jpg', 
            specs: { 
                api: 'SN', 
                features: [
                    'Tecnología MAGNATEC',
                    'Protección inteligente',
                    'Adherencia molecular',
                    'Arranque protegido'
                ]
            }
        },
        { 
            id: 'g-ss4', 
            name: 'Castrol MAGNATEC 10W-40', 
            viscosity: '10W-40', 
            oilType: 'Semi-sintético', 
            format: '6x946 ml / 3.78 L', 
            description: 'Aceite semi-sintético para motores gasolina.', 
            category: 'gasolina', 
            image: 'img/MAGNATEC 10W-40.jpg', 
            specs: { 
                api: 'SN', 
                features: [
                    'Protección continua 24/7',
                    'Reduce el desgaste del motor',
                    'Fórmula balanceada',
                    'Confiabilidad comprobada'
                ]
            }
        },
        { 
            id: 'g-ss5', 
            name: 'Castrol MAGNATEC 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Semi-sintético', 
            format: '6x946 ml / 3.78 L', 
            description: 'Aceite semi-sintético para motores gasolina de alto kilometraje.', 
            category: 'gasolina', 
            image: 'img/MAGNATEC 20W-50.jpg', 
            specs: { 
                api: 'SN', 
                features: [
                    'Ideal para alto kilometraje',
                    'Sella fugas menores',
                    'Protección reforzada',
                    'Viscosidad estable'
                ]
            }
        },
        // Mineral
        { 
            id: 'g-m1', 
            name: 'Castrol GTX 5W-30', 
            viscosity: '5W-30', 
            oilType: 'Mineral', 
            format: '6x946 ml / 3x4 L', 
            description: 'Aceite mineral para motores gasolina, protección confiable.', 
            category: 'gasolina', 
            image: 'img/GTX 5W-30.jpg', 
            specs: { 
                api: 'SN', 
                features: [
                    'Protección GTX probada',
                    'Limpieza superior',
                    'Control de lodos',
                    'Valor excepcional'
                ]
            }
        },
        { 
            id: 'g-m2', 
            name: 'Castrol GTX 10W-30', 
            viscosity: '10W-30', 
            oilType: 'Mineral', 
            format: '12x1 qt / 3.78 L', 
            description: 'Aceite mineral para motores gasolina.', 
            category: 'gasolina', 
            image: 'img/GTX 10W-30.jpg', 
            specs: { 
                api: 'SN', 
                features: [
                    'Fórmula GTX clásica',
                    'Protección confiable',
                    'Disponibilidad amplia',
                    'Precio accesible'
                ]
            }
        },
        { 
            id: 'g-m3', 
            name: 'Castrol GTX 10W-40', 
            viscosity: '10W-40', 
            oilType: 'Mineral', 
            format: '3.78 L', 
            description: 'Aceite mineral para motores gasolina.', 
            category: 'gasolina', 
            image: 'img/GTX 10W-40.jpg', 
            specs: { 
                api: 'SN', 
                features: [
                    'Viscosidad versátil',
                    'Protección balanceada',
                    'Para uso general',
                    'Confiabilidad GTX'
                ]
            }
        },
        { 
            id: 'g-m4', 
            name: 'Castrol GTX 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Mineral', 
            format: '12x946 ml / 5x3.78 L', 
            description: 'Aceite mineral para motores gasolina de alto kilometraje.', 
            category: 'gasolina', 
            image: 'img/GTX 20W-50.jpg', 
            specs: { 
                api: 'SN', 
                features: [
                    'Para motores con desgaste',
                    'Viscosidad alta',
                    'Sellado mejorado',
                    'Reducción de consumo'
                ]
            }
        },
        { 
            id: 'g-m5', 
            name: 'Castrol GTX Gas 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Mineral', 
            format: '12x946 ml / 3.78 L', 
            description: 'Aceite mineral para motores a gas.', 
            category: 'gasolina', 
            image: 'img/GTX Gas 20W-50.jpg', 
            specs: { 
                type: 'Gas/GNC', 
                features: [
                    'Especial para gas natural',
                    'Resistencia a la nitración',
                    'Protección de válvulas',
                    'Compatibilidad GNC/GLP'
                ]
            }
        },
        { 
            id: 'g-m6', 
            name: 'Castrol GTX Alto Kilometraje 25W-60', 
            viscosity: '25W-60', 
            oilType: 'Mineral', 
            format: '3.78 L', 
            description: 'Aceite mineral para motores de alto kilometraje.', 
            category: 'gasolina', 
            image: 'img/GTX Alto KM 25W-60.jpg', 
            specs: { 
                type: 'Alto Kilometraje', 
                features: [
                    'Fórmula para alto km',
                    'Aditivos sellantes',
                    'Reduce fugas de aceite',
                    'Rejuvenece sellos'
                ]
            }
        }
    ],
    motos: [
        // Full Sintético
        { 
            id: 'm-s1', 
            name: 'Castrol POWER 1 Ultimate 4T 10W-40', 
            viscosity: '10W-40', 
            oilType: 'Full Sintético', 
            format: '12x1 L', 
            description: 'Aceite sintético para motos de alto rendimiento.', 
            category: 'motos', 
            image: 'img/POWER 1 Ultimate 4T 10W-40-4L.jpg', 
            specs: { 
                api: 'SN', 
                jaso: 'MA2', 
                features: [
                    'Tecnología sintética avanzada',
                    'Protección del embrague húmedo',
                    'Resistencia al cizallamiento',
                    'Rendimiento deportivo'
                ]
            }
        },
        { 
            id: 'm-s2', 
            name: 'Castrol POWER 1 4T 15W-50', 
            viscosity: '15W-50', 
            oilType: 'Full Sintético', 
            format: '12x1 L', 
            description: 'Aceite sintético para motos deportivas.', 
            category: 'motos', 
            image: 'img/POWER 1 4T 15W-50.jpg', 
            specs: { 
                api: 'SN', 
                jaso: 'MA2', 
                features: [
                    'Para altas revoluciones',
                    'Protección en condiciones extremas',
                    'Estabilidad térmica',
                    'Limpieza del motor'
                ]
            }
        },
        // Semi-sintético
        { 
            id: 'm-ss1', 
            name: 'Castrol Actevo St-St 4T 10W-30', 
            viscosity: '10W-30', 
            oilType: 'Semi-sintético', 
            format: '6x1 L', 
            description: 'Aceite semi-sintético para motos 4T.', 
            category: 'motos', 
            image: 'img/Actevo St-St 4T 10W-30.jpg', 
            specs: { 
                api: 'SL', 
                jaso: 'MA', 
                features: [
                    'Fórmula semi-sintética',
                    'Protección balanceada',
                    'Arranque fácil',
                    'Precio competitivo'
                ]
            }
        },
        { 
            id: 'm-ss2', 
            name: 'Castrol Actevo St-St 4T 10W-40', 
            viscosity: '10W-40', 
            oilType: 'Semi-sintético', 
            format: '6x1 L', 
            description: 'Aceite semi-sintético para motos 4T.', 
            category: 'motos', 
            image: 'img/Actevo St-St 4T 10W-40.jpg', 
            specs: { 
                api: 'SL', 
                jaso: 'MA', 
                features: [
                    'Viscosidad versátil',
                    'Protección del embrague',
                    'Control de depósitos',
                    'Rendimiento confiable'
                ]
            }
        },
        { 
            id: 'm-ss3', 
            name: 'Castrol Actevo St-St 4T 15W-50', 
            viscosity: '15W-50', 
            oilType: 'Semi-sintético', 
            format: '12x1 L', 
            description: 'Aceite semi-sintético para motos 4T.', 
            category: 'motos', 
            image: 'img/Actevo St-St 4T 15W-50.jpg', 
            specs: { 
                api: 'SL', 
                jaso: 'MA', 
                features: [
                    'Alta viscosidad',
                    'Para motores trabajados',
                    'Protección reforzada',
                    'Estabilidad en calor'
                ]
            }
        },
        // Mineral
        { 
            id: 'm-m1', 
            name: 'Castrol POWER 1 V-Twin 4T 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Mineral', 
            format: '6x1 qt', 
            description: 'Aceite mineral para motos V-Twin.', 
            category: 'motos', 
            image: 'img/POWER 1 V-Twin 4T 20W-50.jpg', 
            specs: { 
                api: 'SJ', 
                jaso: 'MA', 
                features: [
                    'Especial para V-Twin',
                    'Protección de cojinetes',
                    'Resistencia al calor',
                    'Para motores grandes'
                ]
            }
        },
        { 
            id: 'm-m2', 
            name: 'Castrol Actevo 4T 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Mineral', 
            format: '6x1 L', 
            description: 'Aceite mineral para motos 4T.', 
            category: 'motos', 
            image: 'img/Actevo Essential 4T 20W-50.jpg', 
            specs: { 
                api: 'SJ', 
                jaso: 'MA', 
                features: [
                    'Base mineral de calidad',
                    'Protección básica',
                    'Precio económico',
                    'Para uso general'
                ]
            }
        },
        { 
            id: 'm-m3', 
            name: 'Castrol Actevo Essential 4T 25W-60', 
            viscosity: '25W-60', 
            oilType: 'Mineral', 
            format: '6x946 ml', 
            description: 'Aceite mineral para motos 4T, protección extra.', 
            category: 'motos', 
            image: 'img/Actevo Essential 4T 25W-60.jpg', 
            specs: { 
                api: 'SJ', 
                features: [
                    'Alta viscosidad',
                    'Para motores desgastados',
                    'Sellado mejorado',
                    'Reducción de humo'
                ]
            }
        },
        { 
            id: 'm-m4', 
            name: 'Castrol Actevo Essential 4T 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Mineral', 
            format: '6x946 ml', 
            description: 'Aceite mineral para motos 4T.', 
            category: 'motos', 
            image: 'img/Actevo Essential 4T 20W-50.jpg', 
            specs: { 
                api: 'SJ', 
                jaso: 'MA', 
                features: [
                    'Línea Essential',
                    'Protección confiable',
                    'Valor por dinero',
                    'Para motos convencionales'
                ]
            }
        }
    ],
    transmisiones: [
        // Sintético
        { 
            id: 't-s1', 
            name: 'Castrol TRANSMAX Universal LL 75W-90', 
            viscosity: '75W-90', 
            oilType: 'Sintético', 
            format: '18.9 L', 
            description: 'Aceite sintético para transmisiones universales.', 
            category: 'transmisiones', 
            image: 'img/TRANSMAX Universal LL 75W-90.jpg', 
            specs: { 
                api: 'GL-5', 
                features: [
                    'Larga duración (LL)',
                    'Protección universal',
                    'Compatibilidad extendida',
                    'Reducción de fricción'
                ]
            }
        },
        // Mineral
        { 
            id: 't-m1', 
            name: 'Castrol TRANSMAX CVT', 
            viscosity: 'CVT', 
            oilType: 'Mineral', 
            format: '18.9 L', 
            description: 'Aceite mineral para transmisiones CVT.', 
            category: 'transmisiones', 
            image: 'img/TRANSMAX CVT.jpg', 
            specs: { 
                type: 'CVT', 
                features: [
                    'Específico para CVT',
                    'Protección de la correa',
                    'Suavidad de cambios',
                    'Durabilidad extendida'
                ]
            }
        },
        { 
            id: 't-m2', 
            name: 'Castrol TRANSMAX ATF DX III', 
            viscosity: 'ATF DX III', 
            oilType: 'Mineral', 
            format: '18.9 L', 
            description: 'Aceite mineral para transmisiones automáticas.', 
            category: 'transmisiones', 
            image: 'img/TRANSMAX ATF DX III.jpg', 
            specs: { 
                type: 'ATF Dexron III', 
                features: [
                    'Especificación Dexron III',
                    'Para GM y compatibles',
                    'Cambios suaves',
                    'Protección de sellos'
                ]
            }
        },
        { 
            id: 't-m3', 
            name: 'Castrol TRANSMAX Mercon V / Dexron III', 
            viscosity: 'Mercon V / Dexron III', 
            oilType: 'Mineral', 
            format: '18.9 L', 
            description: 'Aceite mineral para transmisiones automáticas.', 
            category: 'transmisiones', 
            image: 'img/TRANSMAX Mercon V.jpg', 
            specs: { 
                type: 'ATF Mercon V / Dexron III', 
                features: [
                    'Doble especificación',
                    'Ford y GM compatibilidad',
                    'Versatilidad amplia',
                    'Rendimiento confiable'
                ]
            }
        },
        { 
            id: 't-m4', 
            name: 'Castrol TRANSMAX Dex/Merc', 
            viscosity: 'Dex/Merc', 
            oilType: 'Mineral', 
            format: '18.9 L', 
            description: 'Aceite mineral para transmisiones automáticas.', 
            category: 'transmisiones', 
            image: 'img/TRANSMAX Dex-Merc.jpg', 
            specs: { 
                type: 'ATF Dexron/Mercon', 
                features: [
                    'Fórmula universal',
                    'Amplia compatibilidad',
                    'Precio competitivo',
                    'Disponibilidad global'
                ]
            }
        },
        { 
            id: 't-m5', 
            name: 'Castrol AXLE Limited Slip 80W-90', 
            viscosity: '80W-90', 
            oilType: 'Mineral', 
            format: '18.9 L', 
            description: 'Aceite mineral para diferenciales Limited Slip.', 
            category: 'transmisiones', 
            image: 'img/AXLE Limited Slip 80W-90.jpg', 
            specs: { 
                api: 'GL-5 LS', 
                features: [
                    'Para diferenciales Limited Slip',
                    'Aditivos especiales',
                    'Protección de embragues',
                    'Funcionamiento suave'
                ]
            }
        },
        { 
            id: 't-m6', 
            name: 'Castrol AXLE GL-5 85W-140', 
            viscosity: '85W-140', 
            oilType: 'Mineral', 
            format: '18.9 L', 
            description: 'Aceite mineral para diferenciales GL-5.', 
            category: 'transmisiones', 
            image: 'img/AXLE GL-5 85W-140.jpg', 
            specs: { 
                api: 'GL-5', 
                features: [
                    'Especificación GL-5',
                    'Para servicio severo',
                    'Alta viscosidad',
                    'Protección de engranajes'
                ]
            }
        },
        { 
            id: 't-m7', 
            name: 'Castrol TRANS C 10W / 30', 
            viscosity: '10W / 30', 
            oilType: 'Mineral', 
            format: '5 gal', 
            description: 'Aceite mineral para transmisiones y convertidores.', 
            category: 'transmisiones', 
            image: 'img/TRANS C 10W - 30.jpg', 
            specs: { 
                type: 'Transmisión/Convertidor', 
                features: [
                    'Para convertidores de torque',
                    'Transmisiones manuales',
                    'Versatilidad de uso',
                    'Costo efectivo'
                ]
            }
        }
    ],
    complementarios: [
        { 
            id: 'c1', 
            name: 'Castrol Hyspin AWS 68', 
            viscosity: '68', 
            oilType: '', 
            format: '5 gal', 
            description: 'Aceite hidráulico para sistemas industriales.', 
            category: 'complementarios', 
            image: 'img/Hyspin AWS 68.jpg', 
            specs: { 
                iso: 'ISO VG 68', 
                features: [
                    'Sistema hidráulico industrial',
                    'Anti-desgaste (AWS)',
                    'Filtración superior',
                    'Vida útil extendida'
                ]
            }
        },
        { 
            id: 'c2', 
            name: 'Castrol Hyspin AWS 46', 
            viscosity: '46', 
            oilType: '', 
            format: '5 gal', 
            description: 'Aceite hidráulico para sistemas industriales.', 
            category: 'complementarios', 
            image: 'img/Hyspin AWS 46.jpg', 
            specs: { 
                iso: 'ISO VG 46', 
                features: [
                    'Viscosidad media',
                    'Protección anti-desgaste',
                    'Estabilidad oxidativa',
                    'Para maquinaria industrial'
                ]
            }
        },
        { 
            id: 'c3', 
            name: 'Castrol Universal Tractor Fluid (UTF)', 
            viscosity: '', 
            oilType: '', 
            format: '5 gal', 
            description: 'Fluido universal para tractores y maquinaria agrícola.', 
            category: 'complementarios', 
            image: 'img/Universal Tractor Fluid (UTF).jpg', 
            specs: { 
                type: 'UTF', 
                features: [
                    'Multi-funcional agrícola',
                    'Transmisión, hidráulico, PTO',
                    'Compatible con sellos',
                    'Para equipos John Deere, Case, etc.'
                ]
            }
        },
        { 
            id: 'c4', 
            name: 'Castrol Actevo Essential 2T', 
            viscosity: '2T', 
            oilType: '', 
            format: '100x160 ml / 100x200 ml', 
            description: 'Aceite para motores 2T, presentación económica.', 
            category: 'complementarios', 
            image: 'img/Actevo Essential 2T.jpg', 
            specs: { 
                api: 'TC', 
                jaso: 'FD', 
                features: [
                    'Para motores 2 tiempos',
                    'Presentación conveniente',
                    'Mezcla o inyección',
                    'Precio accesible'
                ]
            }
        }
    ]
};

// DOM elements
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const filterChips = document.querySelectorAll('.filter-chip');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const sortSelect = document.getElementById('sort-select');
const resultsCount = document.getElementById('results-count');
const resetFiltersBtn = document.getElementById('reset-filters');
const productsContainer = document.getElementById('products-container');
const noResultsDiv = document.getElementById('no-results');
const productModal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const addToCompareBtn = document.getElementById('add-to-compare');
const comparisonModal = document.getElementById('comparison-modal');
const comparisonContent = document.getElementById('comparison-content');
const closeComparison = document.getElementById('close-comparison');
const compareToggle = document.getElementById('compare-toggle');
const compareCount = document.getElementById('compare-count');
const mobileCompareToggle = document.getElementById('mobile-compare-toggle');
const mobileCompareCount = document.getElementById('mobile-compare-count');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// Initialize the catalog
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializePerformanceMonitoring();
        initializeProducts();
        loadProducts();
        setupEventListeners();
        setupIntersectionObserver();
        setupKeyboardNavigation();
        
        // Show welcome message
        setTimeout(() => {
            showToast('¡Bienvenido al catálogo Castrol Perú! 🚗');
        }, 1000);
        
    } catch (error) {
        handleError(error, 'DOMContentLoaded');
    }
});

// Hide loading screen when page is fully loaded with enhanced animation
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');
    
    if (loadingScreen) {
        // Loading messages rotation for professional feel
        const loadingMessages = [
            'Cargando productos...',
            'Organizando catálogo...',
            'Preparando filtros...',
            'Finalizando carga...'
        ];
        
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (loadingText && messageIndex < loadingMessages.length - 1) {
                messageIndex++;
                loadingText.textContent = loadingMessages[messageIndex];
            }
        }, 400);
        
        // Add a minimum loading time for better UX
        setTimeout(() => {
            clearInterval(messageInterval);
            if (loadingText) {
                loadingText.textContent = '¡Completado!';
            }
            
            setTimeout(() => {
                // Apply exit animation class
                loadingScreen.classList.add('loading-exit');
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Show welcome toast with professional message
                    showToast('¡Catálogo cargado exitosamente! 🛢️', 'success');
                }, 600);
            }, 300);
        }, 1500); // Minimum 1.5 seconds for professional feel
    }
});

// Initialize products array
function initializeProducts() {
    allProducts = [];
    Object.keys(products).forEach(category => {
        allProducts = allProducts.concat(products[category]);
    });
}

// Load products into the catalog
function loadProducts() {
    measurePerformance('loadProducts', () => {
        const filteredProducts = getFilteredProducts();
        const sortedProducts = sortProducts(filteredProducts);
        displayProducts(sortedProducts);
        updateResultsCount(sortedProducts.length);
    });
}

// Get filtered products based on current filters
function getFilteredProducts() {
    return allProducts.filter(product => {
        const matchesSearch = !currentFilters.search || 
            product.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            product.description.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            product.viscosity.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            (product.oilType && product.oilType.toLowerCase().includes(currentFilters.search.toLowerCase()));
        
        const matchesCategory = !currentFilters.category || product.category === currentFilters.category;
        const matchesOilType = !currentFilters.oilType || product.oilType === currentFilters.oilType;
        
        return matchesSearch && matchesCategory && matchesOilType;
    });
}

// Sort products based on current sort option
function sortProducts(products) {
    return products.sort((a, b) => {
        switch (currentSort) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'viscosity':
                return a.viscosity.localeCompare(b.viscosity);
            case 'category':
                return a.category.localeCompare(b.category);
            default:
                return 0;
        }
    });
}

// Display products in the container
function displayProducts(products) {
    if (products.length === 0) {
        productsContainer.style.display = 'none';
        noResultsDiv.classList.remove('hidden');
        return;
    }
    
    productsContainer.style.display = 'block';
    noResultsDiv.classList.add('hidden');
    
    // Group products by category
    const groupedProducts = {};
    products.forEach(product => {
        if (!groupedProducts[product.category]) {
            groupedProducts[product.category] = [];
        }
        groupedProducts[product.category].push(product);
    });
    
    // Clear container
    productsContainer.innerHTML = '';
    
    // Create sections for each category
    Object.keys(groupedProducts).forEach(category => {
        const categorySection = createCategorySection(category, groupedProducts[category]);
        productsContainer.appendChild(categorySection);
    });
    
    // Setup lazy loading
    setupLazyLoading();
}

// Create category section
function createCategorySection(category, products) {
    const section = document.createElement('div');
    section.className = 'mb-16';
    section.setAttribute('data-aos', 'fade-up');
    
    const categoryInfo = getCategoryInfo(category);
    
    section.innerHTML = `
        <h3 class="text-2xl font-bold castrol-green-text mb-8 flex items-center" data-category-section="${category}">
            <i class="${categoryInfo.icon} mr-3"></i>
            ${categoryInfo.name}
        </h3>
        <div class="product-grid ${currentView === 'list' ? 'list-view' : ''}" id="${category}-products">
            ${products.map(product => createProductCardHTML(product)).join('')}
        </div>
    `;
    
    return section;
}

// Get category information
function getCategoryInfo(category) {
    const categoryMap = {
        diesel: { name: 'Motores Diésel', icon: 'fas fa-truck' },
        gasolina: { name: 'Motores Gasolina', icon: 'fas fa-car' },
        motos: { name: 'Motos', icon: 'fas fa-motorcycle' },
        transmisiones: { name: 'Transmisiones', icon: 'fas fa-cogs' },
        complementarios: { name: 'Productos Complementarios', icon: 'fas fa-tools' }
    };
    return categoryMap[category] || { name: category, icon: 'fas fa-box' };
}

// Create product card HTML
function createProductCardHTML(product) {
    const oilTypeBadge = getOilTypeBadge(product.oilType);
    const isInComparison = comparisonList.find(p => p.id === product.id) !== undefined;
    
    return `
        <div class="bg-white rounded-lg shadow-md card-hover overflow-hidden product-card ${currentView === 'list' ? 'flex' : ''}" 
             data-category="${product.category}" 
             data-product-id="${product.id}">
            <div class="relative ${currentView === 'list' ? 'w-48 flex-shrink-0' : ''}">
                <div class="product-image-container w-full ${currentView === 'list' ? 'h-full' : 'h-56'} flex items-center justify-center p-4 rounded-t-lg">
                    <img data-src="${product.image}" 
                         alt="${product.name}" 
                         class="lazy-image product-image max-w-full max-h-full object-contain"
                         style="opacity: 0;">
                    <div class="image-loading absolute inset-0 flex items-center justify-center rounded-t-lg">
                        <div class="text-center">
                            <i class="fas fa-oil-can text-4xl text-gray-400 mb-2"></i>
                            <p class="text-sm text-gray-500">Cargando imagen...</p>
                        </div>
                    </div>
                </div>
                ${oilTypeBadge}
                <button class="absolute top-3 left-3 w-8 h-8 rounded-full ${isInComparison ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'} shadow-md hover:shadow-lg transition-all" 
                        onclick="toggleProductComparison('${product.id}')" 
                        title="${isInComparison ? 'Remover de comparación' : 'Agregar a comparación'}">
                    <i class="fas fa-balance-scale text-xs"></i>
                </button>
            </div>
            
            <div class="p-6 ${currentView === 'list' ? 'flex-1' : ''}">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full ${getOilTypeColor(product.oilType)} mr-2"></div>
                        <span class="text-xs font-medium text-gray-500">${product.oilType || 'Estándar'}</span>
                    </div>
                    <span class="text-sm font-semibold text-gray-500">${product.format}</span>
                </div>
                
                <h4 class="text-lg font-bold castrol-green-text mb-2 line-clamp-2">${product.name}</h4>
                <div class="flex items-center mb-3">
                    <span class="text-sm text-gray-600">Viscosidad:</span>
                    <span class="ml-2 px-2 py-1 bg-gray-100 rounded text-sm font-semibold">${product.viscosity}</span>
                </div>
                <p class="text-gray-700 text-sm mb-4 line-clamp-3">${product.description}</p>
                
                <div class="flex gap-2">
                    <button class="flex-1 bg-[#007C41] text-white py-2 px-4 rounded-lg font-medium shadow-md transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 hover:shadow-xl hover:-translate-y-1 transform duration-200" 
                            onclick="openProductModal('${product.id}')">
                        Ver detalles
                    </button>
                    <button class="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors" 
                            onclick="shareProduct('${product.id}')"
                            title="Compartir producto">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Get oil type badge
function getOilTypeBadge(oilType) {
    if (!oilType) return '';
    
    const badgeClass = oilType.includes('Full Sintético') ? 'badge-synthetic' :
                      oilType.includes('Semi-sintético') ? 'badge-semi-synthetic' :
                      oilType.includes('Sintético') ? 'badge-synthetic' : 'badge-mineral';
    
    return `<div class="product-badge ${badgeClass}">${oilType}</div>`;
}

// Get oil type color
function getOilTypeColor(oilType) {
    if (!oilType) return 'bg-gray-400';
    return oilType.includes('Full Sintético') ? 'bg-green-500' :
           oilType.includes('Semi-sintético') ? 'bg-orange-500' :
           oilType.includes('Sintético') ? 'bg-green-500' : 'bg-gray-500';
}

// Update results count
function updateResultsCount(count) {
    const total = allProducts.length;
    const hasFilters = currentFilters.search || currentFilters.category || currentFilters.oilType;
    
    if (hasFilters) {
        resultsCount.textContent = `Mostrando ${count} de ${total} productos`;
        resetFiltersBtn.classList.remove('hidden');
    } else {
        resultsCount.textContent = `Mostrando todos los productos (${total})`;
        resetFiltersBtn.classList.add('hidden');
    }
}

// Setup lazy loading for images
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const loadingDiv = img.nextElementSibling;
                
                img.src = img.dataset.src;
                img.onload = () => {
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.3s ease';
                    if (loadingDiv) loadingDiv.style.display = 'none';
                };
                img.onerror = () => {
                    img.style.display = 'none';
                    if (loadingDiv) {
                        loadingDiv.innerHTML = `
                            <div class="text-center">
                                <i class="fas fa-image text-4xl text-gray-300 mb-2"></i>
                                <p class="text-xs text-gray-400">Imagen no disponible</p>
                            </div>
                        `;
                    }
                };
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Setup intersection observer for animations and back to top
function setupIntersectionObserver() {
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'all';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
}

// Open product modal
function openProductModal(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    modalTitle.textContent = product.name;
    modalContent.innerHTML = createModalContent(product);
    
    // Update add to compare button
    const isInComparison = comparisonList.find(p => p.id === product.id) !== undefined;
    addToCompareBtn.textContent = isInComparison ? 'Remover de comparación' : 'Agregar a comparación';
    addToCompareBtn.className = isInComparison ? 
        'bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm' :
        'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm';
    
    addToCompareBtn.onclick = () => toggleProductComparison(productId);
    
    productModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Create modal content
function createModalContent(product) {
    const specs = product.specs || {};
    let specsHtml = '';
    
    if (specs.api) specsHtml += `<p><strong>API:</strong> ${specs.api}</p>`;
    if (specs.acea) specsHtml += `<p><strong>ACEA:</strong> ${specs.acea}</p>`;
    if (specs.jaso) specsHtml += `<p><strong>JASO:</strong> ${specs.jaso}</p>`;
    if (specs.dexos) specsHtml += `<p><strong>dexos:</strong> ${specs.dexos}</p>`;
    if (specs.vw) specsHtml += `<p><strong>VW:</strong> ${specs.vw}</p>`;
    if (specs.iso) specsHtml += `<p><strong>ISO:</strong> ${specs.iso}</p>`;
    if (specs.type) specsHtml += `<p><strong>Tipo:</strong> ${specs.type}</p>`;
    
    const features = specs.features || [];
    
    return `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <div class="relative mb-6">
                    <div class="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center p-6">
                        <img src="${product.image}" alt="${product.name}" 
                             class="max-w-full max-h-full object-contain rounded-lg"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="text-center" style="display: none;">
                            <i class="fas fa-oil-can text-6xl text-gray-400 mb-3"></i>
                            <p class="text-sm text-gray-500">Imagen no disponible</p>
                        </div>
                    </div>
                    ${getOilTypeBadge(product.oilType)}
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-3 text-lg">Información del Producto</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="font-medium">Viscosidad:</span>
                            <span>${product.viscosity}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Tipo:</span>
                            <span>${product.oilType || 'Estándar'}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Formato:</span>
                            <span>${product.format}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Categoría:</span>
                            <span class="capitalize">${product.category}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="space-y-6">
                <div>
                    <h4 class="font-semibold mb-3 text-lg">Descripción</h4>
                    <p class="text-gray-700 leading-relaxed">${product.description}</p>
                </div>
                
                ${specsHtml ? `
                <div>
                    <h4 class="font-semibold mb-3 text-lg">Especificaciones Técnicas</h4>
                    <div class="bg-blue-50 p-4 rounded-lg space-y-1 text-sm">
                        ${specsHtml}
                    </div>
                </div>
                ` : ''}
                
                ${features.length > 0 ? `
                <div>
                    <h4 class="font-semibold mb-3 text-lg">Características Principales</h4>
                    <ul class="space-y-2">
                        ${features.map(feature => `
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-600 mr-2 mt-1 text-sm"></i>
                                <span class="text-gray-700">${feature}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                ` : ''}
                
                <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <a href="https://wa.me/51999999999?text=${encodeURIComponent(`Hola, me interesa el producto: ${product.name}`)}" 
                       target="_blank"
                       class="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors text-center font-medium">
                        <i class="fab fa-whatsapp mr-2"></i>
                        Consultar por WhatsApp
                    </a>
                    <button onclick="shareProduct('${product.id}')" 
                            class="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                        <i class="fas fa-share-alt mr-2"></i>
                        Compartir Producto
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Close product modal
function closeProductModal() {
    productModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Toggle product in comparison list
function toggleProductComparison(productId) {
    try {
        const product = allProducts.find(p => p.id === productId);
        if (!product) {
            showToast('Producto no encontrado', 'error');
            return;
        }
        
        const existingIndex = comparisonList.findIndex(p => p.id === productId);
        
        if (existingIndex !== -1) {
            comparisonList.splice(existingIndex, 1);
            showToast(`${product.name} removido de la comparación`, 'info');
        } else {
            if (comparisonList.length >= 4) {
                showToast('Máximo 4 productos para comparar', 'error');
                return;
            }
            comparisonList.push(product);
            showToast(`${product.name} agregado a la comparación`, 'success');
        }
        
        updateComparisonUI();
        loadProducts(); // Refresh to update compare buttons
    } catch (error) {
        handleError(error, 'toggleProductComparison');
    }
}

// Update comparison UI
function updateComparisonUI() {
    const count = comparisonList.length;
    
    if (count > 0) {
        compareCount.textContent = count;
        compareCount.classList.remove('hidden');
        mobileCompareCount.textContent = `(${count})`;
        mobileCompareCount.classList.remove('hidden');
    } else {
        compareCount.classList.add('hidden');
        mobileCompareCount.classList.add('hidden');
    }
}

// Open comparison modal
function openComparisonModal() {
    if (comparisonList.length < 2) {
        alert('Selecciona al menos 2 productos para comparar');
        return;
    }
    
    comparisonContent.innerHTML = createComparisonContent();
    comparisonModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Create comparison content
function createComparisonContent() {
    if (comparisonList.length === 0) {
        return '<p class="text-center text-gray-500">No hay productos seleccionados para comparar</p>';
    }
    
    return `
        <div class="overflow-x-auto">
            <table class="w-full border-collapse">
                <thead>
                    <tr>
                        <th class="border p-3 bg-gray-50 text-left font-semibold">Característica</th>
                        ${comparisonList.map(product => `
                            <th class="border p-3 bg-gray-50 text-center font-semibold min-w-48">
                                <div class="text-sm">${product.name}</div>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border p-3 font-medium">Imagen</td>
                        ${comparisonList.map(product => `
                            <td class="border p-3 text-center">
                                <div class="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mx-auto p-2">
                                    <img src="${product.image}" alt="${product.name}" 
                                         class="max-w-full max-h-full object-contain rounded"
                                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                    <div class="text-center text-xs" style="display: none;">
                                        <i class="fas fa-image text-gray-400"></i>
                                    </div>
                                </div>
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td class="border p-3 font-medium">Viscosidad</td>
                        ${comparisonList.map(product => `
                            <td class="border p-3 text-center font-semibold">${product.viscosity}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td class="border p-3 font-medium">Tipo de Aceite</td>
                        ${comparisonList.map(product => `
                            <td class="border p-3 text-center">
                                <span class="px-2 py-1 rounded text-sm ${getOilTypeClass(product.oilType)}">
                                    ${product.oilType || 'Estándar'}
                                </span>
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td class="border p-3 font-medium">Formato</td>
                        ${comparisonList.map(product => `
                            <td class="border p-3 text-center">${product.format}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td class="border p-3 font-medium">Descripción</td>
                        ${comparisonList.map(product => `
                            <td class="border p-3 text-sm">${product.description}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td class="border p-3 font-medium">API</td>
                        ${comparisonList.map(product => `
                            <td class="border p-3 text-center">${product.specs?.api || '-'}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td class="border p-3 font-medium">ACEA</td>
                        ${comparisonList.map(product => `
                            <td class="border p-3 text-center">${product.specs?.acea || '-'}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td class="border p-3 font-medium">JASO</td>
                        ${comparisonList.map(product => `
                            <td class="border p-3 text-center">${product.specs?.jaso || '-'}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td class="border p-3 font-medium">Acciones</td>
                        ${comparisonList.map(product => `
                            <td class="border p-3 text-center">
                                <div class="flex flex-col gap-2">
                                    <button onclick="openProductModal('${product.id}')" 
                                            class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                                        Ver detalles
                                    </button>
                                    <button onclick="toggleProductComparison('${product.id}'); updateComparisonAfterRemove();" 
                                            class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                                        Remover
                                    </button>
                                </div>
                            </td>
                        `).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-gray-600">Comparando ${comparisonList.length} productos</p>
            <div class="flex gap-2">
                <button onclick="clearComparison()" 
                        class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                    Limpiar comparación
                </button>
                <button onclick="closeComparisonModal()" 
                        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                    Cerrar
                </button>
            </div>
        </div>
    `;
}

// Get oil type class for comparison
function getOilTypeClass(oilType) {
    if (!oilType) return 'bg-gray-100 text-gray-800';
    return oilType.includes('Full Sintético') ? 'bg-green-100 text-green-800' :
           oilType.includes('Semi-sintético') ? 'bg-orange-100 text-orange-800' :
           oilType.includes('Sintético') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
}

// Update comparison after remove
function updateComparisonAfterRemove() {
    if (comparisonList.length < 2) {
        closeComparisonModal();
    } else {
        comparisonContent.innerHTML = createComparisonContent();
    }
}

// Close comparison modal
function closeComparisonModal() {
    comparisonModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Clear comparison
function clearComparison() {
    comparisonList = [];
    updateComparisonUI();
    loadProducts();
    closeComparisonModal();
}

// Share product
function shareProduct(productId) {
    try {
        const product = allProducts.find(p => p.id === productId);
        if (!product) {
            showToast('Producto no encontrado', 'error');
            return;
        }
        
        const shareData = {
            title: `${product.name} - Castrol Perú`,
            text: product.description,
            url: `${window.location.href}#producto-${productId}`
        };
        
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            navigator.share(shareData)
                .then(() => showToast('Producto compartido exitosamente'))
                .catch(() => fallbackShare(product, shareData.url));
        } else {
            fallbackShare(product, shareData.url);
        }
    } catch (error) {
        handleError(error, 'shareProduct');
    }
}

// Reset all filters
function resetAllFilters() {
    currentFilters = {
        search: '',
        category: '',
        oilType: ''
    };
    
    searchInput.value = '';
    
    // Reset filter chips
    filterChips.forEach(chip => {
        chip.classList.remove('active');
        if (chip.dataset.value === '') {
            chip.classList.add('active');
        }
    });
    
    loadProducts();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', debounce(() => {
        currentFilters.search = searchInput.value;
        loadProducts();
    }, 300));
    
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentFilters.search = '';
        loadProducts();
    });
    
    // Filter chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const filterType = chip.dataset.filter;
            const filterValue = chip.dataset.value;
            
            // Remove active class from siblings
            document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(sibling => {
                sibling.classList.remove('active');
            });
            
            // Add active class to clicked chip
            chip.classList.add('active');
            
            // Update filter
            currentFilters[filterType] = filterValue;
            loadProducts();
            
            // Show feedback toast
            if (filterValue) {
                const filterNames = {
                    category: {
                        diesel: 'Motores Diésel',
                        gasolina: 'Motores Gasolina', 
                        motos: 'Motos',
                        transmisiones: 'Transmisiones',
                        complementarios: 'Productos Complementarios'
                    },
                    oilType: {
                        'Full Sintético': 'Full Sintético',
                        'Semi-sintético': 'Semi-sintético',
                        'Sintético': 'Sintético',
                        'Mineral': 'Mineral'
                    }
                };
                const categoryName = filterNames[filterType]?.[filterValue] || filterValue;
                showToast(`Filtrado por: ${categoryName}`, 'info');
            }
        });
    });
    
    // View toggles
    gridViewBtn.addEventListener('click', () => {
        currentView = 'grid';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        document.body.classList.remove('list-view');
        loadProducts();
    });
    
    listViewBtn.addEventListener('click', () => {
        currentView = 'list';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        document.body.classList.add('list-view');
        loadProducts();
    });
    
    // Sort functionality
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        loadProducts();
    });
    
    // Reset filters
    resetFiltersBtn.addEventListener('click', resetAllFilters);
    
    // Modal functionality
    closeModal.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
    
    // Comparison functionality
    compareToggle.addEventListener('click', openComparisonModal);
    mobileCompareToggle.addEventListener('click', openComparisonModal);
    closeComparison.addEventListener('click', closeComparisonModal);
    comparisonModal.addEventListener('click', (e) => {
        if (e.target === comparisonModal) {
            closeComparisonModal();
        }
    });
    
    // Mobile menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Back to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!productModal.classList.contains('hidden')) {
                closeProductModal();
            } else if (!comparisonModal.classList.contains('hidden')) {
                closeComparisonModal();
            }
        }
        
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// Handle contact form
function handleContactForm(e) {
    e.preventDefault();
    
    try {
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name')?.trim(),
            email: formData.get('email')?.trim(),
            phone: formData.get('phone')?.trim(),
            productInterest: formData.get('product-interest'),
            message: formData.get('message')?.trim()
        };
        
        // Validation
        if (!data.name) {
            showToast('Por favor, ingresa tu nombre', 'error');
            return;
        }
        
        if (!data.email) {
            showToast('Por favor, ingresa tu email', 'error');
            return;
        }
        
        if (!validateEmail(data.email)) {
            showToast('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        // Create WhatsApp message
        let whatsappMessage = `Hola, mi nombre es ${data.name}.`;
        
        if (data.productInterest) {
            const categoryNames = {
                diesel: 'Motores Diésel',
                gasolina: 'Motores Gasolina',
                motos: 'Motos',
                transmisiones: 'Transmisiones',
                complementarios: 'Productos Complementarios'
            };
            whatsappMessage += `\n\nEstoy interesado en: ${categoryNames[data.productInterest] || data.productInterest}`;
        }
        
        if (data.message) {
            whatsappMessage += `\n\nMensaje: ${data.message}`;
        } else {
            whatsappMessage += '\n\nMe interesa obtener más información sobre los productos Castrol.';
        }
        
        whatsappMessage += `\n\nMis datos de contacto:\n📧 ${data.email}`;
        if (data.phone) {
            whatsappMessage += `\n📱 ${data.phone}`;
        }
        
        const whatsappUrl = `https://wa.me/51999999999?text=${encodeURIComponent(whatsappMessage)}`;
        
        showToast('¡Formulario enviado! Redirigiendo a WhatsApp...');
        
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        }, 1500);
        
    } catch (error) {
        handleError(error, 'handleContactForm');
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add specific styling based on type
    if (type === 'error') {
        toast.style.background = 'rgba(239, 68, 68, 0.95)';
    } else if (type === 'info') {
        toast.style.background = 'rgba(59, 130, 246, 0.95)';
    }
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Highlight search terms in text
function highlightSearchTerms(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// Format number for display
function formatNumber(num) {
    return new Intl.NumberFormat('es-PE').format(num);
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Get user's preferred language
function getUserLanguage() {
    return navigator.language || navigator.userLanguage || 'es';
}

// Check if user prefers reduced motion
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Performance monitoring
function measurePerformance(name, fn) {
    if (typeof performance !== 'undefined' && performance.mark) {
        performance.mark(`${name}-start`);
        const result = fn();
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
        return result;
    }
    return fn();
}

// Error handling
function handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    showToast('Ha ocurrido un error. Por favor, inténtalo de nuevo.', 'error');
}

// Fallback share function
function fallbackShare(product, url) {
    const text = `${product.name}\n${product.description}\n\n${url}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => showToast('Enlace copiado al portapapeles'))
            .catch(() => showToast('No se pudo copiar el enlace', 'error'));
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast('Enlace copiado al portapapeles');
        } catch (err) {
            showToast('No se pudo copiar el enlace', 'error');
        } finally {
            document.body.removeChild(textArea);
        }
    }
}

// Initialize performance monitoring
function initializePerformanceMonitoring() {
    if (typeof performance !== 'undefined' && performance.observer) {
        try {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'measure') {
                        console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
                    }
                }
            });
            observer.observe({ entryTypes: ['measure'] });
        } catch (error) {
            console.warn('Performance monitoring not available');
        }
    }
}

// Enhanced product loading with performance monitoring
function loadProducts() {
    measurePerformance('loadProducts', () => {
        const filteredProducts = getFilteredProducts();
        const sortedProducts = sortProducts(filteredProducts);
        displayProducts(sortedProducts);
        updateResultsCount(sortedProducts.length);
    });
}

// Add keyboard navigation support
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    searchInput.focus();
                    showToast('Búsqueda activada (Ctrl+K)', 'info');
                    break;
                case 'c':
                    if (comparisonList.length >= 2) {
                        e.preventDefault();
                        openComparisonModal();
                    }
                    break;
            }
        }
        
        // Modal navigation
        if (e.key === 'Escape') {
            if (!productModal.classList.contains('hidden')) {
                closeProductModal();
            } else if (!comparisonModal.classList.contains('hidden')) {
                closeComparisonModal();
            }
        }
        
        // Arrow key navigation for filter chips
        if (e.target.classList.contains('filter-chip')) {
            let nextElement;
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    nextElement = e.target.nextElementSibling;
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    nextElement = e.target.previousElementSibling;
                    break;
            }
            if (nextElement && nextElement.classList.contains('filter-chip')) {
                nextElement.focus();
            }
        }
    });
}

// Make functions globally available
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.toggleProductComparison = toggleProductComparison;
window.openComparisonModal = openComparisonModal;
window.closeComparisonModal = closeComparisonModal;
window.clearComparison = clearComparison;
window.shareProduct = shareProduct;
window.resetAllFilters = resetAllFilters;
window.updateComparisonAfterRemove = updateComparisonAfterRemove;