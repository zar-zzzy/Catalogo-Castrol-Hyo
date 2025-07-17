// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Product data
const products = {
    diesel: [
        // Sintético
        { id: 'd-s1', name: 'Vecton CK-4/SN 15W-40', viscosity: '15W-40', oilType: 'Sintético', format: '5 gal / 18.9 L', description: 'Aceite sintético para motores diésel de alto desempeño y protección avanzada.', category: 'diesel', image: 'fas fa-truck', specs: { features: [] } },
        { id: 'd-s2', name: 'Vecton LongDrain E6/E9 10W-40', viscosity: '10W-40', oilType: 'Sintético', format: '5 gal / 208 L', description: 'Aceite sintético de larga duración para motores diésel Euro VI y anteriores.', category: 'diesel', image: 'fas fa-truck', specs: { features: [] } },
        { id: 'd-s3', name: 'Vecton LD CK-4/E9 10W-30', viscosity: '10W-30', oilType: 'Sintético', format: '5 gal / 208 L', description: 'Aceite sintético para motores diésel modernos, máxima eficiencia y protección.', category: 'diesel', image: 'fas fa-truck', specs: { features: [] } },
        // Semi-sintético
        { id: 'd-ss1', name: 'CRB Multi CK-4 15W-40', viscosity: '15W-40', oilType: 'Semi-sintético', format: '18.9 L / 5 gal', description: 'Aceite semi-sintético para motores diésel, excelente limpieza y protección.', category: 'diesel', image: 'fas fa-truck', specs: { features: [] } },
        // Mineral
        { id: 'd-m1', name: 'CRB Tmax CI-4/SL/E7 15W-40', viscosity: '15W-40', oilType: 'Mineral', format: '18.9 L / 5 gal', description: 'Aceite mineral para motores diésel, protección robusta y confiable.', category: 'diesel', image: 'fas fa-truck', specs: { features: [] } },
        { id: 'd-m2', name: 'CRB Viscus 25W-60', viscosity: '25W-60', oilType: 'Mineral', format: 'galón / 946 ml', description: 'Aceite mineral de alta viscosidad para motores diésel exigentes.', category: 'diesel', image: 'fas fa-truck', specs: { features: [] } },
        { id: 'd-m3', name: 'CRB Monograde SAE 40 / 50', viscosity: 'SAE 40 / 50', oilType: 'Mineral', format: '5 gal / 208 L', description: 'Aceite monogrado mineral para motores diésel convencionales.', category: 'diesel', image: 'fas fa-truck', specs: { features: [] } },
        { id: 'd-m4', name: 'HD Motor Oil SAE 40 / 50', viscosity: 'SAE 40 / 50', oilType: 'Mineral', format: '12x946 ml', description: 'Aceite mineral para motores diésel, protección básica y económica.', category: 'diesel', image: 'fas fa-truck', specs: { features: [] } }
    ],
    gasolina: [
        // Sintético
        { id: 'g-s1', name: 'EDGE Prof V 0W-20', viscosity: '0W-20', oilType: 'Sintético', format: '6x946 ml', description: 'Aceite sintético premium para motores gasolina modernos.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-s2', name: 'EDGE Professional EC 0W-20', viscosity: '0W-20', oilType: 'Sintético', format: '6x946 ml', description: 'Aceite sintético para máxima eficiencia y protección.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-s3', name: 'EDGE 0W-30 HC1', viscosity: '0W-30', oilType: 'Sintético', format: '12x1 L', description: 'Aceite sintético para motores de alto rendimiento.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-s4', name: 'EDGE US Dexos 5W-30', viscosity: '5W-30', oilType: 'Sintético', format: '6x946 ml / 5qt', description: 'Aceite sintético Dexos para motores gasolina.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-s5', name: 'EDGE K 5W-30', viscosity: '5W-30', oilType: 'Sintético', format: '5qt', description: 'Aceite sintético para motores de última generación.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-s6', name: 'EDGE A3/B4 5W-40', viscosity: '5W-40', oilType: 'Sintético', format: '6x946 ml', description: 'Aceite sintético para motores de alto desempeño.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-s7', name: 'EDGE Turbo Diesel 5W-40', viscosity: '5W-40', oilType: 'Sintético', format: '12x1 L / 4x4 L', description: 'Aceite sintético para motores turbo gasolina y diésel.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        // Semi-sintético
        { id: 'g-ss1', name: 'MAGNATEC C3 5W-30', viscosity: '5W-30', oilType: 'Semi-sintético', format: '12x1 L / 4x4 L', description: 'Aceite semi-sintético con moléculas inteligentes para protección continua.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-ss2', name: 'MAGNATEC 508 88 5W-40', viscosity: '5W-40', oilType: 'Semi-sintético', format: '12x1 L', description: 'Aceite semi-sintético para motores europeos.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-ss3', name: 'MAGNATEC 10W-30', viscosity: '10W-30', oilType: 'Semi-sintético', format: '6x946 ml / 3.78 L', description: 'Aceite semi-sintético para motores gasolina.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-ss4', name: 'MAGNATEC 10W-40', viscosity: '10W-40', oilType: 'Semi-sintético', format: '6x946 ml / 3.78 L', description: 'Aceite semi-sintético para motores gasolina.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-ss5', name: 'MAGNATEC 20W-50', viscosity: '20W-50', oilType: 'Semi-sintético', format: '6x946 ml / 3.78 L', description: 'Aceite semi-sintético para motores gasolina de alto kilometraje.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        // Mineral
        { id: 'g-m1', name: 'GTX 5W-30', viscosity: '5W-30', oilType: 'Mineral', format: '6x946 ml / 3x4 L', description: 'Aceite mineral para motores gasolina, protección confiable.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-m2', name: 'GTX 10W-30', viscosity: '10W-30', oilType: 'Mineral', format: '12x1qt / 3.78 L', description: 'Aceite mineral para motores gasolina.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-m3', name: 'GTX 10W-40', viscosity: '10W-40', oilType: 'Mineral', format: '3.78 L', description: 'Aceite mineral para motores gasolina.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-m4', name: 'GTX 20W-50', viscosity: '20W-50', oilType: 'Mineral', format: '12x946 ml / 5x3.78 L', description: 'Aceite mineral para motores gasolina de alto kilometraje.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-m5', name: 'GTX Gas 20W-50', viscosity: '20W-50', oilType: 'Mineral', format: '12x946 ml / 3.78 L', description: 'Aceite mineral para motores a gas.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } },
        { id: 'g-m6', name: 'GTX Alto KM 25W-60', viscosity: '25W-60', oilType: 'Mineral', format: '3.78 L', description: 'Aceite mineral para motores de alto kilometraje.', category: 'gasolina', image: 'fas fa-car', specs: { features: [] } }
    ],
    motos: [
        // Sintético
        { id: 'm-s1', name: 'POWER 1 Ultimate 4T 10W-40', viscosity: '10W-40', oilType: 'Sintético', format: '12x1 L', description: 'Aceite sintético para motos de alto rendimiento.', category: 'motos', image: 'fas fa-motorcycle', specs: { features: [] } },
        { id: 'm-s2', name: 'POWER 1 4T 15W-50', viscosity: '15W-50', oilType: 'Sintético', format: '12x1 L', description: 'Aceite sintético para motos deportivas.', category: 'motos', image: 'fas fa-motorcycle', specs: { features: [] } },
        // Semi-sintético
        { id: 'm-ss1', name: 'Actevo St-St 4T 10W-30', viscosity: '10W-30', oilType: 'Semi-sintético', format: '6x1 L', description: 'Aceite semi-sintético para motos 4T.', category: 'motos', image: 'fas fa-motorcycle', specs: { features: [] } },
        { id: 'm-ss2', name: 'Actevo St-St 4T 10W-40', viscosity: '10W-40', oilType: 'Semi-sintético', format: '6x1 L', description: 'Aceite semi-sintético para motos 4T.', category: 'motos', image: 'fas fa-motorcycle', specs: { features: [] } },
        { id: 'm-ss3', name: 'Actevo St-St 4T 15W-50', viscosity: '15W-50', oilType: 'Semi-sintético', format: '12x1 L', description: 'Aceite semi-sintético para motos 4T.', category: 'motos', image: 'fas fa-motorcycle', specs: { features: [] } },
        // Mineral
        { id: 'm-m1', name: 'POWER 1 V-Twin 4T 20W-50', viscosity: '20W-50', oilType: 'Mineral', format: '6x1qt', description: 'Aceite mineral para motos V-Twin.', category: 'motos', image: 'fas fa-motorcycle', specs: { features: [] } },
        { id: 'm-m2', name: 'Actevo 4T 20W-50', viscosity: '20W-50', oilType: 'Mineral', format: '6x1 L', description: 'Aceite mineral para motos 4T.', category: 'motos', image: 'fas fa-motorcycle', specs: { features: [] } },
        { id: 'm-m3', name: 'Actevo Essential 4T 25W-60', viscosity: '25W-60', oilType: 'Mineral', format: '6x946 ml', description: 'Aceite mineral para motos 4T, protección extra.', category: 'motos', image: 'fas fa-motorcycle', specs: { features: [] } },
        { id: 'm-m4', name: 'Actevo Essential 4T 20W-50', viscosity: '20W-50', oilType: 'Mineral', format: '6x946 ml', description: 'Aceite mineral para motos 4T.', category: 'motos', image: 'fas fa-motorcycle', specs: { features: [] } }
    ],
    transmisiones: [
        // Sintético
        { id: 't-s1', name: 'TRANSMAX Universal LL 75W-90', viscosity: '75W-90', oilType: 'Sintético', format: '18.9 L', description: 'Aceite sintético para transmisiones universales.', category: 'transmisiones', image: 'fas fa-cogs', specs: { features: [] } },
        // Mineral
        { id: 't-m1', name: 'TRANSMAX CVT', viscosity: 'CVT', oilType: 'Mineral', format: '', description: 'Aceite mineral para transmisiones CVT.', category: 'transmisiones', image: 'fas fa-cogs', specs: { features: [] } },
        { id: 't-m2', name: 'TRANSMAX ATF DX III', viscosity: 'ATF DX III', oilType: 'Mineral', format: '', description: 'Aceite mineral para transmisiones automáticas.', category: 'transmisiones', image: 'fas fa-cogs', specs: { features: [] } },
        { id: 't-m3', name: 'TRANSMAX Mercon V / Dexron III', viscosity: 'Mercon V / Dexron III', oilType: 'Mineral', format: '', description: 'Aceite mineral para transmisiones automáticas.', category: 'transmisiones', image: 'fas fa-cogs', specs: { features: [] } },
        { id: 't-m4', name: 'TRANSMAX Dex/Merc', viscosity: 'Dex/Merc', oilType: 'Mineral', format: '', description: 'Aceite mineral para transmisiones automáticas.', category: 'transmisiones', image: 'fas fa-cogs', specs: { features: [] } },
        { id: 't-m5', name: 'AXLE Limited Slip 80W-90', viscosity: '80W-90', oilType: 'Mineral', format: '', description: 'Aceite mineral para diferenciales Limited Slip.', category: 'transmisiones', image: 'fas fa-cogs', specs: { features: [] } },
        { id: 't-m6', name: 'AXLE GL-5 85W-140', viscosity: '85W-140', oilType: 'Mineral', format: '', description: 'Aceite mineral para diferenciales GL-5.', category: 'transmisiones', image: 'fas fa-cogs', specs: { features: [] } },
        { id: 't-m7', name: 'TRANS C 10W / 30', viscosity: '10W / 30', oilType: 'Mineral', format: '5 gal', description: 'Aceite mineral para transmisiones y convertidores.', category: 'transmisiones', image: 'fas fa-cogs', specs: { features: [] } }
    ],
    complementarios: [
        { id: 'c1', name: 'Hyspin AWS 68', viscosity: '68', oilType: '', format: '5 gal', description: 'Aceite hidráulico para sistemas industriales.', category: 'complementarios', image: 'fas fa-tools', specs: { features: [] } },
        { id: 'c2', name: 'Hyspin AWS 46', viscosity: '46', oilType: '', format: '5 gal', description: 'Aceite hidráulico para sistemas industriales.', category: 'complementarios', image: 'fas fa-tools', specs: { features: [] } },
        { id: 'c3', name: 'Universal Tractor Fluid (UTF)', viscosity: '', oilType: '', format: '5 gal', description: 'Fluido universal para tractores y maquinaria agrícola.', category: 'complementarios', image: 'fas fa-tools', specs: { features: [] } },
        { id: 'c4', name: 'Actevo Essential 2T 100x160ml', viscosity: '2T', oilType: '', format: '100x160ml', description: 'Aceite para motores 2T, presentación económica.', category: 'complementarios', image: 'fas fa-tools', specs: { features: [] } },
        { id: 'c5', name: 'Actevo Essential 2T 100x200ml', viscosity: '2T', oilType: '', format: '100x200ml', description: 'Aceite para motores 2T, presentación económica.', category: 'complementarios', image: 'fas fa-tools', specs: { features: [] } }
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
    
    card.innerHTML = `
        <div class="p-6">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-castrol-green rounded-lg flex items-center justify-center">
                    <i class="${product.image} text-white text-xl"></i>
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
    
    return `
        <div class="space-y-6">
            <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-castrol-green rounded-lg flex items-center justify-center">
                    <i class="${product.image} text-white text-2xl"></i>
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