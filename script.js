

// Hero Image Carousel Data
const heroImages = [
 {
url: 'image1.png',
label: 'Modern Electric Vehicle',
alt: 'Tesla Model 3 charging'
 },
 {
url: 'image3.png',
label: 'EV Battery Technology',
alt: 'Electric vehicle battery pack'
 },
 {
url: 'image3.png',
label: 'Charging Infrastructure',
alt: 'EV charging station'
 },
 {
url: 'image4.png',
label: 'Sustainable Transport',
alt: 'Electric cars on the road'
 },
 {
url: 'image5.png',
label: 'Future of Mobility',
alt: 'Advanced electric vehicle'
 }
];

let currentSlide = 0;

// Function to load images into carousel
function loadHeroImages() {
    const carousel = document.getElementById('imageCarousel');
    const carouselNav = document.getElementById('carouselNav');
    const imageLabel = document.getElementById('imageLabel');
    
    // Clear existing content
    carousel.innerHTML = '';
    carouselNav.innerHTML = '';
    
    heroImages.forEach((image, index) => {
        // Create image element
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.alt;
        img.classList.add('carousel-image');
        if (index === 0) {
            img.classList.add('active');
            imageLabel.textContent = image.label;
        }
        
        carousel.appendChild(img);
        
        // Create navigation dot
        const dot = document.createElement('button');
        dot.classList.add('nav-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        
        carouselNav.appendChild(dot);
    });
}

// Function to go to specific slide
function goToSlide(slideIndex) {
    const images = document.querySelectorAll('.carousel-image');
    const dots = document.querySelectorAll('.nav-dot');
    const imageLabel = document.getElementById('imageLabel');
    const progressBar = document.getElementById('progressBar');
    
    // Remove active class from current slide
    if (images[currentSlide]) {
        images[currentSlide].classList.remove('active');
    }
    if (dots[currentSlide]) {
        dots[currentSlide].classList.remove('active');
    }
    
    // Update current slide
    currentSlide = slideIndex;
    
    // Add active class to new slide
    if (images[currentSlide]) {
        images[currentSlide].classList.add('active');
    }
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
    
    // Update label
    if (heroImages[currentSlide]) {
        imageLabel.textContent = heroImages[currentSlide].label;
    }
    
    // Update progress bar
    const progressPercentage = ((currentSlide + 1) / heroImages.length) * 100;
    progressBar.style.width = progressPercentage + '%';
}

// Function to go to next slide
function nextSlide() {
    const nextIndex = (currentSlide + 1) % heroImages.length;
    goToSlide(nextIndex);
}

// Function to go to previous slide
function prevSlide() {
    const prevIndex = (currentSlide - 1 + heroImages.length) % heroImages.length;
    goToSlide(prevIndex);
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadHeroImages();
    
    // Add event listeners for arrow buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Optional: Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);
});

// Optional: Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});
// Auto-scrolling carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.image-carousel');
    const images = document.querySelectorAll('.carousel-image');
    const navDots = document.querySelectorAll('.nav-dot');
    const progressBar = document.querySelector('.progress-bar');
    
    let currentSlide = 0;
    const totalSlides = images.length;
    const slideInterval = 4000; // 4 seconds
    let autoSlideTimer;
    let progressTimer;
    
    // Initialize carousel
    function initCarousel() {
        if (totalSlides === 0) return;
        
        // Set initial state
        updateCarousel();
        startAutoSlide();
    }
    
    // Update carousel position and active states
    function updateCarousel() {
        // Move carousel
        const translateX = -currentSlide * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update navigation dots
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Reset and start progress bar animation
        if (progressBar) {
            progressBar.style.width = '0%';
            progressBar.style.transition = 'none';
            
            // Force reflow
            progressBar.offsetHeight;
            
            // Start progress animation
            progressBar.style.transition = `width ${slideInterval}ms linear`;
            progressBar.style.width = '100%';
        }
    }
    
    // Go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
        restartAutoSlide();
    }
    
    // Start auto-slide timer
    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, slideInterval);
    }
    
    // Stop auto-slide timer
    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }
    
    // Restart auto-slide timer
    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Add event listeners for navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Add event listeners for arrow controls
    const prevArrow = document.querySelector('.carousel-arrow.prev');
    const nextArrow = document.querySelector('.carousel-arrow.next');
    
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            prevSlide();
            restartAutoSlide();
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            nextSlide();
            restartAutoSlide();
        });
    }
    
    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.hero-image-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            restartAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            restartAutoSlide();
        }
    });
    
    // Initialize the carousel
    initCarousel();
});
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
    addScrollableStyles();
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

