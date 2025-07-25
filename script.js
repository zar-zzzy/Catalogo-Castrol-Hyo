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
                { size: '5 gal', image: 'img/Castrol Vecton Long Drain E6-E9 10W-40 - 5 gal.jpg' },
                { size: '208 L', image: 'img/Castrol Vecton Long Drain E6-E9 10W-40 -  208 L.jpg' }
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
            name: 'Castrol Vecton LD CK-4/E9 10W-30', 
            viscosity: '10W-30', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '5 gal', image: 'img/Castrol Vecton LD CK-4-E9 10W-30 - 5 gal.jpg' },
                { size: '208 L', image: 'img/Castrol Vecton LD CK-4-E9 10W-30 -  208 L.jpg' }
            ],
            description: 'Aceite sintético para motores diésel modernos, máxima eficiencia y protección.', 
            category: 'diesel', 
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
            formats: [
                { size: '5 gal', image: 'img/Castrol Vecton CK-4-SN 15W-40 - 5 gal.jpg' },
                { size: '208L', image: 'img/Castrol Vecton CK-4-SN 15W-40 - 208L.jpg' }
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
            oilType: 'Semi-sintético', 
            formats: [
                { size: '18.9 L', image: 'img/Castrol CRB Multi CK-4 15W-40 - 18.9 L.jpg' },
                { size: '5 gal', image: 'img/Castrol CRB Multi CK-4 15W-40 - 5gal.jpg' }
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
                { size: '18.9 L', image: 'img/Castrol CRB Turbomax CI-4-SL-E7 15W-40 - 18.9 L.jpg' },
                { size: '5 gal', image: 'img/Castrol CRB Turbomax CI-4-SL-E7 15W-40 -  5 gal.jpg' }
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
                { size: '946 ml', image: 'img/Castrol CRB Viscus 25W-60 -  946 ml.jpg' },
                { size: 'galón', image: 'img/Castrol CRB Viscus 25W-60 - galón.jpg' }
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
        },
        { 
            id: 'd-m3', 
            name: 'Castrol CRB Monograde SAE 40/50', 
            viscosity: 'SAE 40/50', 
            oilType: 'Mineral', 
            formats: [
                { size: '5 gal', image: 'img/Castrol CRB Monograde SAE 40 - 50 - 5 gal.jpg' },
                { size: '208 L', image: 'img/Castrol CRB Monograde SAE 40 - 50 - 208 L.jpg' }
            ],
            description: 'Aceite monogrado mineral para motores diésel convencionales.', 
            category: 'diesel', 
            specs: { 
                features: [
                    'Fórmula monogrado tradicional',
                    'Protección básica confiable',
                    'Económico y eficiente',
                    'Para motores convencionales'
                ]
            }
        },
        { 
            id: 'd-m4', 
            name: 'Castrol HD Motor Oil SAE 40/50', 
            viscosity: 'SAE 40/50', 
            oilType: 'Mineral', 
            formats: [
                { size: '12x946 ml', image: 'img/Castrol HD Motor Oil SAE 40- 50 - 12x946 ml.jpg' }
            ],
            description: 'Aceite mineral para motores diésel, protección básica y económica.', 
            category: 'diesel', 
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
    gasolina: [
        // Full Sintético
        { 
            id: 'g-s1', 
            name: 'Castrol EDGE Professional V 0W-20', 
            viscosity: '0W-20', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol EDGE Professional V 0W-20 - 6x946 ml.jpg' }
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
                { size: '6x946 ml', image: 'img/Castrol EDGE Professional EC 0W-20 - 6x946 ml.jpg' }
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
            name: 'Castrol EDGE 0W-30 HC1', 
            viscosity: '0W-30', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '12x1 L', image: 'img/Castrol EDGE 0W-30 HC1 - 12x1 L.jpg' }
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
            name: 'Castrol EDGE US Dexos 5W-30', 
            viscosity: '5W-30', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol EDGE US Dexos 5W-30 - 6x946 ml.jpg' },
                { size: '5 qt', image: 'img/Castrol EDGE US Dexos 5W-30 - 5 qt.jpg' }
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
            id: 'g-s5', 
            name: 'Castrol EDGE K 5W-30', 
            viscosity: '5W-30', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '5 qt', image: 'img/Castrol EDGE K 5W-30 - 5 qt.jpg' }
            ],
            description: 'Aceite sintético para motores de última generación.', 
            category: 'gasolina', 
            specs: { 
                api: 'SP', 
                features: [
                    'Fórmula K especializada',
                    'Máxima protección',
                    'Rendimiento superior',
                    'Tecnología avanzada'
                ]
            }
        },
        { 
            id: 'g-s6', 
            name: 'Castrol EDGE A3/B4 5W-40', 
            viscosity: '5W-40', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol EDGE A3-B4 5W-40 - 6x946 ml.jpg' }
            ],
            description: 'Aceite sintético para motores de alto desempeño.', 
            category: 'gasolina', 
            specs: { 
                api: 'SP', 
                acea: 'A3/B4', 
                features: [
                    'Especificación europea A3/B4',
                    'Alto rendimiento',
                    'Protección avanzada',
                    'Calidad superior'
                ]
            }
        },
        { 
            id: 'g-s7', 
            name: 'Castrol EDGE Turbo Diesel 5W-40', 
            viscosity: '5W-40', 
            oilType: 'Full Sintético', 
            formats: [
                { size: '12x1 L', image: 'img/Castrol EDGE Turbo Diesel 5W-40 - 12x1 L.jpg' },
                { size: '4x4 L', image: 'img/Castrol EDGE Turbo Diesel 5W-40 -  4x4 L.jpg' }
            ],
            description: 'Aceite sintético para motores turbo gasolina y diésel.', 
            category: 'gasolina', 
            specs: { 
                api: 'SP', 
                features: [
                    'Para motores turbo',
                    'Protección contra altas temperaturas',
                    'Rendimiento dual',
                    'Tecnología avanzada'
                ]
            }
        },
        // Semi-sintético
        { 
            id: 'g-ss1', 
            name: 'Castrol MAGNATEC C3 5W-30', 
            viscosity: '5W-30', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '12x1 L', image: 'img/Castrol MAGNATEC C3 5W-30 - 12x1 L.jpg' },
                { size: '4x4 L', image: 'img/Castrol MAGNATEC C3 5W-30 -  4x4 L.jpg' }
            ],
            description: 'Aceite semi-sintético con moléculas inteligentes para protección continua.', 
            category: 'gasolina', 
            specs: { 
                api: 'SN', 
                acea: 'C3', 
                features: [
                    'Moléculas inteligentes',
                    'Protección desde el arranque',
                    'Reducción del desgaste',
                    'Tecnología MAGNATEC'
                ]
            }
        },
        { 
            id: 'g-ss2', 
            name: 'Castrol MAGNATEC 508 88 5W-40', 
            viscosity: '5W-40', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '12x1 L', image: 'img/Castrol MAGNATEC 508 88 5W-40 - 12x1 L.jpg' }
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
                { size: '6x946 ml', image: 'img/Castrol MAGNATEC 10W-30 - 6x946 ml.jpg' },
                { size: '3.78 L', image: 'img/Castrol MAGNATEC 10W-30 -  3.78 L.jpg' }
            ],
            description: 'Aceite semi-sintético para motores gasolina.', 
            category: 'gasolina', 
            specs: { 
                api: 'SN', 
                features: [
                    'Protección inteligente',
                    'Arranque seguro',
                    'Durabilidad mejorada',
                    'Tecnología probada'
                ]
            }
        },
        { 
            id: 'g-ss4', 
            name: 'Castrol MAGNATEC 10W-40', 
            viscosity: '10W-40', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol MAGNATEC 10W-40 - 6x946 ml.jpg' },
                { size: '3.78 L', image: 'img/Castrol MAGNATEC 10W-40 -  3.78 L.jpg' }
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
                { size: '6x946 ml', image: 'img/Castrol MAGNATEC 20W-50 - 6x946 ml.jpg' },
                { size: '3.78 L', image: 'img/Castrol MAGNATEC 20W-50 -  3.78 L.jpg' }
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
                { size: '6x946 ml', image: 'img/Castrol GTX 5W-30 - 6x946 ml.jpg' },
                { size: '3x4 L', image: 'img/Castrol GTX 5W-30 -  3x4 L.jpg' }
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
                { size: '12x1 qt', image: 'img/Castrol GTX 10W-30 - 12x1 qt.jpg' },
                { size: '3.78 L', image: 'img/Castrol GTX 10W-30 -  3.78 L.jpg' }
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
            id: 'g-m3', 
            name: 'Castrol GTX 10W-40', 
            viscosity: '10W-40', 
            oilType: 'Mineral', 
            formats: [
                { size: '3.78 L', image: 'img/Castrol GTX 10W-40 - 3.78 L.jpg' }
            ],
            description: 'Aceite mineral para motores gasolina.', 
            category: 'gasolina', 
            specs: { 
                api: 'SN', 
                features: [
                    'Viscosidad media',
                    'Protección equilibrada',
                    'Uso general',
                    'Confiabilidad probada'
                ]
            }
        },
        { 
            id: 'g-m4', 
            name: 'Castrol GTX 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Mineral', 
            formats: [
                { size: '12x946 ml', image: 'img/Castrol GTX 20W-50 - 12x946 ml.jpg' },
                { size: '5x3.78 L', image: 'img/Castrol GTX 20W-50 -  5x3.78 L.jpg' }
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
                { size: '12x946 ml', image: 'img/Castrol GTX Gas 20W-50 - 12x946 ml.jpg' },
                { size: '3.78 L', image: 'img/Castrol GTX Gas 20W-50 -  3.78 L.jpg' }
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
                { size: '12x1 L', image: 'img/Castrol POWER 1 Ultimate 4T 10W-40 - 12x1 L.jpg' }
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
                { size: '12x1 L', image: 'img/Castrol POWER 1 4T 15W-50 - 12x1 L.jpg' }
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
        // Semi-sintético
        { 
            id: 'm-ss1', 
            name: 'Castrol Actevo St-St 4T 10W-30', 
            viscosity: '10W-30', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '6x1 L', image: 'img/Castrol Actevo St-St 4T 10W-30 - 6x1 L.jpg' }
            ],
            description: 'Aceite semi-sintético para motos 4T.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA', 
                features: [
                    'Fórmula semi-sintética',
                    'Protección equilibrada',
                    'Arranque mejorado',
                    'Rendimiento confiable'
                ]
            }
        },
        { 
            id: 'm-ss2', 
            name: 'Castrol Actevo St-St 4T 10W-40', 
            viscosity: '10W-40', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '6x1 L', image: 'img/Castrol Actevo St-St 4T 10W-40 - 6x1 L.jpg' }
            ],
            description: 'Aceite semi-sintético para motos 4T.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA', 
                features: [
                    'Viscosidad versátil',
                    'Protección del motor',
                    'Control de temperatura',
                    'Durabilidad mejorada'
                ]
            }
        },
        { 
            id: 'm-ss3', 
            name: 'Castrol Actevo St-St 4T 15W-50', 
            viscosity: '15W-50', 
            oilType: 'Semi-sintético', 
            formats: [
                { size: '12x1 L', image: 'img/Castrol Actevo St-St 4T 15W-50 - 12x1 L.jpg' }
            ],
            description: 'Aceite semi-sintético para motos 4T.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA', 
                features: [
                    'Alta viscosidad',
                    'Protección extrema',
                    'Para condiciones severas',
                    'Resistencia térmica'
                ]
            }
        },
        // Mineral
        { 
            id: 'm-m1', 
            name: 'Castrol POWER 1 V-Twin 4T 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Mineral', 
            formats: [
                { size: '6x1 qt', image: 'img/Castrol POWER 1 V-Twin 4T 20W-50 - 6x1 qt.jpg' }
            ],
            description: 'Aceite mineral para motos V-Twin.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA', 
                features: [
                    'Especializado para V-Twin',
                    'Protección de motores grandes',
                    'Resistencia a la vibración',
                    'Fórmula tradicional'
                ]
            }
        },
        { 
            id: 'm-m2', 
            name: 'Castrol Actevo 4T 20W-50', 
            viscosity: '20W-50', 
            oilType: 'Mineral', 
            formats: [
                { size: '6x1 L', image: 'img/Castrol Actevo 4T 20W-50 - 6x1 L.jpg' }
            ],
            description: 'Aceite mineral para motos 4T.', 
            category: 'motos', 
            specs: { 
                jaso: 'MA', 
                features: [
                    'Fórmula mineral económica',
                    'Protección básica',
                    'Uso general',
                    'Confiabilidad probada'
                ]
            }
        },
        { 
            id: 'm-m3', 
            name: 'Castrol Actevo Essential 4T 25W-60', 
            viscosity: '25W-60', 
            oilType: 'Mineral', 
            formats: [
                { size: '6x946 ml', image: 'img/Castrol Actevo Essential 4T 25W-60 - 6x946 ml.jpg' }
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
            id: 'm-m4', 
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
                    'Presentación económica',
                    'Protección confiable',
                    'Para uso diario',
                    'Calidad Castrol'
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
            formats: [
                { size: '18.9 L', image: 'img/Castrol TRANSMAX Universal LL 75W-90 - 18.9 L.jpg' }
            ],
            description: 'Aceite sintético para transmisiones universales.', 
            category: 'transmisiones', 
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
                { size: '18.9 L', image: 'img/Castrol TRANSMAX CVT - 18.9 L.jpg' }
            ],
            description: 'Aceite mineral para transmisiones CVT.', 
            category: 'transmisiones', 
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
            id: 't-m2', 
            name: 'Castrol TRANSMAX ATF DX III', 
            viscosity: 'ATF DX III', 
            oilType: 'Mineral', 
            formats: [
                { size: '18.9 L', image: 'img/Castrol TRANSMAX ATF DX III - 18.9 L.jpg' }
            ],
            description: 'Aceite mineral para transmisiones automáticas.', 
            category: 'transmisiones', 
            specs: { 
                type: 'ATF DX III', 
                features: [
                    'Especificación Dexron III',
                    'Cambios suaves',
                    'Protección hidráulica',
                    'Compatibilidad amplia'
                ]
            }
        },
        { 
            id: 't-m3', 
            name: 'Castrol TRANSMAX Mercon V/Dexron III', 
            viscosity: 'Mercon V/Dexron III', 
            oilType: 'Mineral', 
            formats: [
                { size: '18.9 L', image: 'img/Castrol TRANSMAX Mercon V - Dexron III - 18.9 L.jpg' }
            ],
            description: 'Aceite mineral para transmisiones automáticas.', 
            category: 'transmisiones', 
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
                { size: '18.9 L', image: 'img/Castrol TRANSMAX Dex-Merc - 18.9 L.jpg' }
            ],
            description: 'Aceite mineral para transmisiones automáticas.', 
            category: 'transmisiones', 
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
                { size: '18.9 L', image: 'img/Castrol AXLE Limited Slip 80W-90 - 18.9 L.jpg' }
            ],
            description: 'Aceite mineral para diferenciales Limited Slip.', 
            category: 'transmisiones', 
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
                { size: '18.9 L', image: 'img/Castrol AXLE GL-5 85W-140 - 18.9 L.jpg' }
            ],
            description: 'Aceite mineral para diferenciales GL-5.', 
            category: 'transmisiones', 
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
            category: 'transmisiones', 
            specs: { 
                features: [
                    'Para transmisiones y convertidores',
                    'Viscosidad media',
                    'Uso industrial',
                    'Protección confiable'
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
            id: 'c2', 
            name: 'Castrol Hyspin AWS 46', 
            viscosity: '46', 
            oilType: '', 
            formats: [
                { size: '5 gal', image: 'img/Castrol Hyspin AWS 46 - 5 gal.jpg' }
            ],
            description: 'Aceite hidráulico para sistemas industriales.', 
            category: 'complementarios', 
            specs: { 
                features: [
                    'Viscosidad media',
                    'Aplicación universal',
                    'Protección hidráulica',
                    'Calidad industrial'
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
            name: 'Castrol Actevo Essential 2T', 
            viscosity: '2T', 
            oilType: '', 
            formats: [
                { size: '100x160 ml - 100x200 ml', image: 'img/Castrol Actevo Essential 2T - 100x160 ml - 100x200 ml.jpg' }
            ],
            description: 'Aceite para motores 2T, presentación económica.', 
            category: 'complementarios', 
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
    
    // Initialize carousels for products with multiple formats (lazy loading ya no es necesario)
    initializeProductCarousels();
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

// Create product card HTML with carousel support
function createProductCardHTML(product) {
    const oilTypeBadge = getOilTypeBadge(product.oilType);
    const isInComparison = comparisonList.find(p => p.id === product.id) !== undefined;
    
    // Handle multiple formats
    const hasMultipleFormats = product.formats && product.formats.length > 1;
    const currentFormat = product.formats ? product.formats[0] : { size: product.format || '', image: product.image || '' };
    
    // Create image carousel if multiple formats - CAMBIO A CARGA INMEDIATA
    let imageContent = '';
    if (hasMultipleFormats) {
        // Normalize image paths
        const fixedFormats = product.formats.map(format => ({
            ...format,
            image: normalizeImagePath(format.image)
        }));
        
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
                
                <!-- Format indicators -->
                <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                    ${fixedFormats.map((format, index) => `
                        <div class="format-indicator w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${index === 0 ? 'bg-white shadow-md' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}" 
                             data-format-index="${index}"
                             title="${format.size}"></div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        // Normalize single image path
        const fixedImagePath = normalizeImagePath(currentFormat.image);
        
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
    
    // Format display
    const formatDisplay = hasMultipleFormats 
        ? `<span class="text-sm font-semibold text-gray-500 format-display" data-product-id="${product.id}">${currentFormat.size}</span>`
        : `<span class="text-sm font-semibold text-gray-500">${currentFormat.size}</span>`;
    
    return `
        <div class="bg-white rounded-lg shadow-md card-hover overflow-hidden product-card ${currentView === 'list' ? 'flex' : ''}" 
             data-category="${product.category}" 
             data-product-id="${product.id}"
             data-has-carousel="${hasMultipleFormats}">
            <div class="relative ${currentView === 'list' ? 'w-48 flex-shrink-0' : ''}">
                <div class="product-image-container w-full ${currentView === 'list' ? 'h-full' : 'h-56'} flex items-center justify-center p-4 rounded-t-lg relative">
                    ${imageContent}
                </div>
                ${oilTypeBadge}
                <button class="absolute top-3 left-3 w-8 h-8 rounded-full ${isInComparison ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'} shadow-md hover:shadow-lg transition-all z-20" 
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
                    ${formatDisplay}
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
    const carousels = document.querySelectorAll('.product-image-carousel');
    
    carousels.forEach(carousel => {
        const productId = carousel.dataset.productId;
        const product = allProducts.find(p => p.id === productId);
        
        if (!product || !product.formats || product.formats.length <= 1) return;
        
        let currentIndex = 0;
        let carouselInterval;
        
        const images = carousel.querySelectorAll('.carousel-image');
        const indicators = carousel.querySelectorAll('.format-indicator');
        const formatDisplay = document.querySelector(`.format-display[data-product-id="${productId}"]`);
        
        function showFormat(index) {
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
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.classList.remove('bg-opacity-50');
                    indicator.classList.add('bg-white', 'shadow-md');
                } else {
                    indicator.classList.remove('shadow-md');
                    indicator.classList.add('bg-opacity-50');
                }
            });
            
            // Update format display
            if (formatDisplay) {
                formatDisplay.textContent = product.formats[index].size;
            }
            
            currentIndex = index;
        }
        
        function nextFormat() {
            const nextIndex = (currentIndex + 1) % product.formats.length;
            showFormat(nextIndex);
        }
        
        function startCarousel() {
            carouselInterval = setInterval(nextFormat, 4000); // Change every 4 seconds
        }
        
        function stopCarousel() {
            if (carouselInterval) {
                clearInterval(carouselInterval);
            }
        }
        
        // Add click handlers to indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
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
    
    // Initialize modal carousel if product has multiple formats
    if (product.formats && product.formats.length > 1) {
        initializeModalCarousel(product);
    }
    
    productModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
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
    
    // Create image content - with normalized image paths
    let imageContent = '';
    if (hasMultipleFormats) {
        // Normalize image paths
        const fixedFormats = product.formats.map(format => ({
            ...format,
            image: normalizeImagePath(format.image)
        }));
        
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
                
                <!-- Format indicators -->
                <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    ${fixedFormats.map((format, index) => `
                        <div class="modal-format-indicator px-2 py-1 rounded text-xs cursor-pointer transition-all duration-300 ${index === 0 ? 'bg-white text-black' : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'}" 
                             data-format-index="${index}"
                             title="${format.size}">${format.size}</div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        // Normalize single image path
        const fixedImagePath = normalizeImagePath(currentFormat.image);
        
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

// Initialize modal carousel for multiple formats
function initializeModalCarousel(product) {
    const carousel = document.querySelector('.modal-image-carousel');
    if (!carousel) return;
    
    let currentIndex = 0;
    const images = carousel.querySelectorAll('.modal-carousel-image');
    const indicators = carousel.querySelectorAll('.modal-format-indicator');
    const prevBtn = carousel.querySelector('.modal-carousel-prev');
    const nextBtn = carousel.querySelector('.modal-carousel-next');
    
    function showFormat(index) {
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
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.remove('bg-black', 'bg-opacity-50', 'text-white');
                indicator.classList.add('bg-white', 'text-black');
            } else {
                indicator.classList.remove('bg-white', 'text-black');
                indicator.classList.add('bg-black', 'bg-opacity-50', 'text-white');
            }
        });
        
        currentIndex = index;
    }
    
    function nextFormat() {
        const nextIndex = (currentIndex + 1) % product.formats.length;
        showFormat(nextIndex);
    }
    
    function prevFormat() {
        const prevIndex = (currentIndex - 1 + product.formats.length) % product.formats.length;
        showFormat(prevIndex);
    }
    
    // Add navigation event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextFormat);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevFormat);
    }
    
    // Add indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showFormat(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function modalKeyNav(e) {
        if (!productModal.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevFormat();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextFormat();
            }
        }
    });
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
                        ${comparisonList.map(product => {
                            // Get the first format image or fallback to product.image
                            const imagePath = product.formats ? product.formats[0].image : product.image;
                            const fixedImagePath = normalizeImagePath(imagePath);
                            
                            return `
                            <td class="border p-3 text-center">
                                <div class="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mx-auto p-2">
                                    <img src="${fixedImagePath}" alt="${product.name}" 
                                         class="max-w-full max-h-full object-contain rounded"
                                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                    <div class="text-center text-xs" style="display: none;">
                                        <i class="fas fa-image text-gray-400"></i>
                                    </div>
                                </div>
                            </td>
                        `}).join('')}
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
                        ${comparisonList.map(product => {
                            const format = product.formats ? product.formats[0].size : product.format;
                            return `<td class="border p-3 text-center">${format}</td>`;
                        }).join('')}
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

// Function to normalize image paths to match actual file names
function normalizeImagePath(imagePath) {
    // SOLUCION: Convertir todos los em dashes (—) a guiones normales (-) 
    // porque los archivos reales usan guiones normales
    return imagePath
        .replace(/—/g, '-')   // Convertir em dash (—) a guión normal (-)
        .replace(/\s+/g, ' ') // Normalizar múltiples espacios a uno solo
        .replace(/\s*-\s*/g, ' - ')  // Espaciado consistente alrededor del guión
        .trim();             // Remover espacios al inicio/final
}

// ✅ SOLUCIONADO: Ya no necesitamos imagePathFixes
// Todas las rutas de imágenes en el código ahora usan guiones normales (-) 
// como los archivos reales, por lo que coinciden perfectamente

// ✅ Ya no necesitamos función de test - problema resuelto

// Fix all product image paths
function fixProductImagePaths() {
    console.log('🔧 Normalizando rutas de imágenes...');
    
    Object.keys(products).forEach(category => {
        products[category].forEach(product => {
            if (product.formats) {
                product.formats.forEach(format => {
                    const originalPath = format.image;
                    format.image = normalizeImagePath(format.image);
                    if (originalPath !== format.image) {
                        console.log(`📝 Normalizado: ${originalPath} → ${format.image}`);
                    }
                });
            } else if (product.image) {
                const originalPath = product.image;
                product.image = normalizeImagePath(product.image);
                if (originalPath !== product.image) {
                    console.log(`📝 Normalizado: ${originalPath} → ${product.image}`);
                }
            }
        });
    });
}

// Run fixes on page load with diagnostic
document.addEventListener('DOMContentLoaded', function() {
    fixProductImagePaths();
    // Enable diagnostic temporarily to check improvements
    setTimeout(() => {
        checkMissingImages();
    }, 1000);
});