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
let currentSort = 'category'; // Changed to category by default
let currentView = 'grid';
// Comparar eliminado
let allProducts = [];

// Product data with enhanced specifications and multiple format support
const products = {
    diesel: [
        // Full Sintético
        { 
            id: 'd-s1', 
            name: 'Castrol Vecton Long Drain E6/E9 10W-40', 
            viscosity: '10W-40', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '5 gal', image: 'img/Castrol Vecton Long Drain E6-E9 10W-40 - 5 gal.jpg' }
            ],
            description: 'Aceite sintético de larga duración para motores diésel Euro VI y anteriores.', 
            category: 'diesel', 
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
            name: 'Castrol Vecton E6/E9 5W-40 C1', 
            viscosity: '5W-40', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '3x3.78', image: 'img/Castrol Vecton Long Drain E6-E9 5W-40 C1 - 3x3.78.jpg' }
            ],
            description: 'Aceite sintético de larga duración para motores diésel Euro VI y anteriores, viscosidad 5W-40.', 
            category: 'diesel', 
            specs: { 
                api: 'SN', 
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
        // Sintético
        { 
            id: 'd-s4', 
            name: 'Castrol Vecton CK-4/SN 15W-40', 
            viscosity: '15W-40', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '5 gal', image: 'img/Castrol Vecton CK-4-SN 15W-40 - 5 gal.jpg' },
                { size: '3x3.78', image: 'img/Castrol Vecton CK-4-SN 15W-40 - 3x3.78.jpg' },
                { size: '12x1qt', image: 'img/Castrol Vecton CK-4-SN 15W-40 - 12x1qt.jpg' }
            ],
            description: 'Aceite sintético para motores diésel de alto desempeño y protección avanzada.', 
            category: 'diesel', 
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
            oilType: 'Mineral', 
            formats: [
                { size: '6x1L', image: 'img/Castrol CRB Multi CK-4 15W-40 - 6x1L.jpg' },
                { size: '3x4L', image: 'img/Castrol CRB Multi CK-4 15W-40 - 3x4L.jpg' },
                { size: '2.5GL', image: 'img/Castrol CRB Multi CK-4 15W-40 - 2.5GL.jpg' },
                { size: '20L', image: 'img/Castrol CRB Multi CK-4 15W-40 - 20L.jpg' }
            ],
            description: 'Aceite semi-sintético para motores diésel, excelente limpieza y protección.', 
            category: 'diesel', 
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
            formats: [
                { size: '6x1L', image: 'img/Castrol CRB Turbomax CI-4-SL-E7 15W-40 - 6x1L.jpg' },
                { size: '3x4L', image: 'img/Castrol CRB Turbomax CI-4-SL-E7 15W-40 - 3x4L.jpg' },
                { size: '2.5GL', image: 'img/Castrol CRB Turbomax CI-4-SL-E7 15W-40 - 2.5GL.jpg' },
                { size: '20L', image: 'img/Castrol CRB Turbomax CI-4-SL-E7 15W-40 - 18.9 L.jpg' }
            ],
            description: 'Aceite mineral para motores diésel, protección robusta y confiable.', 
            category: 'diesel', 
            specs: { 
                api: 'CI-4/SL', 
                acea: 'E7', 
                features: [
                    'Protección confiable y económica',
                    'Control de depósitos',
                    'Resistencia a altas temperaturas',
                    'Compatibilidad universal'
                ]
            }
        },
        { 
            id: 'd-m2', 
            name: 'Castrol CRB Viscus 25W-60', 
            viscosity: '25W-60', 
            oilType: 'Mineral', 
            formats: [
                { size: '20x946L', image: 'img/Castrol CRB Viscus 25W-60 - 20x946L.jpg' },
                { size: '12x946L MC', image: 'img/Castrol CRB Viscus 25W-60 - 12x946L MC.jpg' },
                { size: '3x3.78L', image: 'img/Castrol CRB Viscus 25W-60 - 3x3.78L.jpg' },
                { size: '2.5GL', image: 'img/Castrol CRB Viscus 25W-60 - 2.5GL.jpg' },
                { size: '20L', image: 'img/Castrol CRB Viscus 25W-60 - 20L.jpg' }
            ],
            description: 'Aceite mineral de alta viscosidad para motores diésel exigentes.', 
            category: 'diesel', 
            specs: { 
                features: [
                    'Alta viscosidad para motores desgastados',
                    'Protección contra fugas',
                    'Sellado mejorado',
                    'Economía de uso'
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
            formats: [
                { size: '6x946 ml', image: 'img/Castrol EDGE Professional V 0W-20 - 6x946 ml.jpg' }
            ],
            description: 'Aceite sintético premium para motores gasolina modernos.', 
            category: 'gasolina', 
            specs: { 
                api: 'SP', 
                features: [
                    'Tecnología Fluid TITANIUM',
                    'Reducción de fricción hasta 15%',
                    'Protección en condiciones extremas',
                    'Máximo rendimiento del motor'
                ]
            }
        },
        { 
            id: 'g-s2', 
            name: 'Castrol EDGE Professional EC 0W-20', 
            viscosity: '0W-20', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol EDGE Professional EC 0W-20 - 6x946 ml.jpg' }
            ],
            description: 'Aceite sintético para máxima eficiencia y protección.', 
            category: 'gasolina', 
            specs: { 
                api: 'SP', 
                features: [
                    'Eficiencia de combustible superior',
                    'Arranque en frío mejorado',
                    'Protección avanzada del motor',
                    'Tecnología de vanguardia'
                ]
            }
        },
        { 
            id: 'g-s3', 
            name: 'Castrol EDGE Professional E 0W-30 JLR H U6', 
            viscosity: '0W-30', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '12x1 L', image: 'img/Castrol EDGE Professional E 0W-30 JLR H U6 -12x1l.jpg' }
            ],
            description: 'Aceite sintético para motores de alto rendimiento.', 
            category: 'gasolina', 
            specs: { 
                api: 'SP', 
                features: [
                    'Fórmula HC1 avanzada',
                    'Protección superior',
                    'Rendimiento excepcional',
                    'Tecnología probada'
                ]
            }
        },
        { 
            id: 'g-s4', 
            name: 'Castrol EDGE 0W-30 HC1', 
            viscosity: '0W-30', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '12x1 L', image: 'img/Castrol EDGE 0W-30 HC1 12x1l.jpg' }
            ],
            description: 'Aceite sintético HC1 para motores de alto rendimiento.', 
            category: 'gasolina', 
            specs: { 
                api: 'SP', 
                features: [
                    'Fórmula HC1 avanzada',
                    'Protección superior del motor',
                    'Rendimiento excepcional',
                    'Tecnología de vanguardia'
                ]
            }
        },
        { 
            id: 'g-s5', 
            name: 'Castrol EDGE 5W-20 U3', 
            viscosity: '5W-20', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol EDGE 5W-20 U3 6x946.jpg' }
            ],
            description: 'Aceite sintético U3 para motores gasolina de alta eficiencia.', 
            category: 'gasolina', 
            specs: { 
                api: 'SP', 
                features: [
                    'Fórmula U3 especializada',
                    'Eficiencia de combustible superior',
                    'Protección avanzada del motor',
                    'Tecnología de vanguardia'
                ]
            }
        },
        { 
            id: 'g-s6', 
            name: 'Castrol EDGE US Dexos 5W-30', 
            viscosity: '5W-30', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol EDGE US Dexos 5W-30 - 6x946 ml.jpg' },
                { size: '5 qt', image: 'img/Castrol EDGE US Dexos 5W-30 - 5 qt.jpg' }
            ],
            description: 'Aceite sintético Dexos para motores gasolina.', 
            category: 'gasolina', 
            specs: { 
                api: 'SP', 
                dexos: 'Gen 2', 
                features: [
                    'Aprobación GM Dexos',
                    'Protección avanzada',
                    'Eficiencia mejorada',
                    'Tecnología sintética'
                ]
            }
        },
        { 
            id: 'g-s7', 
            name: 'Castrol EDGE K 5W-30', 
            viscosity: '5W-30', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '5 qt', image: 'img/Castrol EDGE K 5W-30 - 5 qt.jpg' },
                { size: '6x946 ml', image: 'img/Castrol EDGE K 5W-30 - 6x946.jpg' }
            ],
            description: 'VW AMAROK (MODERNAS Y ANTIGUAS), MINIVAN: VW CRAFTER, RENAULT MASTER, MERCEDES SPRINTER, HYUNDAI 350. CUALQUIER VEHICULO QUE UTILICE 5W30 SEA GASOLINA O DIESEL DE SERVICIO LIVIANO ESTE PRODUCTO SOBREPASA CUALQUIER ESPECIFICACION DE LUBRICANTES SIMILARES DE LA COMPETENCIA. RECOMENDADO PARA VEHICULOS CON FILTRO DE PARTICULAS.', 
            category: 'gasolina', 
            specs: {
                api: 'SP',

                features: [
                    'LIBERA EL MAXIMO RENDIMIENTO',
                    'PROBADO CON LOS MÁS ALTOS ESTÁNDARESDE LOS FABRICANTES DE AUTOMÓVILES',
                    'PROTEGE EL MOTOR DURANTE TODO EL INTERVALO DE DRENAJE INCLUSO BAJO PRESIÓN EXTREMA'
                ],

                acea: 'C3, API SP,',
                vw: '504 00 - 507 00 - 505 00 - 505 01'
            }
        },
        { 
            id: 'g-s8', 
            name: 'Castrol EDGE A3/B4 5W-40', 
            viscosity: '5W-40', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol EDGE A3-B4 5W-40 - 6x946 ml.jpg' },
                { size: '5 qt', image: 'img/Castrol EDGE A3-B4 5W-40 - 5 qt.jpg' }
            ],
            description: 'PUEDE SER UTILIZADA POR VEHICULOS DIESEL LIVIANOS Y A GASOLINA QUE REQUIERAN CUMPLIR CON ACEA A3/B4 Y QUE NO TENGAN FILTRO DE PARTICULAS. A3 INDICADO PARA MOTORES DE ALTO RENDIMIENTO Y/O CAMBIOS PROLONGADOS DE ACEITE Y BAJO TODOS LOS RANGOS DE TEMPERATURA B4 INDICADO PARA VEHICULOS DIESEL DE PASAJEROS CON INYECCIOON DIRECTA', 
            category: 'gasolina', 
            specs: {
                api: 'SP/CF',
                acea: 'A3/B3, A3/B4, API SP/CF, BMW Longlife-01,',

                features: [
                    'LIBERA EL MAXIMO RENDIMIENTO',
                    'FORMULADO PARA VEHICULOS DE ALTO RENDIMIENTO',
                    'PROPORCIONA UN NIVEL INIGUALABLE DE PROTECCIÓN BAJO CUALQUIER VARIEDAD DE CONDICIONES DE CONDUCCIÓN Y TEMPERATURAS',
                    'MEJORA LA EFICIENCIA DEL MOTOR',
                    'PROPORCIONA Y MANTIENE MÁXIMA POTENCIA POR MÁS TIEMPO'
                ],

                vw: '502 00 / 505 00'
            }
        },
        { 
            id: 'g-s9', 
            name: 'Castrol EDGE Turbo Diesel 5W-40', 
            viscosity: '5W-40', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '12x1 L', image: 'img/Castrol EDGE Turbo Diesel 5W-40 - 12x1 L.jpg' },
                { size: '4x4 L', image: 'img/Castrol EDGE Turbo Diesel 5W-40 -  4x4 L.jpg' }
            ],
            description: 'RECOMENDADO PARA LAS PICK UPS DIESEL MAS COMERCIALES, HILUX, L200, FOTON, POER, AMAROK (MOTOR 2.0), MAHINDRA, ALASKAN, MAXUS, FRONTIER, NP300, BT50, RANGER. DUAL, PUEDE SER UTILIZADO EN VEHICULOS A GASOLINA Y DIESEL LIVIANO Y CON FILTRO DE PARTICULAS MINIVAN MERCEDES BENZ, RENAULT MASTER', 
            category: 'gasolina', 
            specs: {
                api: 'SN/CF',

                features: [
                    'LIBERA EL MAXIMO RENDIMIENTO',
                    'OFRECE MÁS DESARROLLO DE POTENCIA Y ACELERACIÓN',
                    'RECOMENDADO POR LOS PRINCIPALES FABRICANTES DE AUTOMÓVILES DEL MUNDO'
                ],

                acea: 'C3 API SN/CF',
                dexos: '2',
                vw: '505 00/ 505 01'
            }
        },
        // Semi-sintético
        { 
            id: 'g-ss1', 
            name: 'Castrol MAGNATEC C3 5W-30', 
            viscosity: '5W-30', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '12x1 L', image: 'img/Castrol MAGNATEC C3 5W-30 - 12x1 L.jpg' },
                { size: '4x4 L', image: 'img/Castrol MAGNATEC C3 5W-30 -  4x4 L.jpg' }
            ],
            description: 'PROTECCION ININTERRUMPIDA DESDE CADA ARRANQUE Castrol MAGNATEC 5W-30 C3 ESTA RECOMENDADO PARA MOTORES DE AUTOMOVILES A GASOLINA Y DIESEL DONDE EL FABRICANTE RECOMIENDA UN LUBRICANTE CON ESPECIFICACION API SP, ACEA C2, C3 o anterior y grado de viscosidad 5W-30. CASTROL MAGNATEC SE ADHIERE, FIJA Y OTROTEGE PARA OFRECER UN 50% MAS DE POROTECCION CONTRA EL DESGASTE DE MOTOR', 
            category: 'gasolina', 
            specs: { 
                api: 'SP', 
                acea: 'C2 y C3, API SP,', 
                features: [
                    'RECOMENDADO PARA SU USO EN MOTORES DE AUTOMÓVILES GASOLINA, DIESEL LIVIANO E HIBRIDOS DE LA MAYORIA DE VEHICULOS QUE REQUIEREN ESTA VISCOSIDAD',
                    'MAGNATEC 5W',
                    '30 C3 HA SIDO ESPECIFICAMENTE FORMULADO PARA PROPORCIONAR UNA PROTECCIÓN SOBRESALIENTE DE AQUELLOS MOTORES DE ÚLTIMA TECNOLOGÍA EQUIPADOS CON SISTEMAS DE TRATAMIENTO DE GASES DE ESCAPE TALES COMO FILTROS DE PARTÍCULAS DIESEL (DPF) Y CATALIZADORES DE',
                    'TRES VÍAS (TWC)'
                ]
            }
        },
        { 
            id: 'g-ss2', 
            name: 'Castrol MAGNATEC 508 88 5W-40', 
            viscosity: '5W-40', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '12x1 L', image: 'img/Castrol MAGNATEC 508 88 5W-40 - 12x1 L.jpg' }
            ],
            description: 'Aceite semi-sintético para motores europeos.', 
            category: 'gasolina', 
            specs: { 
                api: 'SN', 
                vw: '508 88', 
                features: [
                    'Especificación VW 508 88',
                    'Para motores europeos',
                    'Protección inteligente',
                    'Calidad premium'
                ]
            }
        },
        { 
            id: 'g-ss3', 
            name: 'Castrol MAGNATEC 10W-30', 
            viscosity: '10W-30', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol MAGNATEC 10W-30 - 6x946 ml.jpg' },
                { size: '3.78 L', image: 'img/Castrol MAGNATEC 10W-30 -  3.78 L.jpg' }
            ],
            description: 'EL CASTROL MAGNATEC ES EL LUBRICANTE PARA VEHICULOS GASOLINEROS Y A GAS MAS RECONOCIDO DEL MERCADO, LOS CONDUCTORES MAS EXIGENTES ELIGEN UN LUBRICANTE QUE LOS PROTEJA INCLUSO SI NO ESTAN MANEJANDO, ESTO PORQUE LAS MOLECULAS MAGNETICAS DEL PRODUCTO (TECNOLOGIA EXCLUSIVA DE CASTROL) SE ADHUEREN Y SIGUEN CUIDANDO EL MOTOR. UN CONDUCTOR QUE DESEE CUIDAR SU VEHICULO Y A LA VEZ BUSCA ECONOMIZAR, ESTE ES EL PRODUCTO IDEAL', 
            category: 'gasolina', 
            specs: { 
                api: 'SP ILSAC GF-6', 
                features: [
                    'CASTROL MAGNATEC SE ADHIERE A LAS PARTES CRÍTICAS DEL MOTOR CUANDO EL ACEITE SE ESCURRE AL CÁRTER PROPORCIONANDO UNA CAPA DE PROTECCIÓN ACTIVA Y CONTINUA ESPECIALMENTE DURANTE EL ENCENDIDO Y EL CALENTAMIENTO Y CONTINÚAN DURANTE TODA LA JORNADA',
                    'SE UNEN A LAS SUPERFICIES DEL METAL PARA PROTEGERLO CONTRA EL DESGASTE FORMULADO CON TECNOLOGÍA SINTÉTICA PARA PROPORCIONAR UNA PROTECCIÓN SUPERIOR A ALTAS Y BAJAS TEMPERATURAS Y EN CUALQUIER ESTILO Y CONDICIÓN DE MANEJO'
                ]
            }
        },
        { 
            id: 'g-ss4', 
            name: 'Castrol MAGNATEC 10W-40', 
            viscosity: '10W-40', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol MAGNATEC 10W-40 - 6x946 ml.jpg' },
                { size: '3.78 L', image: 'img/Castrol MAGNATEC 10W-40 -  3.78 L.jpg' }
            ],
            description: 'Aceite semi-sintético para motores gasolina.', 
            category: 'gasolina', 
            specs: { 
                api: 'SN', 
                features: [
                    'Fórmula semi-sintética',
                    'Protección continua',
                    'Rendimiento confiable',
                    'Moléculas inteligentes'
                ]
            }
        },
        { 
            id: 'g-ss5', 
            name: 'Castrol MAGNATEC 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol MAGNATEC 20W-50 - 6x946 ml.jpg' },
                { size: '3.78 L', image: 'img/Castrol MAGNATEC 20W-50 -  3.78 L.jpg' }
            ],
            description: 'Aceite semi-sintético para motores gasolina de alto kilometraje.', 
            category: 'gasolina', 
            specs: { 
                api: 'SN', 
                features: [
                    'Para alto kilometraje',
                    'Protección extendida',
                    'Control de fugas',
                    'Rendimiento duradero'
                ]
            }
        },
        // Mineral
        { 
            id: 'g-m1', 
            name: 'Castrol GTX 5W-30', 
            viscosity: '5W-30', 
            oilType: 'Mineral', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol GTX 5W-30 - 6x946 ml.jpg' },
                { size: '3x4 L', image: 'img/Castrol GTX 5W-30 -  3x4 L.jpg' }
            ],
            description: 'Aceite mineral para motores gasolina, protección confiable.', 
            category: 'gasolina', 
            specs: { 
                api: 'SN', 
                features: [
                    'Protección confiable',
                    'Limpieza del motor',
                    'Durabilidad comprobada',
                    'Economía de uso'
                ]
            }
        },
        { 
            id: 'g-m2', 
            name: 'Castrol GTX 10W-30', 
            viscosity: '10W-30', 
            oilType: 'Mineral', 
            formats: [
                { size: '12x1 qt', image: 'img/Castrol GTX 10W-30 - 12x1 qt.jpg' },
                { size: '3.78 L', image: 'img/Castrol GTX 10W-30 -  3.78 L.jpg' }
            ],
            description: 'Aceite mineral para motores gasolina.', 
            category: 'gasolina', 
            specs: { 
                api: 'SN', 
                features: [
                    'Fórmula mineral confiable',
                    'Protección básica',
                    'Económico y eficiente',
                    'Calidad Castrol'
                ]
            }
        },
        
        { 
            id: 'g-m4', 
            name: 'Castrol GTX 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Mineral', 
            formats: [
                { size: '12x946 ml', image: 'img/Castrol GTX 20W-50 - 12x946 ml.jpg' },
                { size: '5x3.78 L', image: 'img/Castrol GTX 20W-50 -  5x3.78 L.jpg' }
            ],
            description: 'Aceite mineral para motores gasolina de alto kilometraje.', 
            category: 'gasolina', 
            specs: { 
                api: 'SN', 
                features: [
                    'Para alto kilometraje',
                    'Viscosidad alta',
                    'Control de fugas',
                    'Protección extendida'
                ]
            }
        },
        { 
            id: 'g-m5', 
            name: 'Castrol GTX Gas 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Mineral', 
            formats: [
                { size: '12x946 ml', image: 'img/Castrol GTX Gas 20W-50 - 12x946 ml.jpg' },
                { size: '3.78 L', image: 'img/Castrol GTX Gas 20W-50 -  3.78 L.jpg' }
            ],
            description: 'Aceite mineral para motores a gas.', 
            category: 'gasolina', 
            specs: { 
                api: 'SN', 
                features: [
                    'Especializado para gas',
                    'Protección específica',
                    'Rendimiento optimizado',
                    'Economía de combustible'
                ]
            }
        },
        { 
            id: 'g-m6', 
            name: 'Castrol GTX Alto Kilometraje 25W-60', 
            viscosity: '25W-60', 
            oilType: 'Mineral', 
            formats: [
                { size: '6x1L', image: 'img/Castrol GTX Alto Kilometraje 25W-60 - 6x1 L.jpg' },
                { size: '3.78 L', image: 'img/Castrol GTX Alto Kilometraje 25W-60 - 3.78 L.jpg' }
            ],
            description: 'Aceite mineral para motores de alto kilometraje.', 
            category: 'gasolina', 
            specs: { 
                api: 'SN', 
                features: [
                    'Alto kilometraje',
                    'Viscosidad especial',
                    'Sellado mejorado',
                    'Restauración del motor'
                ]
            }
        },
        // Mineral
        { 
            id: 'g-m7', 
            name: 'Castrol HD Motor Oil SAE 40/50', 
            viscosity: 'SAE 40/50', 
            oilType: 'Mineral', 
            formats: [
                { size: '12x946 ml', image: 'img/Castrol HD Motor Oil SAE 40- 50 - 12x946 ml.jpg' },
                { size: '12x946 ml', image: 'img/Castrol HD Motor Oil SAE 40- 50 - 12x946 ml - 2.jpg' }
            ],
            description: 'Aceite mineral para motores gasolina, protección básica y económica.', 
            category: 'gasolina', 
            specs: { 
                features: [
                    'Protección básica económica',
                    'Para uso general',
                    'Disponible en presentación múltiple',
                    'Ideal para flotas'
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
            formats: [
                { size: '12x1 L', image: 'img/Castrol POWER 1 Ultimate 4T 10W-40 - 12x1 L.jpg' }
            ],
            description: 'Aceite sintético para motos de alto rendimiento.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA2', 
                api: 'SN', 
                features: [
                    'Tecnología sintética avanzada',
                    'Protección del embrague húmedo',
                    'Máximo rendimiento',
                    'Para motos deportivas'
                ]
            }
        },
        { 
            id: 'm-s2', 
            name: 'Castrol POWER 1 4T 15W-50', 
            viscosity: '15W-50', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '12x1 L', image: 'img/Castrol POWER 1 4T 15W-50 - 12x1 L.jpg' }
            ],
            description: 'Aceite sintético para motos deportivas.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA2', 
                api: 'SN', 
                features: [
                    'Para motos deportivas',
                    'Resistencia a altas RPM',
                    'Protección superior',
                    'Tecnología de carreras'
                ]
            }
        },
        { 
            id: 'm-s3', 
            name: 'Castrol POWER 1 V-Twin 4T 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '12x1L', image: 'img/Castrol POWER 1 V-Twin 4T 20W-50 - 12x1 L.jpg' }
            ],
            description: 'Aceite sintético para motos V-Twin.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA', 
                features: [
                    'Especializado para V-Twin',
                    'Protección de motores grandes',
                    'Resistencia a la vibración',
                    'Tecnología sintética avanzada'
                ]
            }
        },
        { 
            id: 'm-s4', 
            name: 'Castrol Actevo St-St 4T 10W-40', 
            viscosity: '10W-40', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '6x1 L', image: 'img/Castrol Actevo St-St 4T 10W-40 - 6x1 L.jpg' }
            ],
            description: 'Aceite sintético para motos 4T.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA', 
                features: [
                    'Tecnología sintética avanzada',
                    'Protección del motor',
                    'Control de temperatura',
                    'Durabilidad mejorada'
                ]
            }
        },
        // Semi-sintético
        { 
            id: 'm-ss1', 
            name: 'Castrol Actevo 4T 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '6x1 L', image: 'img/Castrol Actevo 4T 20W-50 - 6x1 L.jpg' }
            ],
            description: 'Aceite semi-sintético para motos 4T.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA', 
                features: [
                    'Fórmula semi-sintética',
                    'Protección equilibrada',
                    'Uso general',
                    'Confiabilidad probada'
                ]
            }
        },

        // Mineral
        { 
            id: 'm-m1', 
            name: 'Castrol Actevo Essential 4T 25W-60', 
            viscosity: '25W-60', 
            oilType: 'Mineral', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol Actevo Essential 4T 25W-60 - 6x946 ml.jpg' }
            ],
            description: 'Aceite mineral para motos 4T, protección extra.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA', 
                features: [
                    'Alta viscosidad',
                    'Para motores desgastados',
                    'Control de fugas',
                    'Protección extendida'
                ]
            }
        },
        { 
            id: 'm-m2', 
            name: 'Castrol Actevo Essential 4T 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Mineral', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol Actevo Essential 4T 20W-50 - 6x946 ml.jpg' }
            ],
            description: 'Aceite mineral para motos 4T.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA', 
                features: [
                    'Viscosidad equilibrada',
                    'Protección confiable',
                    'Para uso general',
                    'Calidad Castrol'
                ]
            }
        },
        { 
            id: 'm-m3', 
            name: 'Castrol Actevo Essential 2T', 
            viscosity: '2T', 
            oilType: 'Mineral', 
            formats: [
                { size: '100x160 ml', image: 'img/Castrol Actevo Essential 2T - 100x160 ml.jpg' },
                { size: '100x200 ml', image: 'img/Castrol Actevo Essential 2T - 100x200 ml.jpg' }
            ],
            description: 'Aceite mineral para motores 2T, presentación económica.', 
            category: 'motos', 
            specs: { 
                jaso: 'FD', 
                features: [
                    'Para motores 2 tiempos',
                    'Presentación múltiple',
                    'Combustión limpia',
                    'Protección del motor'
                ]
            }
        }

    ],
    complementarios: [
        // Sintético
        { 
            id: 't-s1', 
            name: 'Castrol TRANSMAX Universal LL 75W-90', 
            viscosity: '75W-90', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '20L', image: 'img/Castrol TRANSMAX Universal LL 75W-90 - 20L.jpg' },
                { size: '12x1L', image: 'img/Castrol TRANSMAX Universal LL 75W-90 - 12x1L.jpg' }
            ],
            description: 'Aceite sintético para transmisiones universales.', 
            category: 'complementarios', 
            specs: { 
                api: 'GL-5', 
                features: [
                    'Fórmula sintética avanzada',
                    'Compatibilidad universal',
                    'Larga duración',
                    'Protección superior'
                ]
            }
        },
        // Mineral
        { 
            id: 't-m1', 
            name: 'Castrol TRANSMAX CVT', 
            viscosity: 'CVT', 
            oilType: 'Mineral', 
            formats: [
                { size: '6x1qt', image: 'img/Castrol TRANSMAX CVT - 6x1qt.jpg' }
            ],
            description: 'Aceite mineral para transmisiones CVT.', 
            category: 'complementarios', 
            specs: { 
                type: 'CVT', 
                features: [
                    'Especializado para CVT',
                    'Protección de correa',
                    'Suavidad de operación',
                    'Durabilidad extendida'
                ]
            }
        },
        {
            id: 't-m3', 
            name: 'Castrol TRANSMAX Mercon V/Dexron III', 
            viscosity: 'Mercon V/Dexron III', 
            oilType: 'Mineral', 
            formats: [
                { size: '6x1qt', image: 'img/Castrol TRANSMAX Mercon V - Dexron III - 6x1qt.jpg' }
            ],
            description: 'Aceite mineral para transmisiones automáticas.', 
            category: 'complementarios', 
            specs: { 
                type: 'Mercon V/Dexron III', 
                features: [
                    'Doble especificación',
                    'Versatilidad de uso',
                    'Protección confiable',
                    'Rendimiento probado'
                ]
            }
        },
        { 
            id: 't-m4', 
            name: 'Castrol TRANSMAX Dex/Merc', 
            viscosity: 'Dex/Merc', 
            oilType: 'Mineral', 
            formats: [
                { size: '6x1qt', image: 'img/Castrol TRANSMAX Dex-Merc - 6x1qt.jpg' }
            ],
            description: 'Aceite mineral para transmisiones automáticas.', 
            category: 'complementarios', 
            specs: { 
                type: 'Dexron/Mercon', 
                features: [
                    'Compatibilidad múltiple',
                    'Uso universal',
                    'Economía de inventario',
                    'Calidad confiable'
                ]
            }
        },
        { 
            id: 't-m5', 
            name: 'Castrol AXLE Limited Slip 80W-90', 
            viscosity: '80W-90', 
            oilType: 'Mineral', 
            formats: [
                { size: '12x946L', image: 'img/Castrol AXLE Limited Slip 80W-90 - 12x946L.jpg' },
                { size: '18.9L', image: 'img/Castrol AXLE Limited Slip 80W-90 - 18.9L.jpg' }
            ],
            description: 'Aceite mineral para diferenciales Limited Slip.', 
            category: 'complementarios', 
            specs: { 
                api: 'GL-5 LS', 
                features: [
                    'Para diferenciales Limited Slip',
                    'Aditivos especiales',
                    'Protección anti-chatter',
                    'Rendimiento optimizado'
                ]
            }
        },
        { 
            id: 't-m6', 
            name: 'Castrol AXLE GL-5 85W-140', 
            viscosity: '85W-140', 
            oilType: 'Mineral', 
            formats: [
                { size: '12x1qt', image: 'img/Castrol AXLE GL-5 85W-140 - 12x1qt.jpg' },
                { size: '5gal', image: 'img/Castrol AXLE GL-5 85W-140 - 5gal.jpg' }
            ],
            description: 'Aceite mineral para diferenciales GL-5.', 
            category: 'complementarios', 
            specs: { 
                api: 'GL-5', 
                features: [
                    'Especificación GL-5',
                    'Alta viscosidad',
                    'Protección extrema',
                    'Para trabajo pesado'
                ]
            }
        },
        { 
            id: 't-m7', 
            name: 'Castrol TRANS C 10W/30', 
            viscosity: '10W/30', 
            oilType: 'Mineral', 
            formats: [
                { size: '5 gal', image: 'img/Castrol TRANS C 10W - 30 - 5 gal.jpg' }
            ],
            description: 'Aceite mineral para transmisiones y convertidores.', 
            category: 'complementarios', 
            specs: { 
                features: [
                    'Para transmisiones y convertidores',
                    'Viscosidad media',
                    'Uso industrial',
                    'Protección confiable'
                ]
            }
        },
        { 
            id: 'c1', 
            name: 'Castrol Hyspin AWS 68', 
            viscosity: '68', 
            oilType: '', 
            formats: [
                { size: '5 gal', image: 'img/Castrol Hyspin AWS 68 - 5 gal.jpg' }
            ],
            description: 'Aceite hidráulico para sistemas industriales.', 
            category: 'complementarios', 
            specs: { 
                features: [
                    'Para sistemas hidráulicos',
                    'Protección anti-desgaste',
                    'Estabilidad térmica',
                    'Uso industrial'
                ]
            }
        },
        {
            id: 'c3', 
            name: 'Castrol Universal Tractor Fluid (UTF)', 
            viscosity: '', 
            oilType: '', 
            formats: [
                { size: '5 gal', image: 'img/Castrol Universal Tractor Fluid (UTF) - 5 gal.jpg' }
            ],
            description: 'Fluido universal para tractores y maquinaria agrícola.', 
            category: 'complementarios', 
            specs: { 
                features: [
                    'Fluido multifuncional',
                    'Para tractores',
                    'Aplicación agrícola',
                    'Versatilidad total'
                ]
            }
        },
        { 
            id: 'c4', 
            name: 'Transmax Full Syn MV ATF', 
            viscosity: 'MV ATF', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '6x1qt', image: 'img/Transmax Full Syn MV ATF - 6x1qt.jpg' }
            ],
            description: 'Aceite sintético para transmisiones automáticas de alto rendimiento.', 
            category: 'complementarios', 
            specs: { 
                type: 'MV ATF', 
                features: [
                    'Fórmula sintética avanzada',
                    'Para transmisiones automáticas',
                    'Alto rendimiento',
                    'Protección superior'
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
// elementos de comparación removidos
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
        
        // Ensure functions are globally available immediately
        window.handleVerDetallesClick = handleVerDetallesClick;
        window.openProductModal = openProductModal;
        
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
    let filtered = allProducts;
    
    // Apply search filter
    if (currentFilters.search) {
        const searchTerm = currentFilters.search.toLowerCase();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.viscosity.toLowerCase().includes(searchTerm) ||
            product.oilType.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm))
        );
    }
    
    // Apply category filter
    if (currentFilters.category) {
        filtered = filtered.filter(product => 
            product.category.toLowerCase() === currentFilters.category.toLowerCase()
        );
    }
    
    // Apply oil type filter
    if (currentFilters.oilType) {
        filtered = filtered.filter(product => 
            product.oilType.toLowerCase() === currentFilters.oilType.toLowerCase()
        );
    }
    
    return filtered;
}

