// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ian Beauty website loaded successfully!');
    
    // Initialize all functionality
    initMobileMenu();
    initTestimonialSlider();
    initFormValidation();
    initSmoothScrolling();
    initCartFunctionality();
    initProductInteractions();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Mobile Menu Toggle Functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            try {
                navMenu.classList.toggle('active');
                nav.classList.toggle('mobile-active');
                
                // Update toggle text
                const isActive = navMenu.classList.contains('active');
                mobileToggle.textContent = isActive ? 'Close' : 'Menu';
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isActive ? 'hidden' : '';
                
            } catch (error) {
                console.error('Error toggling mobile menu:', error);
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                nav.classList.remove('mobile-active');
                mobileToggle.textContent = 'Menu';
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                nav.classList.remove('mobile-active');
                mobileToggle.textContent = 'Menu';
                document.body.style.overflow = '';
            }
        });
    }
}

// Testimonial Slider Functionality
function initTestimonialSlider() {
    const testimonials = [
        {
            name: "Anncatek",
            rating: 5,
            text: "As one of the beneficiaries asanteni Sana wafuasi, kiongos, Dr Winnie and all the awesome staff members at Ian Beauty.",
            product: "Dermatologist Consultation",
            price: "KSh3,500.00",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            productImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=50&h=50&fit=crop"
        },
        {
            name: "Sarah M.",
            rating: 5,
            text: "Ian Beauty transformed my skincare routine completely. The consultation was thorough and the products recommended work perfectly for my skin type.",
            product: "Skin Analysis",
            price: "KSh4,000.00",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            productImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=50&h=50&fit=crop"
        },
        {
            name: "James K.",
            rating: 4,
            text: "Great service and quality products. The virtual consultation was convenient and the dermatologist was very knowledgeable.",
            product: "Virtual Consultation",
            price: "KSh1,000.00",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            productImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=50&h=50&fit=crop"
        }
    ];
    
    let currentTestimonial = 0;
    const testimonialContainer = document.querySelector('.testimonial-slider');
    
    if (testimonialContainer) {
        try {
            // Create navigation buttons
            const navContainer = document.createElement('div');
            navContainer.className = 'testimonial-nav';
            navContainer.innerHTML = `
                <button class="testimonial-prev" aria-label="Previous testimonial">‹</button>
                <div class="testimonial-dots"></div>
                <button class="testimonial-next" aria-label="Next testimonial">›</button>
            `;
            testimonialContainer.appendChild(navContainer);
            
            // Create dots
            const dotsContainer = navContainer.querySelector('.testimonial-dots');
            testimonials.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
                dot.addEventListener('click', () => goToTestimonial(index));
                dotsContainer.appendChild(dot);
            });
            
            // Update testimonial display
            function updateTestimonial() {
                const testimonial = testimonials[currentTestimonial];
                const card = testimonialContainer.querySelector('.testimonial-card');
                
                if (card) {
                    card.innerHTML = `
                        <div class="testimonial-image">
                            <img src="${testimonial.image}" alt="${testimonial.name}">
                        </div>
                        <div class="testimonial-content">
                            <div class="rating">${'★'.repeat(testimonial.rating)}</div>
                            <h4>${testimonial.name}</h4>
                            <p class="verified">✓ Verified Buyer</p>
                            <p>${testimonial.text}</p>
                            <div class="product-mention">
                                <img src="${testimonial.productImage}" alt="Product">
                                <div>
                                    <p>${testimonial.product}</p>
                                    <p>${testimonial.price}</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                // Update dots
                document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentTestimonial);
                });
            }
            
            function goToTestimonial(index) {
                currentTestimonial = index;
                updateTestimonial();
            }
            
            function nextTestimonial() {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                updateTestimonial();
            }
            
            function prevTestimonial() {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                updateTestimonial();
            }
            
            // Event listeners for navigation
            navContainer.querySelector('.testimonial-next').addEventListener('click', nextTestimonial);
            navContainer.querySelector('.testimonial-prev').addEventListener('click', prevTestimonial);
            
            // Auto-play functionality
            let autoPlayInterval = setInterval(nextTestimonial, 5000);
            
            // Pause auto-play on hover
            testimonialContainer.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });
            
            testimonialContainer.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(nextTestimonial, 5000);
            });
            
            // Initialize first testimonial
            updateTestimonial();
            
        } catch (error) {
            console.error('Error initializing testimonial slider:', error);
        }
    }
}

// Form Validation Functionality
function initFormValidation() {
    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            try {
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                // Clear previous error messages
                clearErrorMessages(this);
                
                if (!email) {
                    showErrorMessage(emailInput, 'Email is required');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showErrorMessage(emailInput, 'Please enter a valid email address');
                    return;
                }
                
                // Simulate successful subscription
                showSuccessMessage(this, 'Thank you for subscribing to our newsletter!');
                emailInput.value = '';
                
            } catch (error) {
                console.error('Error validating newsletter form:', error);
                showErrorMessage(this, 'An error occurred. Please try again.');
            }
        });
    }
    
    // Contact form validation (if exists)
    const contactForms = document.querySelectorAll('form:not(.newsletter-form)');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            try {
                const nameInput = this.querySelector('input[name="name"], input[type="text"]');
                const emailInput = this.querySelector('input[name="email"], input[type="email"]');
                const messageInput = this.querySelector('textarea[name="message"], textarea');
                
                let isValid = true;
                
                // Clear previous error messages
                clearErrorMessages(this);
                
                // Validate name
                if (nameInput && !nameInput.value.trim()) {
                    showErrorMessage(nameInput, 'Name is required');
                    isValid = false;
                }
                
                // Validate email
                if (emailInput) {
                    const email = emailInput.value.trim();
                    if (!email) {
                        showErrorMessage(emailInput, 'Email is required');
                        isValid = false;
                    } else if (!isValidEmail(email)) {
                        showErrorMessage(emailInput, 'Please enter a valid email address');
                        isValid = false;
                    }
                }
                
                // Validate message
                if (messageInput && !messageInput.value.trim()) {
                    showErrorMessage(messageInput, 'Message is required');
                    isValid = false;
                }
                
                if (isValid) {
                    showSuccessMessage(this, 'Thank you for your message! We will get back to you soon.');
                    this.reset();
                }
                
            } catch (error) {
                console.error('Error validating contact form:', error);
                showErrorMessage(this, 'An error occurred. Please try again.');
            }
        });
    });
}

// Helper functions for form validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showErrorMessage(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e91e63';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.5rem';
    
    input.style.borderColor = '#e91e63';
    input.parentNode.appendChild(errorDiv);
}

function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.color = '#4caf50';
    successDiv.style.fontSize = '0.9rem';
    successDiv.style.marginTop = '1rem';
    successDiv.style.padding = '0.5rem';
    successDiv.style.backgroundColor = '#e8f5e8';
    successDiv.style.borderRadius = '5px';
    
    form.appendChild(successDiv);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
}

function clearErrorMessages(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    const successMessages = form.querySelectorAll('.success-message');
    
    errorMessages.forEach(msg => msg.remove());
    successMessages.forEach(msg => msg.remove());
    
    // Reset input border colors
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            try {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    const nav = document.querySelector('.nav');
                    const mobileToggle = document.querySelector('.mobile-menu-toggle');
                    
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        nav.classList.remove('mobile-active');
                        mobileToggle.textContent = 'Menu';
                        document.body.style.overflow = '';
                    }
                }
            } catch (error) {
                console.error('Error with smooth scrolling:', error);
            }
        });
    });
}

// Cart Functionality
function initCartFunctionality() {
    let cartCount = 0;
    const cartIcon = document.querySelector('.cart-count');
    
    // Add to cart buttons (simulate functionality)
    const addToCartButtons = document.querySelectorAll('.add-to-cart, .cta-button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            try {
                // Don't add to cart if it's a navigation button
                if (this.classList.contains('cta-button') && this.textContent.includes('SHOP')) {
                    return;
                }
                
                cartCount++;
                if (cartIcon) {
                    cartIcon.textContent = cartCount;
                    
                    // Add animation
                    cartIcon.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        cartIcon.style.transform = 'scale(1)';
                    }, 200);
                }
                
                // Show feedback
                showCartFeedback(this);
                
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        });
    });
}

function showCartFeedback(button) {
    const feedback = document.createElement('div');
    feedback.textContent = 'Added to cart!';
    feedback.style.position = 'absolute';
    feedback.style.background = '#4caf50';
    feedback.style.color = 'white';
    feedback.style.padding = '0.5rem 1rem';
    feedback.style.borderRadius = '5px';
    feedback.style.fontSize = '0.8rem';
    feedback.style.zIndex = '1000';
    feedback.style.opacity = '0';
    feedback.style.transform = 'translateY(10px)';
    feedback.style.transition = 'all 0.3s ease';
    
    button.style.position = 'relative';
    button.appendChild(feedback);
    
    // Animate in
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(-30px)';
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

// Product Interactions
function initProductInteractions() {
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
    
    // Category card interactions
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            try {
                const categoryName = this.querySelector('h3').textContent;
                console.log(`Navigating to ${categoryName} category`);
                
                // Simulate navigation
                showNotification(`Browsing ${categoryName} products...`);
                
            } catch (error) {
                console.error('Error handling category click:', error);
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = type === 'error' ? '#e91e63' : '#4caf50';
    notification.style.color = 'white';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '10000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                try {
                    const searchTerm = this.value.trim();
                    if (searchTerm) {
                        console.log(`Searching for: ${searchTerm}`);
                        showNotification(`Searching for "${searchTerm}"...`);
                        
                        // Clear search input
                        this.value = '';
                    }
                } catch (error) {
                    console.error('Error handling search:', error);
                }
            }
        });
    }
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    initSearchFunctionality();
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // Set a placeholder or default image
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEyNy45MSAxMDAgMTEwIDExNy45MSAxMTAgMTQwQzExMCAxNjIuMDkgMTI3LjkxIDE4MCAxNTAgMTgwQzE3Mi4wOSAxODAgMTkwIDE2Mi4wOSAxOTAgMTQwQzE5MCAxMTcuOTEgMTcyLjA5IDEwMCAxNTAgMTAwWiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K';
            this.alt = 'Image not available';
        });
    });
});

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Console welcome message
console.log(`
🌟 Welcome to Ian Beauty! 🌟
Website successfully loaded and ready for interaction.
All features initialized:
✅ Mobile Navigation
✅ Testimonial Slider
✅ Form Validation
✅ Smooth Scrolling
✅ Cart Functionality
✅ Product Interactions
✅ Search Functionality
✅ Error Handling
`);