// Create individual battery card with scrollable content
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
            <div class="battery-details-content">
                <div class="description-section">
                    <p><strong>Description:</strong> ${battery.description}</p>
                </div>
                
                <div class="features-section">
                    <h4>Key Features:</h4>
                    <ul class="battery-features">
                        ${battery.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="pros-cons-section">
                    <div class="advantages-section">
                        <p><strong>Advantages:</strong> ${battery.advantages}</p>
                    </div>
                    <div class="disadvantages-section">
                        <p><strong>Disadvantages:</strong> ${battery.disadvantages}</p>
                    </div>
                    <div class="applications-section">
                        <p><strong>Applications:</strong> ${battery.applications}</p>
                    </div>
                </div>
            </div>
            
            <div class="scroll-to-top-btn" title="Scroll to top">
                <i class="fas fa-arrow-up"></i>
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
    
    // Scroll to top functionality for cards
    document.addEventListener('click', handleScrollToTop);
    
    // Hide scroll indicator after scrolling
    document.addEventListener('scroll', handleScrollIndicator, true);
    
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

// Handle scroll to top button in cards
function handleScrollToTop(event) {
    const scrollBtn = event.target.closest('.scroll-to-top-btn');
    if (!scrollBtn) return;
    
    // Prevent event bubbling to avoid closing modal
    event.preventDefault();
    event.stopPropagation();
    
    const detailsContent = scrollBtn.parentElement.querySelector('.battery-details-content');
    if (detailsContent) {
        detailsContent.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Add visual feedback
    scrollBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        scrollBtn.style.transform = 'scale(1)';
    }, 150);
}

// Handle scroll indicator visibility
function handleScrollIndicator(event) {
    const target = event.target;
    if (!target.classList.contains('battery-details-content')) return;
    
    const scrollToTopBtn = target.parentElement.querySelector('.scroll-to-top-btn');
    
    if (target.scrollTop > 50) {
        if (scrollToTopBtn) scrollToTopBtn.style.opacity = '1';
    } else {
        if (scrollToTopBtn) scrollToTopBtn.style.opacity = '0';
    }
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

// Handle battery card toggle and modal expansion
function handleCardToggle(event) {
    const toggleBtn = event.target.closest('.toggle-btn');
    const card = event.target.closest('.battery-card');
    const scrollBtn = event.target.closest('.scroll-to-top-btn');
    
    // Prevent any action if clicking scroll button
    if (scrollBtn) {
        event.stopPropagation();
        return;
    }
    
    // If no card found, return early
    if (!card) return;
    
    // If card is already expanded, don't do anything
    if (card.classList.contains('expanded')) {
        return;
    }
    
    // Check if any card is currently animating
    const container = document.getElementById('batteryCards');
    if (container.classList.contains('animating')) {
        return; // Prevent clicks during animation
    }
    
    // Prevent default and stop propagation for clean event handling
    event.preventDefault();
    event.stopPropagation();
    
    // Expand the card regardless of what was clicked inside it
    expandCard(card);
}

// Expand card to center modal view
function expandCard(clickedCard) {
    const container = document.getElementById('batteryCards');
    const allCards = container.querySelectorAll('.battery-card');
    
    // Check if any card is currently expanded
    const currentlyExpanded = container.querySelector('.battery-card.expanded');
    if (currentlyExpanded) {
        if (currentlyExpanded === clickedCard) {
            return; // If clicking the same expanded card, just ignore
        }
        collapseAllCards();
        // Wait for collapse animation to complete before expanding new card
        setTimeout(() => expandCard(clickedCard), 350);
        return;
    }
    
    // Mark container as animating to prevent multiple clicks
    container.classList.add('animating');
    
    // Reset all cards to clean state with more robust cleanup
    allCards.forEach(card => {
        // Clear any inline styles that might interfere
        card.removeAttribute('style');
        
        const details = card.querySelector('.battery-details');
        const toggleBtn = card.querySelector('.toggle-btn');
        const chevron = toggleBtn?.querySelector('i');
        
        if (details) details.classList.remove('active');
        if (toggleBtn) toggleBtn.classList.remove('active');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    });
    
    // Use requestAnimationFrame for smoother rendering
    requestAnimationFrame(() => {
        // Force reflow to ensure clean state
        container.offsetHeight;
        
        // Expand the clicked card
        clickedCard.classList.add('expanded');
        container.classList.add('modal-mode');
        
        // Auto-expand the details in modal view
        const details = clickedCard.querySelector('.battery-details');
        const detailsContent = clickedCard.querySelector('.battery-details-content');
        if (details) {
            details.classList.add('active');
        }
        
        // Wait for expansion animation to complete
        setTimeout(() => {
            // Reset scroll position
            if (detailsContent) {
                detailsContent.scrollTop = 0;
            }
            
            // Add hint message
            addModalHint();
            
            // Add event listeners for closing
            document.addEventListener('click', handleModalClose);
            document.addEventListener('keydown', handleEscapeKey);
            
            // Remove animating class
            container.classList.remove('animating');
        }, 350);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    });
}

// Add hint message for modal
function addModalHint() {
    const container = document.getElementById('batteryCards');
    
    // Remove existing hint
    const existingHint = container.querySelector('.modal-hint');
    if (existingHint) existingHint.remove();
    
    // Add new hint
    const hint = document.createElement('div');
    hint.className = 'modal-hint';
    hint.textContent = 'Click the ✕ button or press ESC to close';
    container.appendChild(hint);
    
    // Auto-remove hint after 3 seconds
    setTimeout(() => {
        if (hint.parentNode) {
            hint.style.opacity = '0';
            setTimeout(() => hint.remove(), 300);
        }
    }, 3000);
}

// Handle modal close
function handleModalClose(event) {
    const expandedCard = document.querySelector('.battery-card.expanded');
    if (!expandedCard) return;
    
    const clickedOnCard = event.target.closest('.battery-card.expanded');
    
    // Check if clicking on the pseudo-element close button (✕)
    const rect = expandedCard.getBoundingClientRect();
    const closeButtonArea = {
        left: rect.right - 25,
        right: rect.right + 15,
        top: rect.top - 25,
        bottom: rect.top + 15
    };
    
    const clickedOnCloseBtn = (
        event.clientX >= closeButtonArea.left &&
        event.clientX <= closeButtonArea.right &&
        event.clientY >= closeButtonArea.top &&
        event.clientY <= closeButtonArea.bottom
    );
    
    // Close if clicking outside the expanded card or on close button
    if (!clickedOnCard || clickedOnCloseBtn) {
        collapseAllCards();
    }
}

// Handle ESC key to close modal
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        collapseAllCards();
    }
}

