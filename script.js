// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Product data
const products = {
    diesel: [
        // Full Sintético
        { id: 'd-s1', name: 'Castrol Vecton Long Drain E6/E9 10W-40', viscosity: '10W-40', oilType: 'Full Sintético', format: '5 gal / 208 L', description: 'Aceite sintético de larga duración para motores diésel Euro VI y anteriores.', category: 'diesel', image: 'img/Vecton LD CK-4.jpg', specs: { features: [] } },
        { id: 'd-s2', name: 'Castrol Vecton LD CK-4/E9 10W-30', viscosity: '10W-30', oilType: 'Full Sintético', format: '5 gal / 208 L', description: 'Aceite sintético para motores diésel modernos, máxima eficiencia y protección.', category: 'diesel', image: 'img/CastrolVectonLD.jpg', specs: { features: [] } },
        // Sintético
        { id: 'd-s3', name: 'Castrol Vecton CK-4/SN 15W-40', viscosity: '15W-40', oilType: 'Sintético', format: '5 gal / 208 L', description: 'Aceite sintético para motores diésel de alto desempeño y protección avanzada.', category: 'diesel', image: 'img/Vecton CK-4.jpg', specs: { features: [] } },
        // Semi-sintético
        { id: 'd-ss1', name: 'Castrol CRB Multi CK-4 15W-40', viscosity: '15W-40', oilType: 'Semi-sintético', format: '18.9 L / 5 gal', description: 'Aceite semi-sintético para motores diésel, excelente limpieza y protección.', category: 'diesel', image: 'img/CRB Multi CK-4.jpg', specs: { features: [] } },
        // Mineral
        { id: 'd-m1', name: 'Castrol CRB Turbomax CI-4/SL/E7 15W-40', viscosity: '15W-40', oilType: 'Mineral', format: '18.9 L / 5 gal', description: 'Aceite mineral para motores diésel, protección robusta y confiable.', category: 'diesel', image: 'img/CRB Tmax CI-4-SL-E7 .jpg', specs: { features: [] } },
        { id: 'd-m2', name: 'Castrol CRB Viscus 25W-60', viscosity: '25W-60', oilType: 'Mineral', format: 'galón / 946 ml', description: 'Aceite mineral de alta viscosidad para motores diésel exigentes.', category: 'diesel', image: 'img/CRB Viscus 25W-60.jpg', specs: { features: [] } },
        { id: 'd-m3', name: 'Castrol CRB Monograde SAE 40 / 50', viscosity: 'SAE 40 / 50', oilType: 'Mineral', format: '5 gal / 208 L', description: 'Aceite monogrado mineral para motores diésel convencionales.', category: 'diesel', image: 'img/CRB Monograde SAE 40 - 50.jpg', specs: { features: [] } },
        { id: 'd-m4', name: 'Castrol HD Motor Oil SAE 40 / 50', viscosity: 'SAE 40 / 50', oilType: 'Mineral', format: '12x946 ml', description: 'Aceite mineral para motores diésel, protección básica y económica.', category: 'diesel', image: 'img/HD Motor Oil SAE 40 - 50.jpg', specs: { features: [] } }
    ],
    gasolina: [
        // Full Sintético
        { id: 'g-s1', name: 'Castrol EDGE Professional V 0W-20', viscosity: '0W-20', oilType: 'Full Sintético', format: '6x946 ml', description: 'Aceite sintético premium para motores gasolina modernos.', category: 'gasolina', image: 'img/EDGE Prof V 0W-20.jpg', specs: { features: [] } },
        { id: 'g-s2', name: 'Castrol EDGE Professional EC 0W-20', viscosity: '0W-20', oilType: 'Full Sintético', format: '6x946 ml', description: 'Aceite sintético para máxima eficiencia y protección.', category: 'gasolina', image: 'img/EDGE Professional EC 0W-20.jpg', specs: { features: [] } },
        { id: 'g-s3', name: 'Castrol EDGE 0W-30 HC1', viscosity: '0W-30', oilType: 'Full Sintético', format: '12x1 L', description: 'Aceite sintético para motores de alto rendimiento.', category: 'gasolina', image: 'img/EDGE 0W-30 HC1.jpg', specs: { features: [] } },
        { id: 'g-s4', name: 'Castrol EDGE US Dexos 5W-30', viscosity: '5W-30', oilType: 'Full Sintético', format: '6x946 ml / 5 qt', description: 'Aceite sintético Dexos para motores gasolina.', category: 'gasolina', image: 'img/EDGE US Dexos 5W-30.jpg', specs: { features: [] } },
        { id: 'g-s5', name: 'Castrol EDGE K 5W-30', viscosity: '5W-30', oilType: 'Full Sintético', format: '5 qt', description: 'Aceite sintético para motores de última generación.', category: 'gasolina', image: 'img/EDGE K 5W-30.jpg', specs: { features: [] } },
        { id: 'g-s6', name: 'Castrol EDGE A3/B4 5W-40', viscosity: '5W-40', oilType: 'Full Sintético', format: '6x946 ml', description: 'Aceite sintético para motores de alto desempeño.', category: 'gasolina', image: 'img/EDGE A3-B4 5W-40.jpg', specs: { features: [] } },
        { id: 'g-s7', name: 'Castrol EDGE Turbo Diesel 5W-40', viscosity: '5W-40', oilType: 'Full Sintético', format: '12x1 L / 4x4 L', description: 'Aceite sintético para motores turbo gasolina y diésel.', category: 'gasolina', image: 'img/EDGE Turbo Diesel 5W-40.jpg', specs: { features: [] } },
        // Semi-sintético
        { id: 'g-ss1', name: 'Castrol MAGNATEC C3 5W-30', viscosity: '5W-30', oilType: 'Semi-sintético', format: '12x1 L / 4x4 L', description: 'Aceite semi-sintético con moléculas inteligentes para protección continua.', category: 'gasolina', image: 'img/MAGNATEC C3 5W-30.jpg', specs: { features: [] } },
        { id: 'g-ss2', name: 'Castrol MAGNATEC 508 88 5W-40', viscosity: '5W-40', oilType: 'Semi-sintético', format: '12x1 L', description: 'Aceite semi-sintético para motores europeos.', category: 'gasolina', image: 'img/MAGNATEC 508 88 5W-40.jpg', specs: { features: [] } },
        { id: 'g-ss3', name: 'Castrol MAGNATEC 10W-30', viscosity: '10W-30', oilType: 'Semi-sintético', format: '6x946 ml / 3.78 L', description: 'Aceite semi-sintético para motores gasolina.', category: 'gasolina', image: 'img/MAGNATEC 10W-30.jpg', specs: { features: [] } },
        { id: 'g-ss4', name: 'Castrol MAGNATEC 10W-40', viscosity: '10W-40', oilType: 'Semi-sintético', format: '6x946 ml / 3.78 L', description: 'Aceite semi-sintético para motores gasolina.', category: 'gasolina', image: 'img/MAGNATEC 10W-40.jpg', specs: { features: [] } },
        { id: 'g-ss5', name: 'Castrol MAGNATEC 20W-50', viscosity: '20W-50', oilType: 'Semi-sintético', format: '6x946 ml / 3.78 L', description: 'Aceite semi-sintético para motores gasolina de alto kilometraje.', category: 'gasolina', image: 'img/MAGNATEC 20W-50.jpg', specs: { features: [] } },
        // Mineral
        { id: 'g-m1', name: 'Castrol GTX 5W-30', viscosity: '5W-30', oilType: 'Mineral', format: '6x946 ml / 3x4 L', description: 'Aceite mineral para motores gasolina, protección confiable.', category: 'gasolina', image: 'img/GTX 5W-30.jpg', specs: { features: [] } },
        { id: 'g-m2', name: 'Castrol GTX 10W-30', viscosity: '10W-30', oilType: 'Mineral', format: '12x1 qt / 3.78 L', description: 'Aceite mineral para motores gasolina.', category: 'gasolina', image: 'img/GTX 10W-30.jpg', specs: { features: [] } },
        { id: 'g-m3', name: 'Castrol GTX 10W-40', viscosity: '10W-40', oilType: 'Mineral', format: '3.78 L', description: 'Aceite mineral para motores gasolina.', category: 'gasolina', image: 'img/GTX 10W-40.jpg', specs: { features: [] } },
        { id: 'g-m4', name: 'Castrol GTX 20W-50', viscosity: '20W-50', oilType: 'Mineral', format: '12x946 ml / 5x3.78 L', description: 'Aceite mineral para motores gasolina de alto kilometraje.', category: 'gasolina', image: 'img/GTX 20W-50.jpg', specs: { features: [] } },
        { id: 'g-m5', name: 'Castrol GTX Gas 20W-50', viscosity: '20W-50', oilType: 'Mineral', format: '12x946 ml / 3.78 L', description: 'Aceite mineral para motores a gas.', category: 'gasolina', image: 'img/GTX Gas 20W-50.jpg', specs: { features: [] } },
        { id: 'g-m6', name: 'Castrol GTX Alto Kilometraje 25W-60', viscosity: '25W-60', oilType: 'Mineral', format: '3.78 L', description: 'Aceite mineral para motores de alto kilometraje.', category: 'gasolina', image: 'img/GTX Alto KM 25W-60.jpg', specs: { features: [] } }
    ],
    motos: [
        // Full Sintético
        { id: 'm-s1', name: 'Castrol POWER 1 Ultimate 4T 10W-40', viscosity: '10W-40', oilType: 'Full Sintético', format: '12x1 L', description: 'Aceite sintético para motos de alto rendimiento.', category: 'motos', image: 'img/POWER 1 Ultimate 4T 10W-40-4L.jpg', specs: { features: [] } },
        { id: 'm-s2', name: 'Castrol POWER 1 4T 15W-50', viscosity: '15W-50', oilType: 'Full Sintético', format: '12x1 L', description: 'Aceite sintético para motos deportivas.', category: 'motos', image: 'img/POWER 1 4T 15W-50.jpg', specs: { features: [] } },
        // Semi-sintético
        { id: 'm-ss1', name: 'Castrol Actevo St-St 4T 10W-30', viscosity: '10W-30', oilType: 'Semi-sintético', format: '6x1 L', description: 'Aceite semi-sintético para motos 4T.', category: 'motos', image: 'img/Actevo St-St 4T 10W-30.jpg', specs: { features: [] } },
        { id: 'm-ss2', name: 'Castrol Actevo St-St 4T 10W-40', viscosity: '10W-40', oilType: 'Semi-sintético', format: '6x1 L', description: 'Aceite semi-sintético para motos 4T.', category: 'motos', image: 'img/Actevo St-St 4T 10W-40.jpg', specs: { features: [] } },
        { id: 'm-ss3', name: 'Castrol Actevo St-St 4T 15W-50', viscosity: '15W-50', oilType: 'Semi-sintético', format: '12x1 L', description: 'Aceite semi-sintético para motos 4T.', category: 'motos', image: 'img/Actevo St-St 4T 15W-50.jpg', specs: { features: [] } },
        // Mineral
        { id: 'm-m1', name: 'Castrol POWER 1 V-Twin 4T 20W-50', viscosity: '20W-50', oilType: 'Mineral', format: '6x1 qt', description: 'Aceite mineral para motos V-Twin.', category: 'motos', image: 'img/POWER 1 V-Twin 4T 20W-50.jpg', specs: { features: [] } },
        { id: 'm-m2', name: 'Castrol Actevo 4T 20W-50', viscosity: '20W-50', oilType: 'Mineral', format: '6x1 L', description: 'Aceite mineral para motos 4T.', category: 'motos', image: 'img/Actevo Essential 4T 20W-50.jpg', specs: { features: [] } },
        { id: 'm-m3', name: 'Castrol Actevo Essential 4T 25W-60', viscosity: '25W-60', oilType: 'Mineral', format: '6x946 ml', description: 'Aceite mineral para motos 4T, protección extra.', category: 'motos', image: 'img/Actevo Essential 4T 25W-60.jpg', specs: { features: [] } },
        { id: 'm-m4', name: 'Castrol Actevo Essential 4T 20W-50', viscosity: '20W-50', oilType: 'Mineral', format: '6x946 ml', description: 'Aceite mineral para motos 4T.', category: 'motos', image: 'img/Actevo Essential 4T 20W-50.jpg', specs: { features: [] } }
    ],
    transmisiones: [
        // Sintético
        { id: 't-s1', name: 'Castrol TRANSMAX Universal LL 75W-90', viscosity: '75W-90', oilType: 'Sintético', format: '18.9 L', description: 'Aceite sintético para transmisiones universales.', category: 'transmisiones', image: 'img/TRANSMAX Universal LL 75W-90.jpg', specs: { features: [] } },
        // Mineral
        { id: 't-m1', name: 'Castrol TRANSMAX CVT', viscosity: 'CVT', oilType: 'Mineral', format: '18.9 L', description: 'Aceite mineral para transmisiones CVT.', category: 'transmisiones', image: 'img/TRANSMAX CVT.jpg', specs: { features: [] } },
        { id: 't-m2', name: 'Castrol TRANSMAX ATF DX III', viscosity: 'ATF DX III', oilType: 'Mineral', format: '18.9 L', description: 'Aceite mineral para transmisiones automáticas.', category: 'transmisiones', image: 'img/TRANSMAX ATF DX III.jpg', specs: { features: [] } },
        { id: 't-m3', name: 'Castrol TRANSMAX Mercon V / Dexron III', viscosity: 'Mercon V / Dexron III', oilType: 'Mineral', format: '18.9 L', description: 'Aceite mineral para transmisiones automáticas.', category: 'transmisiones', image: 'img/TRANSMAX Mercon V.jpg', specs: { features: [] } },
        { id: 't-m4', name: 'Castrol TRANSMAX Dex/Merc', viscosity: 'Dex/Merc', oilType: 'Mineral', format: '18.9 L', description: 'Aceite mineral para transmisiones automáticas.', category: 'transmisiones', image: 'img/TRANSMAX Dex-Merc.jpg', specs: { features: [] } },
        { id: 't-m5', name: 'Castrol AXLE Limited Slip 80W-90', viscosity: '80W-90', oilType: 'Mineral', format: '18.9 L', description: 'Aceite mineral para diferenciales Limited Slip.', category: 'transmisiones', image: 'img/AXLE Limited Slip 80W-90.jpg', specs: { features: [] } },
        { id: 't-m6', name: 'Castrol AXLE GL-5 85W-140', viscosity: '85W-140', oilType: 'Mineral', format: '18.9 L', description: 'Aceite mineral para diferenciales GL-5.', category: 'transmisiones', image: 'img/AXLE GL-5 85W-140.jpg', specs: { features: [] } },
        { id: 't-m7', name: 'Castrol TRANS C 10W / 30', viscosity: '10W / 30', oilType: 'Mineral', format: '5 gal', description: 'Aceite mineral para transmisiones y convertidores.', category: 'transmisiones', image: 'img/TRANS C 10W - 30.jpg', specs: { features: [] } }
    ],
    complementarios: [
        { id: 'c1', name: 'Castrol Hyspin AWS 68', viscosity: '68', oilType: '', format: '5 gal', description: 'Aceite hidráulico para sistemas industriales.', category: 'complementarios', image: 'img/Hyspin AWS 68.jpg', specs: { features: [] } },
        { id: 'c2', name: 'Castrol Hyspin AWS 46', viscosity: '46', oilType: '', format: '5 gal', description: 'Aceite hidráulico para sistemas industriales.', category: 'complementarios', image: 'img/Hyspin AWS 46.jpg', specs: { features: [] } },
        { id: 'c3', name: 'Castrol Universal Tractor Fluid (UTF)', viscosity: '', oilType: '', format: '5 gal', description: 'Fluido universal para tractores y maquinaria agrícola.', category: 'complementarios', image: 'img/Universal Tractor Fluid (UTF).jpg', specs: { features: [] } },
        { id: 'c4', name: 'Castrol Actevo Essential 2T', viscosity: '2T', oilType: '', format: '100x160 ml / 100x200 ml', description: 'Aceite para motores 2T, presentación económica.', category: 'complementarios', image: 'img/Actevo Essential 2T.jpg', specs: { features: [] } }
    ]
};

