// Battery Data Object
const batteryData = [
    {
        id: 'lithium-ion',
        name: 'Lithium-Ion',
        icon: 'fas fa-battery-full',
        summary: 'High energy density, long cycle life',
        description: 'Lithium-ion batteries are the most common type used in modern electric vehicles. They offer excellent energy density and relatively long cycle life.',
        features: [
            'High energy density (150-250 Wh/kg)',
            'Long cycle life (1000-3000 cycles)',
            'Low self-discharge rate',
            'Wide operating temperature range',
            'Mature technology with established supply chain'
        ],
        advantages: 'High efficiency, lightweight, fast charging capability',
        disadvantages: 'Higher cost, thermal runaway risk, degradation over time',
        applications: 'Tesla Model S/3/X/Y, BMW i3, Nissan Leaf (newer models)'
    },
    {
        id: 'solid-state',
        name: 'Solid-State',
        icon: 'fas fa-microchip',
        summary: 'Emerging tech, safer, higher density',
        description: 'Solid-state batteries represent the next generation of EV battery technology, offering improved safety and potentially higher energy density.',
        features: [
            'Higher energy density potential (300-500 Wh/kg)',
            'Enhanced safety (no liquid electrolyte)',
            'Faster charging capabilities',
            'Longer lifespan potential',
            'Better performance in extreme temperatures'
        ],
        advantages: 'Superior safety, higher energy density, faster charging',
        disadvantages: 'Still in development, high manufacturing costs, limited availability',
        applications: 'Toyota (planned 2025), BMW (prototype phase), Samsung SDI development'
    },
    {
        id: 'nickel-metal',
        name: 'Nickel-Metal Hydride',
        icon: 'fas fa-battery-half',
        summary: 'Used in hybrids, durable',
        description: 'Nickel-Metal Hydride batteries are commonly used in hybrid vehicles and some early electric vehicles, known for their durability.',
        features: [
            'Moderate energy density (60-120 Wh/kg)',
            'Very long cycle life (>3000 cycles)',
            'Excellent temperature tolerance',
            'No memory effect',
            'Environmentally friendlier than older technologies'
        ],
        advantages: 'Very reliable, long-lasting, good temperature performance',
        disadvantages: 'Lower energy density, higher self-discharge rate',
        applications: 'Toyota Prius, Honda Insight, early Honda Civic Hybrid'
    },
    {
        id: 'lead-acid',
        name: 'Lead-Acid',
        icon: 'fas fa-battery-empty',
        summary: 'Low cost, bulky, older tech',
        description: 'Lead-acid batteries are the oldest rechargeable battery technology, still used in some low-speed electric vehicles and as auxiliary batteries.',
        features: [
            'Low energy density (30-50 Wh/kg)',
            'Very low cost',
            'Proven reliability',
            'Easy to recycle',
            'Mature manufacturing infrastructure'
        ],
        advantages: 'Very low cost, well-established recycling, reliable',
        disadvantages: 'Very heavy, low energy density, shorter lifespan',
        applications: 'Golf carts, low-speed EVs, auxiliary power in conventional vehicles'
    },
    {
        id: 'ultracapacitors',
        name: 'Ultracapacitors',
        icon: 'fas fa-bolt',
        summary: 'Very high power density, low energy',
        description: 'Ultracapacitors (supercapacitors) store energy electrostatically and can deliver very high power quickly, used in conjunction with batteries.',
        features: [
            'Extremely high power density',
            'Very fast charging/discharging',
            'Millions of charge cycles',
            'Wide operating temperature range',
            'No chemical degradation'
        ],
        advantages: 'Instant charging, extremely long life, high power output',
        disadvantages: 'Very low energy density, high cost per kWh',
        applications: 'Regenerative braking systems, power assistance in hybrid systems'
    },
    {
        id: 'lithium-iron',
        name: 'Lithium Iron Phosphate',
        icon: 'fas fa-shield-alt',
        summary: 'Thermal stability, safe chemistry',
        description: 'Lithium Iron Phosphate (LiFePO4) batteries offer excellent thermal stability and safety characteristics, making them popular for certain EV applications.',
        features: [
            'Excellent thermal stability',
            'Very safe chemistry',
            'Long cycle life (2000-5000 cycles)',
            'Good power characteristics',
            'Environmental friendliness'
        ],
        advantages: 'Outstanding safety, long life, stable performance',
        disadvantages: 'Lower energy density, higher cost than lead-acid',
        applications: 'BYD vehicles, some Tesla Model 3 variants, energy storage systems'
    }
];

// DOM Elements
let batteryCardsContainer;
let hamburger;
let navMenu;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    renderBatteryCards();
    setupEventListeners();
    setupSmoothScrolling();
});