// Collapse all cards and exit modal mode
function collapseAllCards() {
    const container = document.getElementById('batteryCards');
    const allCards = container.querySelectorAll('.battery-card');
    const hint = container.querySelector('.modal-hint');
    
    // Mark as animating to prevent interruptions
    container.classList.add('animating');
    
    // Use requestAnimationFrame for smoother collapse
    requestAnimationFrame(() => {
        // Remove expanded state from all cards
        allCards.forEach(card => {
            card.classList.remove('expanded');
            
            // Clear all inline styles completely
            card.removeAttribute('style');
            
            // Also close any open details
            const details = card.querySelector('.battery-details');
            const toggleBtn = card.querySelector('.toggle-btn');
            const chevron = toggleBtn?.querySelector('i');
            
            if (details) details.classList.remove('active');
            if (toggleBtn) toggleBtn.classList.remove('active');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        });
        
        // Remove modal mode
        container.classList.remove('modal-mode');
        
        // Remove hint
        if (hint) hint.remove();
        
        // Remove event listeners
        document.removeEventListener('click', handleModalClose);
        document.removeEventListener('keydown', handleEscapeKey);
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        // Remove animating class after animation completes
        setTimeout(() => {
            container.classList.remove('animating');
        }, 350);
    });
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

// Add custom styles for scrollable cards
function addScrollableStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Enhanced scrollable battery cards */
        .battery-details {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.4s ease;
            position: relative;
        }
        
        .battery-details.active {
            max-height: 400px; /* Increased max height */
            padding: 20px 0;
        }
        
        .battery-details-content {
            max-height: 350px;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 0 15px;
            position: relative;
            
            /* Custom scrollbar */
            scrollbar-width: thin;
            scrollbar-color: #3498db #f1f1f1;
        }
        
        .battery-details-content::-webkit-scrollbar {
            width: 6px;
        }
        
        .battery-details-content::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }
        
        .battery-details-content::-webkit-scrollbar-thumb {
            background: #3498db;
            border-radius: 3px;
            transition: background 0.3s ease;
        }
        
        .battery-details-content::-webkit-scrollbar-thumb:hover {
            background: #2980b9;
        }
        
        /* Scroll to top button */
        .scroll-to-top-btn {
            position: absolute;
            bottom: 10px;
            right: 15px;
            background: #3498db;
            color: white;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(52, 152, 219, 0.4);
            z-index: 20;
        }
        
        .scroll-to-top-btn:hover {
            background: #2980b9;
            transform: scale(1.1);
        }
        
        .scroll-to-top-btn i {
            font-size: 14px;
        }
        
        /* Content sections spacing */
        .description-section,
        .features-section,
        .pros-cons-section {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .pros-cons-section:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .advantages-section,
        .disadvantages-section,
        .applications-section {
            margin-bottom: 12px;
        }
        
        /* Enhanced feature list */
        .battery-features {
            list-style: none;
            padding: 0;
            margin: 10px 0;
        }
        
        .battery-features li {
            background: #f8f9fa;
            margin: 8px 0;
            padding: 10px 15px;
            border-left: 4px solid #3498db;
            border-radius: 0 8px 8px 0;
            transition: all 0.3s ease;
        }
        
        .battery-features li:hover {
            background: #e3f2fd;
            border-left-color: #2196f3;
            transform: translateX(5px);
        }
        
        /* Fade effect for long content */
        .battery-details-content::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 20px;
            background: linear-gradient(transparent, rgba(255, 255, 255, 0.9));
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .battery-details-content:not(:hover)::after {
            opacity: 1;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .battery-details.active {
                max-height: 350px;
            }
            
            .battery-details-content {
                max-height: 300px;
                padding: 0 10px;
            }
            
            .scroll-to-top-btn {
                width: 30px;
                height: 30px;
                bottom: 5px;
                right: 10px;
            }
            
            .battery-features li {
                padding: 8px 12px;
                font-size: 14px;
            }
        }
        
        /* Animation enhancements */
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

// Intersection Observer for animations
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

// Enhanced initialization with better timing for GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all assets are loaded
    setTimeout(() => {
        initializeElements();
        renderBatteryCards();
        setupEventListeners();
        setupSmoothScrolling();
        initializeScrollAnimations();
        addScrollableStyles();
    }, 100);
});