// Sort products based on current sort option - FIXED TO CATEGORY ONLY
function sortProducts(products) {
    // Custom category order: gasolina, motos, diesel, complementarios
    const categoryOrder = {
        'gasolina': 1,
        'motos': 2,
        'diesel': 3,
        'complementarios': 4
    };
    
    // Oil type order: Full Sintético, Sintético, Semi-sintético, Mineral
    const oilTypeOrder = {
        'Full Sintético': 1,
        'Sintético': 2,
        'Semi-sintético': 3,
        'Mineral': 4
    };
    
    // Viscosity order for better presentation
    const viscosityOrder = {
        '0W-20': 1,
        '0W-30': 2,
        '5W-20': 3,
        '5W-30': 4,
        '5W-40': 5,
        '10W-30': 6,
        '10W-40': 7,
        '15W-40': 8,
        '20W-50': 9,
        '25W-60': 10,
        'SAE 40/50': 11,
        '2T': 12,
        'CVT': 13,
        'ATF DX III': 14,
        '75W-90': 15
    };
    
    return products.sort((a, b) => {
        // First sort by category
        const categoryOrderA = categoryOrder[a.category] || 999;
        const categoryOrderB = categoryOrder[b.category] || 999;
        if (categoryOrderA !== categoryOrderB) {
            return categoryOrderA - categoryOrderB;
        }
        
        // Then sort by oil type within category
        const oilTypeOrderA = oilTypeOrder[a.oilType] || 999;
        const oilTypeOrderB = oilTypeOrder[b.oilType] || 999;
        if (oilTypeOrderA !== oilTypeOrderB) {
            return oilTypeOrderA - oilTypeOrderB;
        }
        
        // Finally sort by viscosity within oil type
        const viscosityOrderA = viscosityOrder[a.viscosity] || 999;
        const viscosityOrderB = viscosityOrder[b.viscosity] || 999;
        return viscosityOrderA - viscosityOrderB;
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
    
    // Create sections for each category in specific order
    const categoryOrder = ['gasolina', 'motos', 'diesel', 'complementarios'];
    
    categoryOrder.forEach(category => {
        if (groupedProducts[category]) {
            const categorySection = createCategorySection(category, groupedProducts[category]);
            productsContainer.appendChild(categorySection);
        }
    });
    
    // Initialize carousels for products with multiple formats with better timing
    // Using requestAnimationFrame and setTimeout to ensure DOM is fully rendered
    setTimeout(() => {
        requestAnimationFrame(() => {
            initializeProductCarousels();
        });
    }, 200);
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
        <div class="product-grid" id="${category}-products">
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

        complementarios: { name: 'Productos Complementarios', icon: 'fas fa-tools' }
    };
    return categoryMap[category] || { name: category, icon: 'fas fa-box' };
}

// Create product card HTML with carousel support
function createProductCardHTML(product) {
    // Removed oil type banner (kept only small dot and label)
    const isInComparison = false;
    
    // Handle multiple formats
    const hasMultipleFormats = product.formats && product.formats.length > 1;
    const currentFormat = product.formats ? product.formats[0] : { size: product.format || '', image: product.image || '' };
    
    console.log(`🏷️ Creating card for: ${product.name}`, {
        hasMultipleFormats,
        formatsCount: product.formats?.length,
        formats: product.formats?.map(f => f.size)
    });
    
    // Create image carousel if multiple formats - RUTAS CORREGIDAS
    let imageContent = '';
    if (hasMultipleFormats) {
        // Use direct image paths (now perfectly aligned)
        const fixedFormats = product.formats;
        
        imageContent = `
            <div class="product-image-carousel w-full h-full relative" data-product-id="${product.id}">
                ${fixedFormats.map((format, index) => `
                    <img src="${format.image}" 
                         alt="${product.name} - ${format.size}" 
                         class="carousel-image product-image absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${index === 0 ? 'opacity-100' : 'opacity-0'}"
                         data-format-index="${index}"
                         onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='flex');"
                         onload="this.style.opacity='1'; this.parentElement.querySelector('.image-loading') && (this.parentElement.querySelector('.image-loading').style.display='none');">
                    <div class="image-error absolute inset-0 items-center justify-center rounded-t-lg bg-gray-100" style="display: none;">
                        <div class="text-center">
                            <i class="fas fa-image text-4xl text-gray-300 mb-2"></i>
                            <p class="text-xs text-gray-400">Imagen no disponible</p>
                        </div>
                    </div>
                `).join('')}
                
                <!-- Loading indicator for first image -->
                <div class="image-loading absolute inset-0 flex items-center justify-center rounded-t-lg">
                    <div class="text-center">
                        <i class="fas fa-oil-can text-4xl text-gray-400 mb-2 animate-pulse"></i>
                        <p class="text-sm text-gray-500">Cargando imagen...</p>
                    </div>
                </div>
                
                <!-- Format indicators - MEJORADOS PARA MAYOR VISIBILIDAD -->
                <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                    ${fixedFormats.map((format, index) => `
                        <div class="format-indicator w-3 h-3 rounded-full cursor-pointer transition-all duration-300 border-2 ${index === 0 ? 'bg-white border-green-600 shadow-lg ring-2 ring-green-300 scale-110' : 'bg-white bg-opacity-70 border-white hover:bg-opacity-90 hover:border-green-400'}" 
                             data-format-index="${index}"
                             title="Presentación: ${format.size}"></div>
                    `).join('')}
                </div>
                
                <!-- Multiple formats badge -->
                <div class="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    <i class="fas fa-layers mr-1"></i>${fixedFormats.length}
                </div>
            </div>
        `;
    } else {
        // Use direct image path (now perfectly aligned)
        const fixedImagePath = currentFormat.image;
        
        imageContent = `
            <img src="${fixedImagePath}" 
                 alt="${product.name}" 
                 class="product-image w-full h-full object-contain"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                 onload="this.style.opacity='1'; this.nextElementSibling.style.display='none';"
                 style="opacity: 1;">
            <div class="image-loading absolute inset-0 flex items-center justify-center rounded-t-lg">
                <div class="text-center">
                    <i class="fas fa-image text-4xl text-gray-300 mb-2"></i>
                    <p class="text-xs text-gray-400">Imagen no disponible</p>
                    <p class="text-xs text-gray-200 mt-1">${currentFormat.image}</p>
                </div>
            </div>
        `;
    }
    
    // Format display - MEJORADO PARA MÚLTIPLES PRESENTACIONES
    const formatDisplay = hasMultipleFormats 
        ? `<div class="flex items-center space-x-2">
             <span class="text-sm font-semibold text-gray-500 format-display" data-product-id="${product.id}">${currentFormat.size}</span>
             <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
               <i class="fas fa-sync-alt mr-1"></i>+${product.formats.length - 1} más
             </span>
           </div>`
        : `<span class="text-sm font-semibold text-gray-500">${currentFormat.size}</span>`;
    
    return `
                            <div class="bg-white rounded-lg shadow-md card-hover overflow-hidden product-card" 
             data-category="${product.category}" 
             data-product-id="${product.id}"
             data-has-carousel="${hasMultipleFormats}">
            <div class="relative ${currentView === 'list' ? 'w-48 flex-shrink-0' : ''}">
                <div class="product-image-container w-full ${currentView === 'list' ? 'h-full' : 'h-56'} flex items-center justify-center p-4 rounded-t-lg relative">
                    ${imageContent}
                </div>
                
                
            </div>
            
            <div class="p-6 ${currentView === 'list' ? 'flex-1' : ''}">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full ${getOilTypeColor(product.oilType)} mr-2"></div>
                        <span class="text-xs font-medium text-gray-500">${product.oilType || 'Estándar'}</span>
                    </div>
                    ${formatDisplay}
                </div>
                
                <h4 class="text-lg font-bold castrol-green-text mb-2 line-clamp-2">${product.name}</h4>
                <div class="flex items-center mb-3">
                    <span class="text-sm text-gray-600">Viscosidad:</span>
                    <span class="ml-2 px-2 py-1 bg-gray-100 rounded text-sm font-semibold">${product.viscosity}</span>
                </div>
                <p class="text-gray-700 text-sm mb-4 line-clamp-3">${product.description}</p>
                
                <div class="flex gap-2">
                    <button class="flex-1 bg-[#007C41] text-white py-2 px-4 rounded-lg font-medium shadow-md transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 hover:shadow-xl hover:-translate-y-1 transform duration-200 relative z-30" 
                            onclick="handleVerDetallesClick('${product.id}', event); return false;">
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
// Removed banner badge in favor of compact dot with label

// Get oil type color
function getOilTypeColor(oilType) {
    if (!oilType) return 'bg-gray-400';
    return oilType.includes('Full Sintético') ? 'bg-green-500' :
           oilType.includes('Semi-sintético') ? 'bg-orange-500' :
           oilType.includes('Sintético') ? 'bg-green-500' : 'bg-gray-500';
}

// Update results count with enhanced statistics
function updateResultsCount(count) {
    const total = allProducts.length;
    const productsCountElement = document.getElementById('products-count');
    
    // Update the main products count element (now just the number)
    if (productsCountElement) {
        productsCountElement.textContent = count.toString();
        productsCountElement.classList.add('animate-pulse');
        setTimeout(() => productsCountElement.classList.remove('animate-pulse'), 500);
    }
    
    // Update categories count
    const filteredProducts = getFilteredProducts();
    const uniqueCategories = [...new Set(filteredProducts.map(p => p.category))];
    const categoriesCountElement = document.getElementById('categories-count');
    if (categoriesCountElement) {
        categoriesCountElement.textContent = uniqueCategories.length.toString();
    }
    
    console.log(`📊 Displaying ${count} of ${total} products total across ${uniqueCategories.length} categories`);
}

// Setup lazy loading for images with better error handling
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const loadingDiv = img.nextElementSibling;
                
                // Normalize the image source
                const originalSrc = img.dataset.src;
                const normalizedSrc = normalizeImagePath(originalSrc);
                
                img.src = normalizedSrc;
                
                img.onload = () => {
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.3s ease';
                    if (loadingDiv) loadingDiv.style.display = 'none';
                    console.log(`✅ Imagen cargada exitosamente: ${normalizedSrc}`);
                };
                
                img.onerror = () => {
                    console.error(`❌ Error cargando imagen: ${originalSrc} (normalizada: ${normalizedSrc})`);
                    
                    // Try with the original path as fallback
                    if (normalizedSrc !== originalSrc) {
                        console.log(`🔄 Intentando con ruta original: ${originalSrc}`);
                        img.src = originalSrc;
                        
                        img.onerror = () => {
                            img.style.display = 'none';
                            if (loadingDiv) {
                                loadingDiv.innerHTML = `
                                    <div class="text-center">
                                        <i class="fas fa-image text-4xl text-gray-300 mb-2"></i>
                                        <p class="text-xs text-gray-400">Imagen no disponible</p>
                                        <p class="text-xs text-gray-300 mt-1">${originalSrc}</p>
                                    </div>
                                `;
                            }
                        };
                    } else {
                        img.style.display = 'none';
                        if (loadingDiv) {
                            loadingDiv.innerHTML = `
                                <div class="text-center">
                                    <i class="fas fa-image text-4xl text-gray-300 mb-2"></i>
                                    <p class="text-xs text-gray-400">Imagen no disponible</p>
                                    <p class="text-xs text-gray-300 mt-1">${originalSrc}</p>
                                </div>
                            `;
                        }
                    }
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize product carousels for multiple formats
function initializeProductCarousels() {
    console.log('🎠 Initializing product carousels...');
    const carousels = document.querySelectorAll('.product-image-carousel');
    console.log('🔍 Found carousels:', carousels.length);
    
    carousels.forEach(carousel => {
        const productId = carousel.dataset.productId;
        const product = allProducts.find(p => p.id === productId);
        
        console.log(`📦 Processing product: ${productId}`, product?.name, 'Formats:', product?.formats?.length);
        
        if (!product || !product.formats || product.formats.length <= 1) {
            console.log(`❌ Skipping product ${productId}: No multiple formats`);
            return;
        }
        
        let currentIndex = 0;
        let carouselInterval;
        
        const images = carousel.querySelectorAll('.carousel-image');
        const indicators = carousel.querySelectorAll('.format-indicator');
        const formatDisplay = document.querySelector(`.format-display[data-product-id="${productId}"]`);
        
        function showFormat(index) {
            console.log(`🎯 Showing format ${index} for product ${productId}`, product.formats[index]?.size);
            
            // Validate index
            if (index < 0 || index >= product.formats.length) {
                console.error(`❌ Invalid format index ${index} for product ${productId}`);
                return;
            }
            
            // Hide all images
            images.forEach((img, i) => {
                if (i === index) {
                    img.classList.remove('opacity-0');
                    img.classList.add('opacity-100');
                    img.style.display = 'block';
                } else {
                    img.classList.remove('opacity-100');
                    img.classList.add('opacity-0');
                    img.style.display = 'none';
                }
            });
            
                    // Update indicators - FIXED CLASSES
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.remove('bg-white', 'bg-opacity-70', 'border-white');
                indicator.classList.add('bg-white', 'border-green-600', 'shadow-lg', 'ring-2', 'ring-green-300', 'scale-110');
            } else {
                indicator.classList.remove('bg-white', 'border-green-600', 'shadow-lg', 'ring-2', 'ring-green-300', 'scale-110');
                indicator.classList.add('bg-white', 'bg-opacity-70', 'border-white');
            }
        });
            
            // Update format display
            if (formatDisplay) {
                formatDisplay.textContent = product.formats[index].size;
                // Visual feedback on format label
                formatDisplay.classList.add('text-green-700');
                setTimeout(() => formatDisplay.classList.remove('text-green-700'), 600);
            }
            
            currentIndex = index;
        }
        
        function nextFormat() {
            const nextIndex = (currentIndex + 1) % product.formats.length;
            console.log(`➡️ Next format: ${currentIndex} → ${nextIndex} for product ${productId}`);
            showFormat(nextIndex);
        }
        
        function startCarousel() {
            console.log(`🏁 Starting carousel for product ${productId}`);
            carouselInterval = setInterval(nextFormat, 5000); // Change every 5 seconds (un poco más lento)
        }
        
        function stopCarousel() {
            if (carouselInterval) {
                clearInterval(carouselInterval);
            }
        }
        
        // Add click handlers to indicators with improved error handling
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`🎯 Card indicator clicked: ${index} for product ${productId}`);
                showFormat(index);
                stopCarousel();
                setTimeout(startCarousel, 2000); // Restart after 2 seconds
            });
        });
        
        // Pause carousel on hover
        const productCard = carousel.closest('.product-card');
        if (productCard) {
            productCard.addEventListener('mouseenter', stopCarousel);
            productCard.addEventListener('mouseleave', startCarousel);
        }
        
        // Start the carousel
        startCarousel();
    });
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

// Open product modal with improved error handling
function openProductModal(productId) {
    console.log('🖼️ Opening modal for product:', productId);
    
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        console.error('❌ Product not found:', productId);
        console.log('Available products:', allProducts.map(p => ({ id: p.id, name: p.name })));
        return;
    }
    
    console.log('✅ Product found:', product.name, 'with formats:', product.formats?.length || 0);
    
    // Ensure modal elements are available
    if (!productModal) {
        console.error('❌ productModal element not found');
        return;
    }
    
    if (!modalTitle) {
        console.error('❌ modalTitle element not found');
        return;
    }
    
    if (!modalContent) {
        console.error('❌ modalContent element not found');
        return;
    }
    
    console.log('✅ All modal elements found, proceeding with modal creation');
    
    modalTitle.textContent = product.name;
    modalContent.innerHTML = createModalContent(product);
    
    // removed: botón de comparación en modal
    
    // Initialize modal carousel if product has multiple formats
    if (product.formats && product.formats.length > 1) {
        initializeModalCarousel(product);
    }
    
    productModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Helper function for handling "Ver detalles" button clicks
function handleVerDetallesClick(productId, event) {
    console.log('🖱️ Ver detalles clicked for:', productId, event);
    event.stopPropagation();
    event.preventDefault();
    
    // Double-check the product exists
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        console.error('❌ Product not found in handleVerDetallesClick:', productId);
        console.log('Available products:', allProducts.map(p => p.id));
        return;
    }
    
    console.log('✅ Product found, opening modal for:', product.name);
    openProductModal(productId);
}

// Create modal content with multiple format support
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
    
    // Handle multiple formats
    const hasMultipleFormats = product.formats && product.formats.length > 1;
    const currentFormat = product.formats ? product.formats[0] : { size: product.format || '', image: product.image || '' };
    const fixedFormats = product.formats || [];
    
    // Create image content - with corrected image paths
    let imageContent = '';
    if (hasMultipleFormats) {
        // Use direct image paths (now perfectly aligned)
        
        imageContent = `
            <div class="modal-image-carousel relative w-full h-64" data-product-id="${product.id}">
                ${fixedFormats.map((format, index) => `
                    <img src="${format.image}" 
                         alt="${product.name} - ${format.size}" 
                         class="modal-carousel-image absolute inset-0 w-full h-full object-contain rounded-lg transition-opacity duration-500 ${index === 0 ? 'opacity-100' : 'opacity-0'}"
                         data-format-index="${index}"
                         onerror="this.style.display='none'; this.parentElement.querySelector('.image-error').style.display='flex';">
                `).join('')}
                
                <div class="image-error text-center absolute inset-0 flex items-center justify-center" style="display: none;">
                    <div>
                        <i class="fas fa-oil-can text-6xl text-gray-400 mb-3"></i>
                        <p class="text-sm text-gray-500">Imagen no disponible</p>
                    </div>
                </div>
                
                <!-- Navigation arrows for modal -->
                <button class="modal-carousel-prev absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all">
                    <i class="fas fa-chevron-left text-sm"></i>
                </button>
                <button class="modal-carousel-next absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all">
                    <i class="fas fa-chevron-right text-sm"></i>
                </button>
                
                <!-- Format indicators - MEJORADOS PARA MODAL -->
                <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    ${fixedFormats.map((format, index) => `
                        <div class="modal-format-indicator px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 border-2 ${index === 0 ? 'bg-white text-green-600 border-green-600 shadow-lg' : 'bg-black bg-opacity-70 text-white border-transparent hover:bg-opacity-90 hover:border-green-400'}" 
                             data-format-index="${index}"
                             title="Presentación: ${format.size}">
                            <i class="fas fa-cube mr-1"></i>${format.size}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        // Use direct image path (now perfectly aligned)
        const fixedImagePath = currentFormat.image;
        
        imageContent = `
            <img src="${fixedImagePath}" alt="${product.name}" 
                 class="w-full h-full object-contain rounded-lg"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="text-center" style="display: none;">
                <i class="fas fa-oil-can text-6xl text-gray-400 mb-3"></i>
                <p class="text-sm text-gray-500">Imagen no disponible</p>
            </div>
        `;
    }
    
    // Create formats list for info section
    let formatsInfo = '';
    if (hasMultipleFormats) {
        formatsInfo = `
            <div class="flex justify-between">
                <span class="font-medium">Formatos disponibles:</span>
                <div class="text-right">
                    ${fixedFormats.map(format => `<div class="text-sm">${format.size}</div>`).join('')}
                </div>
            </div>
        `;
    } else {
        formatsInfo = `
            <div class="flex justify-between">
                <span class="font-medium">Formato:</span>
                <span>${currentFormat.size}</span>
            </div>
        `;
    }
    
    return `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <div class="relative mb-6">
                    <div class="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center p-6 relative">
                    ${imageContent}
                </div>
                    
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
                        ${formatsInfo}
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
                    <a href="https://wa.me/51984618572?text=${encodeURIComponent(`Hola, me interesa el producto: ${product.name}`)}" 
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
                    ${product.sourceUrl ? `
                    <a href="${product.sourceUrl}" target="_blank" class="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors text-center font-medium">
                        <i class="fas fa-file-alt mr-2"></i> Ficha técnica
                    </a>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Initialize modal carousel for multiple formats
function initializeModalCarousel(product) {
    console.log('🖼️ Initializing modal carousel for:', product.name, 'Formats:', product.formats?.length);
    
    const carousel = document.querySelector('.modal-image-carousel');
    if (!carousel) {
        console.error('❌ Modal carousel not found for product:', product.id);
        return;
    }
    
    let currentIndex = 0;
    const images = carousel.querySelectorAll('.modal-carousel-image');
    let indicators = carousel.querySelectorAll('.modal-format-indicator');
    const prevBtn = carousel.querySelector('.modal-carousel-prev');
    const nextBtn = carousel.querySelector('.modal-carousel-next');
    
    console.log('🔍 Found modal elements:', {
        images: images.length,
        indicators: indicators.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn
    });
    
    function showFormat(index) {
        console.log(`🎯 Modal showing format ${index}:`, product.formats[index]?.size);
        
        // Hide all images
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
            } else {
                img.classList.remove('opacity-100');
                img.classList.add('opacity-0');
            }
        });
        
        // Update indicators - FIXED TO MATCH GREEN THEME
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.remove('bg-black', 'bg-opacity-70', 'text-white', 'border-transparent');
                indicator.classList.add('bg-white', 'text-green-600', 'border-green-600', 'shadow-lg', 'ring-2', 'ring-green-300');
            } else {
                indicator.classList.remove('bg-white', 'text-green-600', 'border-green-600', 'shadow-lg', 'ring-2', 'ring-green-300');
                indicator.classList.add('bg-black', 'bg-opacity-70', 'text-white', 'border-transparent');
            }
        });
        
        currentIndex = index;
    }
    
    function nextFormat() {
        const nextIndex = (currentIndex + 1) % product.formats.length;
        console.log(`➡️ Modal next: ${currentIndex} → ${nextIndex}`);
        showFormat(nextIndex);
    }
    
    function prevFormat() {
        const prevIndex = (currentIndex - 1 + product.formats.length) % product.formats.length;
        console.log(`⬅️ Modal prev: ${currentIndex} → ${prevIndex}`);
        showFormat(prevIndex);
    }
    
    // Remove any existing event listeners first
    const existingNextBtn = carousel.querySelector('.modal-carousel-next');
    const existingPrevBtn = carousel.querySelector('.modal-carousel-prev');
    
    if (existingNextBtn) {
        existingNextBtn.replaceWith(existingNextBtn.cloneNode(true));
    }
    if (existingPrevBtn) {
        existingPrevBtn.replaceWith(existingPrevBtn.cloneNode(true));
    }
    
    // Get fresh references after cloning
    const freshNextBtn = carousel.querySelector('.modal-carousel-next');
    const freshPrevBtn = carousel.querySelector('.modal-carousel-prev');
    
    // Add navigation event listeners
    if (freshNextBtn) {
        freshNextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextFormat();
        });
    }
    
    if (freshPrevBtn) {
        freshPrevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevFormat();
        });
    }
    
    // Add indicator click handlers (refresh nodes after cloning to keep references in sync)
    indicators.forEach((indicator, index) => {
        const newIndicator = indicator.cloneNode(true);
        indicator.parentNode.replaceChild(newIndicator, indicator);
    });
    // Re-query indicators after replacement and attach listeners
    indicators = carousel.querySelectorAll('.modal-format-indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`🎯 Modal indicator clicked: ${index}`);
            showFormat(index);
        });
    });
    
    // Store the keyboard handler to remove it later
    window.modalKeyNavHandler = function(e) {
        if (!productModal.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevFormat();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextFormat();
            }
        }
    };
    
    // Remove previous handler if exists
    if (window.previousModalKeyNavHandler) {
        document.removeEventListener('keydown', window.previousModalKeyNavHandler);
    }
    
    // Add new keyboard navigation
    document.addEventListener('keydown', window.modalKeyNavHandler);
    window.previousModalKeyNavHandler = window.modalKeyNavHandler;
    
    console.log('✅ Modal carousel initialized successfully');
}

// Close product modal
function closeProductModal() {
    productModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    // Clean up modal carousel event listeners
    if (window.previousModalKeyNavHandler) {
        document.removeEventListener('keydown', window.previousModalKeyNavHandler);
        window.previousModalKeyNavHandler = null;
    }
    
    console.log('🚪 Modal closed and event listeners cleaned up');
}

// Toggle product in comparison list
// removed: toggleProductComparison

// Update comparison UI
// removed: updateComparisonUI

// Open comparison modal
// removed: openComparisonModal

// Create comparison content
// removed: createComparisonContent

// Get oil type class for comparison
// removed: getOilTypeClass

// Update comparison after remove
// removed: updateComparisonAfterRemove

// Close comparison modal
// removed: closeComparisonModal

// Clear comparison
// removed: clearComparison

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
	
	// Sync UI with state
	updateFilterChipsUI();
	
    loadProducts();
}

// Setup event listeners - WITH SEARCH RESTORED
function setupEventListeners() {
    console.log('✅ Setting up event listeners with search functionality');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value;
            loadProducts();
            
            // Show/hide clear button
            if (clearSearchBtn) {
                clearSearchBtn.classList.toggle('hidden', !e.target.value);
            }
        });
    }
    
    // Clear search button
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentFilters.search = '';
            clearSearchBtn.classList.add('hidden');
            loadProducts();
        });
    }
    
    // Filter chips functionality
    filterChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const filterType = chip.dataset.filter;
            const filterValue = chip.dataset.value;
            
            // Update filter state
            currentFilters[filterType] = filterValue;
			
			// Sync UI with state and apply filters
			updateFilterChipsUI();
            loadProducts();
        });
    });
    
    // Modal functionality
    closeModal.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
    
    // comparación eliminada
    
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
            }
        }
        
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
}

// Ensure the UI reflects currentFilters state for active chips
function updateFilterChipsUI() {
	// Category chips
	document.querySelectorAll('.filter-chip[data-filter="category"]').forEach(chip => {
		const isActive = (currentFilters.category ?? '') === chip.dataset.value;
		chip.classList.toggle('active', isActive);
	});
	// Oil type chips
	document.querySelectorAll('.filter-chip[data-filter="oilType"]').forEach(chip => {
		const isActive = (currentFilters.oilType ?? '') === chip.dataset.value;
		chip.classList.toggle('active', isActive);
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
        
        const whatsappUrl = `https://wa.me/51984618572?text=${encodeURIComponent(whatsappMessage)}`;
        
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
                
            }
        }
        
        // Modal navigation
        if (e.key === 'Escape') {
            if (!productModal.classList.contains('hidden')) {
                closeProductModal();
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
window.handleVerDetallesClick = handleVerDetallesClick;
window.closeProductModal = closeProductModal; 
window.shareProduct = shareProduct;
window.resetAllFilters = resetAllFilters;

// Diagnostic function to check missing images
function checkMissingImages() {
    console.log('🔍 Verificando imágenes faltantes...');
    const missingImages = [];
    
    Object.keys(products).forEach(category => {
        products[category].forEach(product => {
            if (product.formats) {
                product.formats.forEach((format, index) => {
                    const img = new Image();
                    img.onload = () => {
                        console.log(`✅ Imagen cargada: ${format.image}`);
                    };
                    img.onerror = () => {
                        console.error(`❌ Imagen NO encontrada: ${format.image}`);
                        missingImages.push({
                            product: product.name,
                            category: category,
                            format: format.size,
                            image: format.image
                        });
                    };
                    img.src = format.image;
                });
            } else if (product.image) {
                const img = new Image();
                img.onload = () => {
                    console.log(`✅ Imagen cargada: ${product.image}`);
                };
                img.onerror = () => {
                    console.error(`❌ Imagen NO encontrada: ${product.image}`);
                    missingImages.push({
                        product: product.name,
                        category: category,
                        image: product.image
                    });
                };
                img.src = product.image;
            }
        });
    });
    
    setTimeout(() => {
        if (missingImages.length > 0) {
            console.log('🚨 Imágenes faltantes encontradas:', missingImages);
        } else {
            console.log('✅ Todas las imágenes están disponibles');
        }
    }, 3000);
}

// ✅ SOLUCIONADO: Ya no necesitamos normalización - todas las rutas están perfectamente alineadas

// ✅ SOLUCIONADO: Ya no necesitamos imagePathFixes
// Todas las rutas de imágenes en el código ahora usan guiones normales (-) 
// como los archivos reales, por lo que coinciden perfectamente

// ✅ Ya no necesitamos función de test - problema resuelto

// ✅ Ya no necesitamos función de fix - todas las rutas están corregidas
function initializeImageSystem() {
    console.log('✅ Sistema de imágenes: Todas las rutas están alineadas correctamente');
}

// Initialize image system on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeImageSystem();
    // Enable diagnostic temporarily to check improvements
    setTimeout(() => {
        checkMissingImages();
    }, 1000);
});

// Diagnostic function to manually test carousel functionality
function testCarousels() {
    console.log('🧪 Testing carousel functionality...');
    
    const carousels = document.querySelectorAll('.product-image-carousel');
    console.log(`Found ${carousels.length} carousels on page`);
    
    carousels.forEach((carousel, carouselIndex) => {
        const productId = carousel.dataset.productId;
        const product = allProducts.find(p => p.id === productId);
        const images = carousel.querySelectorAll('.carousel-image');
        const indicators = carousel.querySelectorAll('.format-indicator');
        
        console.log(`Carousel ${carouselIndex}:`, {
            productId,
            productName: product?.name,
            imagesFound: images.length,
            indicatorsFound: indicators.length,
            formatCount: product?.formats?.length
        });
        
        // Test manual format switching
        if (images.length > 1) {
            console.log(`Testing format switch for ${product.name}`);
            images.forEach((img, i) => {
                if (i === 1) { // Show second image
                    img.classList.remove('opacity-0');
                    img.classList.add('opacity-100');
                } else {
                    img.classList.remove('opacity-100');
                    img.classList.add('opacity-0');
                }
            });
        }
    });
}

// Force carousel initialization (for debugging)
function forceCarouselInit() {
    console.log('🔄 Force initializing carousels...');
    initializeProductCarousels();
}

// Make diagnostic functions globally available
window.testCarousels = testCarousels;
window.forceCarouselInit = forceCarouselInit;



// Clean up and optimize - removed diagnostic function

// New enhanced functions for the professional search bar
function toggleAdvancedFilters() {
    // For now, just show a message (can be expanded later)
    showToast('💡 Los filtros avanzados ya están visibles. ¡Usa las categorías y tipos de aceite!');
}

function exportResults() {
    const filteredProducts = getFilteredProducts();
    if (filteredProducts.length === 0) {
        showToast('⚠️ No hay productos para exportar. Ajusta tus filtros.', 'warning');
        return;
    }
    
    // Create CSV content
    const csvContent = [
        // Header
        'Nombre,Categoría,Viscosidad,Tipo de Aceite,Descripción',
        // Data rows
        ...filteredProducts.map(product => 
            `"${product.name}","${product.category}","${product.viscosity}","${product.oilType}","${product.description || ''}"`
        )
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `catalogo-castrol-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`✅ Exportados ${filteredProducts.length} productos a CSV`, 'success');
    }
}

// Make new functions available globally
window.toggleAdvancedFilters = toggleAdvancedFilters;
window.exportResults = exportResults;