// Initialize DOM elements
function initializeElements() {
    batteryCardsContainer = document.getElementById('batteryCards');
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu');
}

// Render battery cards dynamically
function renderBatteryCards() {
    if (!batteryCardsContainer) return;
    
    batteryCardsContainer.innerHTML = '';
    
    batteryData.forEach(battery => {
        const card = createBatteryCard(battery);
        batteryCardsContainer.appendChild(card);
    });
}

// Create individual battery card
function createBatteryCard(battery) {
    const card = document.createElement('div');
    card.className = `battery-card ${battery.id}`;
    card.setAttribute('data-battery', battery.id);
    
    card.innerHTML = `
        <div class="battery-card-header">
            <div class="battery-info">
                <i class="${battery.icon} battery-icon"></i>
                <h3 class="battery-title">${battery.name}</h3>
            </div>
            <button class="toggle-btn" aria-label="Toggle details">
                <i class="fas fa-chevron-down"></i>
            </button>
        </div>
        
        <p class="battery-summary">${battery.summary}</p>
        
        <div class="battery-details">
            <p><strong>Description:</strong> ${battery.description}</p>
            
            <div class="battery-specs">
                <h4>Key Features:</h4>
                <ul class="battery-features">
                    ${battery.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="battery-pros-cons">
                <p><strong>Advantages:</strong> ${battery.advantages}</p>
                <p><strong>Disadvantages:</strong> ${battery.disadvantages}</p>
                <p><strong>Applications:</strong> ${battery.applications}</p>
            </div>
        </div>
    `;
    
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Battery card toggle functionality
    document.addEventListener('click', handleCardToggle);
    
    // Explore button functionality
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('learn').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
    
    // Resource button functionality
    setupResourceButtons();
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
}

// Close mobile menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.transform = 'none';
        bar.style.opacity = '1';
    });
}

// Handle battery card toggle
function handleCardToggle(event) {
    const toggleBtn = event.target.closest('.toggle-btn');
    if (!toggleBtn) return;
    
    const card = toggleBtn.closest('.battery-card');
    const details = card.querySelector('.battery-details');
    const chevron = toggleBtn.querySelector('i');
    
    // Toggle active states
    details.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    
    // Animate chevron
    if (details.classList.contains('active')) {
        chevron.style.transform = 'rotate(180deg)';
    } else {
        chevron.style.transform = 'rotate(0deg)';
    }
    
    // Add visual feedback
    card.style.transform = details.classList.contains('active') ? 'scale(1.02)' : 'scale(1)';
    
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 200);
}

// Setup resource buttons
function setupResourceButtons() {
    const resourceBtns = document.querySelectorAll('.resource-btn');
    
    resourceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            resourceBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Add some visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Setup smooth scrolling for navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Search/Filter functionality (Optional Enhancement)
function filterBatteries(searchTerm) {
    const cards = document.querySelectorAll('.battery-card');
    
    cards.forEach(card => {
        const batteryName = card.querySelector('.battery-title').textContent.toLowerCase();
        const batterySummary = card.querySelector('.battery-summary').textContent.toLowerCase();
        
        if (batteryName.includes(searchTerm.toLowerCase()) || 
            batterySummary.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Sort batteries functionality (Optional Enhancement)
function sortBatteries(sortBy) {
    const container = document.getElementById('batteryCards');
    const cards = Array.from(container.children);
    
    cards.sort((a, b) => {
        const aTitle = a.querySelector('.battery-title').textContent;
        const bTitle = b.querySelector('.battery-title').textContent;
        
        if (sortBy === 'alphabetical') {
            return aTitle.localeCompare(bTitle);
        }
        // Add more sorting options as needed
        return 0;
    });
    
    // Re-append sorted cards
    cards.forEach(card => container.appendChild(card));
}

// Intersection Observer for animations (Optional Enhancement)
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe battery cards for scroll animations
    document.querySelectorAll('.battery-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize scroll animations after cards are rendered
function initializeScrollAnimations() {
    setTimeout(() => {
        setupScrollAnimations();
    }, 100);
}

// Enhanced initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    renderBatteryCards();
    setupEventListeners();
    setupSmoothScrolling();
    initializeScrollAnimations();
});

// Utility function to add CSS animations
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
            }
        }
        
        .battery-card:hover {
            animation: pulse 2s infinite;
        }
        
        .explore-btn:hover {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Call addCustomStyles after DOM is loaded
document.addEventListener('DOMContentLoaded', addCustomStyles);

// Export functions for potential external use
window.EVBatteryExplorer = {
    filterBatteries,
    sortBatteries,
    batteryData
};