// Fallback initialization in case of loading issues
window.addEventListener('load', function() {
    // Check if already initialized
    if (!document.getElementById('batteryCards').children.length) {
        initializeElements();
        renderBatteryCards();
        setupEventListeners();
        setupSmoothScrolling();
        initializeScrollAnimations();
        addScrollableStyles();
    }
});

// EV Battery Calculator Functions
function showCalculator() {
    document.getElementById('calculator').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function hideCalculator() {
    document.getElementById('calculator').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function calculateBattery() {
    const capacity = parseFloat(document.getElementById('batteryCapacity').value);
    const efficiency = parseFloat(document.getElementById('efficiency').value);
    const electricityPrice = parseFloat(document.getElementById('electricityPrice').value);
    const chargingEfficiency = parseFloat(document.getElementById('chargingEfficiency').value) / 100;

    // Validate inputs
    if (!capacity || !efficiency || !electricityPrice || !chargingEfficiency) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    // Calculate range (km)
    const range = (capacity / efficiency) * 100;
    
    // Calculate full charge cost
    const fullChargeCost = (capacity * electricityPrice) / chargingEfficiency;
    
    // Calculate cost per 100km
    const costPer100km = (efficiency * electricityPrice) / chargingEfficiency;
    
    // Estimate charging time (0-80% with typical charging curve)
    const chargingTime = (capacity * 0.8) / 50; // Assuming 50kW average charging power

    // Display results
    document.getElementById('rangeResult').textContent = Math.round(range);
    document.getElementById('costResult').textContent = fullChargeCost.toFixed(2);
    document.getElementById('costPer100Result').textContent = costPer100km.toFixed(2);
    document.getElementById('chargingTimeResult').textContent = chargingTime.toFixed(1);
}

// Export functions for potential external use
window.EVBatteryExplorer = {
    filterBatteries,
    sortBatteries,
    batteryData,
    showCalculator,
    hideCalculator,
    calculateBattery
};