// DOM elements
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const productModal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Initialize the catalog
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
});

// Hide loading screen when page is fully loaded
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
});

// Load products into the catalog
function loadProducts() {
    Object.keys(products).forEach(category => {
        const container = document.getElementById(`${category}-products`);
        if (container) {
            container.innerHTML = '';
            products[category].forEach(product => {
                container.appendChild(createProductCard(product));
            });
        }
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md card-hover overflow-hidden';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-search', `${product.name} ${product.viscosity} ${product.description}`.toLowerCase());
    
    // Check if image is a file path or icon class
    const isImageFile = product.image.startsWith('img/');
    const imageContent = isImageFile 
        ? `<img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover rounded-lg">`
        : `<i class="${product.image} text-white text-xl"></i>`;
    
    card.innerHTML = `
        <div class="p-6">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-castrol-green rounded-lg flex items-center justify-center overflow-hidden">
                    ${imageContent}
                </div>
                <span class="text-sm font-semibold text-gray-500">${product.format}</span>
            </div>
            
            <h4 class="text-lg font-bold castrol-green-text mb-2">${product.name}</h4>
            <p class="text-sm text-gray-600 mb-1">Viscosidad: <span class="font-semibold">${product.viscosity}</span></p>
            <p class="text-sm text-gray-600 mb-1">${product.oilType ? `Tipo: <span class='font-semibold'>${product.oilType}</span>` : ''}</p>
            <p class="text-gray-700 text-sm mb-4">${product.description}</p>
            
            <button class="w-full bg-[#007C41] text-white py-2 px-4 rounded-lg font-medium shadow-md transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 hover:shadow-xl hover:-translate-y-1 transform duration-200" 
                    onclick="openProductModal('${product.id}')">
                Ver más detalles
            </button>
        </div>
    `;
    
    return card;
}

// Open product modal
function openProductModal(productId) {
    const product = findProductById(productId);
    if (!product) return;
    
    modalTitle.textContent = product.name;
    modalContent.innerHTML = createModalContent(product);
    productModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Create modal content
function createModalContent(product) {
    const specs = product.specs;
    let specsHtml = '';
    
    if (specs.api) specsHtml += `<p><strong>API:</strong> ${specs.api}</p>`;
    if (specs.acea) specsHtml += `<p><strong>ACEA:</strong> ${specs.acea}</p>`;
    if (specs.jaso) specsHtml += `<p><strong>JASO:</strong> ${specs.jaso}</p>`;
    if (specs.dot) specsHtml += `<p><strong>DOT:</strong> ${specs.dot}</p>`;
    if (specs.type) specsHtml += `<p><strong>Tipo:</strong> ${specs.type}</p>`;
    
    // Check if image is a file path or icon class
    const isImageFile = product.image.startsWith('img/');
    const imageContent = isImageFile 
        ? `<img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover rounded-lg">`
        : `<i class="${product.image} text-white text-2xl"></i>`;
    
    return `
        <div class="space-y-6">
            <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-castrol-green rounded-lg flex items-center justify-center overflow-hidden">
                    ${imageContent}
                </div>
                <div>
                    <p class="text-lg font-semibold">Viscosidad: ${product.viscosity}</p>
                    <p class="text-gray-600">Formato: ${product.format}</p>
                </div>
            </div>
            
            <div>
                <h4 class="font-semibold mb-2">Descripción</h4>
                <p class="text-gray-700">${product.description}</p>
            </div>
            
            <div>
                <h4 class="font-semibold mb-2">Especificaciones</h4>
                <div class="space-y-1 text-sm">
                    ${specsHtml}
                </div>
            </div>
            
            <div>
                <h4 class="font-semibold mb-2">Características principales</h4>
                <ul class="list-disc list-inside space-y-1 text-sm text-gray-700">
                    ${specs.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="flex space-x-4 pt-4">
                <a href="https://wa.me/51999999999?text=Hola,%20me%20interesa%20el%20producto%20${encodeURIComponent(product.name)}" 
                   target="_blank"
                   class="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors text-center font-medium">
                    <i class="fab fa-whatsapp mr-2"></i>
                    Consultar por WhatsApp
                </a>
                <button onclick="closeProductModal()" 
                        class="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium">
                    Cerrar
                </button>
            </div>
        </div>
    `;
}

// Find product by ID
function findProductById(productId) {
    for (const category in products) {
        const product = products[category].find(p => p.id === productId);
        if (product) return product;
    }
    return null;
}

// Close product modal
function closeProductModal() {
    productModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', function() {
        filterProducts();
        // Scroll automático a la sección correspondiente
        const selectedCategory = categoryFilter.value;
        if (selectedCategory) {
            const section = document.querySelector(`h3[data-category-section='${selectedCategory}']`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
    
    // Modal functionality
    closeModal.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', function(e) {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
    
    // Mobile menu
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
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
            }
        });
    });
}

// Filter products based on search and category
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    document.querySelectorAll('[data-category]').forEach(card => {
        const category = card.getAttribute('data-category');
        const searchData = card.getAttribute('data-search');
        const matchesSearch = searchTerm === '' || searchData.includes(searchTerm);
        const matchesCategory = selectedCategory === '' || category === selectedCategory;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Make openProductModal and closeProductModal globally available
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal; 