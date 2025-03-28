// HEADER JAVASCRIPT
document.addEventListener('DOMContentLoaded', function() {
    // Header elements
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    // Header scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Set current page in navigation
    function setCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            // Reset any current page indicators
            link.removeAttribute('aria-current');
            
            // Get the href attribute
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Convert to path
            const linkPath = new URL(href, window.location.origin).pathname;
            
            // Check if this is the current page
            if (currentPath === linkPath || 
                (currentPath !== '/' && linkPath !== '/' && currentPath.includes(linkPath))) {
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !expanded);
        mainNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = expanded ? '' : 'hidden';
    }
    
    // Toggle dropdown on mobile
    function toggleDropdown(e) {
        if (window.innerWidth >= 992) return;
        
        e.preventDefault();
        const dropdown = this.closest('.has-dropdown');
        
        // Close other open dropdowns
        dropdowns.forEach(d => {
            if (d !== dropdown && d.classList.contains('active')) {
                d.classList.remove('active');
            }
        });
        
        // Toggle this dropdown
        dropdown.classList.toggle('active');
    }
    
    // Close mobile menu when clicking outside
    function handleOutsideClick(e) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('active')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Add hover effects to navigation items
    function setupNavHoverEffects() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                if (window.innerWidth < 992) return;
                
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.style.opacity = '0.7';
                    }
                });
            });
            
            item.addEventListener('mouseleave', function() {
                navItems.forEach(otherItem => {
                    otherItem.style.opacity = '1';
                });
            });
        });
    }
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth >= 992) {
            // Reset mobile menu state
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset dropdown states
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }
    
    // Enhance dropdown animation
    function setupDropdownAnimation() {
        if (window.innerWidth < 992) return;
        
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            const items = menu.querySelectorAll('li');
            
            // Set initial state
            items.forEach((item, index) => {
                item.style.transitionDelay = (index * 0.05) + 's';
                item.style.transform = 'translateY(10px)';
                item.style.opacity = '0';
                item.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            });
            
            // Animate in on hover
            dropdown.addEventListener('mouseenter', function() {
                items.forEach(item => {
                    item.style.transform = 'translateY(0)';
                    item.style.opacity = '1';
                });
            });
            
            // Reset on leave
            dropdown.addEventListener('mouseleave', function() {
                items.forEach(item => {
                    item.style.transform = 'translateY(10px)';
                    item.style.opacity = '0';
                });
            });
        });
    }
    
    // Add a subtle shine effect to the header for premium look
    function addShineEffect() {
        const headerContainer = header.querySelector('.container');
        const shine = document.createElement('div');
        shine.className = 'header-shine';
        shine.style.position = 'absolute';
        shine.style.top = '0';
        shine.style.left = '-150%';
        shine.style.width = '80%';
        shine.style.height = '100%';
        shine.style.background = 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)';
        shine.style.transform = 'skewX(-20deg)';
        shine.style.pointerEvents = 'none';
        shine.style.zIndex = '1';
        headerContainer.appendChild(shine);
        
        // Animate the shine effect
        setInterval(() => {
            shine.style.transition = 'left 1.5s ease-in-out';
            shine.style.left = '150%';
            
            setTimeout(() => {
                shine.style.transition = 'none';
                shine.style.left = '-150%';
            }, 1500);
        }, 6000);
    }
    
    // Initialize event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMobileMenu);
    }
    
    document.addEventListener('click', handleOutsideClick);
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        dropdownLink.addEventListener('click', toggleDropdown);
    });
    
    // Initialize
    handleScroll();
    setCurrentPage();
    setupNavHoverEffects();
    setupDropdownAnimation();
    addShineEffect();
    
    // Extra touch: Add service data attributes to quote buttons
    const serviceLinks = document.querySelectorAll('[data-service]');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If this is a link to the quote form
            if (link.getAttribute('href').includes('#quote-form')) {
                const service = link.getAttribute('data-service');
                // Store selected service in sessionStorage for the quote form
                if (service) {
                    sessionStorage.setItem('selectedService', service);
                }
            }
        });
    });
});
    // ======================================================
    // Form Handling and Validation
    // ======================================================
    const quoteForm = document.getElementById('quick-quote-form');
    const serviceTypeSelect = document.getElementById('service-type');
    const otherServiceGroup = document.getElementById('other-service-group');
    const zipCodeInput = document.getElementById('zip-code');
    const phoneInput = document.getElementById('phone');
    
    // Service dropdown for "other" option
    if (serviceTypeSelect && otherServiceGroup) {
        serviceTypeSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherServiceGroup.style.display = 'block';
                document.getElementById('other-service').setAttribute('required', 'required');
            } else {
                otherServiceGroup.style.display = 'none';
                document.getElementById('other-service').removeAttribute('required');
            }
        });
    }
    
    // Basic phone number formatting
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
    
    // ZIP code input (numbers only)
    if (zipCodeInput) {
        zipCodeInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Remove error styling when user starts typing (for all forms)
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                this.nextElementSibling.remove();
            }
        });
    });
    
    // Multi-step form navigation
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    // Next step buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get current step
            const currentStep = this.closest('.form-step');
            
            // Validate current step fields
            const inputs = currentStep.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        input.insertAdjacentElement('afterend', errorMsg);
                    }
                } else {
                    input.classList.remove('error');
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                        input.nextElementSibling.remove();
                    }
                }
            });
            
            if (!isValid) return;
            
            // Move to next step
            const currentIndex = Array.from(formSteps).indexOf(currentStep);
            if (currentIndex < formSteps.length - 1) {
                formSteps.forEach(step => step.classList.remove('active'));
                formSteps[currentIndex + 1].classList.add('active');
            }
        });
    });
    
    // Previous step buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const currentIndex = Array.from(formSteps).indexOf(currentStep);
            
            if (currentIndex > 0) {
                formSteps.forEach(step => step.classList.remove('active'));
                formSteps[currentIndex - 1].classList.add('active');
            }
        });
    });
    
    // Quote Form Specific Handling
    if (quoteForm) {
        // Smooth scroll to form when clicking the CTA button
        const ctaButton = document.querySelector('.btn-hero');
        if (ctaButton) {
            ctaButton.addEventListener('click', function(e) {
                e.preventDefault();
                const formSection = document.getElementById('quote-form');
                if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        
        // Form submission handling
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const required = this.querySelectorAll('[required]');
            let isValid = true;
            
            required.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Remove error class on input
                    field.addEventListener('input', function() {
                        if (this.value.trim()) {
                            this.classList.remove('error');
                        }
                    }, { once: true });
                } else {
                    field.classList.remove('error');
                }
            });
            
            // ZIP code validation
            if (zipCodeInput && zipCodeInput.value) {
                const zipRegex = /^\d{5}$/;
                if (!zipRegex.test(zipCodeInput.value)) {
                    isValid = false;
                    zipCodeInput.classList.add('error');
                }
            }
            
            // Phone validation
            if (phoneInput && phoneInput.value) {
                // Allow various phone formats
                const phoneRegex = /^[\d\s\-\(\)\.]{10,15}$/;
                if (!phoneRegex.test(phoneInput.value)) {
                    isValid = false;
                    phoneInput.classList.add('error');
                }
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = quoteForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<div class="spinner"></div> Processing...';
                
                // Simulate form submission (replace with actual form submission)
                setTimeout(() => {
                    // Replace form with success message
                    quoteForm.innerHTML = `
                        <div class="form-success">
                            <div class="success-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0057b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 12l2 2 4-4"></path>
                                </svg>
                            </div>
                            <h3>Quote Request Received!</h3>
                            <p>Thank you for submitting your quote request. We're reaching out to our network of mechanics in your area.</p>
                            <p>You'll receive your quotes via email and text shortly. Be sure to check your inbox!</p>
                        </div>
                    `;
                }, 1500);
            } else {
                // Scroll to first error
                const firstError = quoteForm.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
    }
    
    // Add CSS for form validation and success state
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: #ef4444 !important;
            background-color: #fef2f2 !important;
        }
        
        .error-message {
            color: #ef4444;
            font-size: 1.3rem;
            margin-top: 0.5rem;
        }
        
        .spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            margin-right: 10px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .form-success {
            text-align: center;
            padding: 3rem 2rem;
        }
        
        .success-icon {
            display: inline-block;
            background-color: #f0f9ff;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
        }
        
        .form-success h3 {
            font-size: 2.2rem;
            color: #0f172a;
            margin-bottom: 1.5rem;
        }
        
        .form-success p {
            font-size: 1.6rem;
            color: #64748b;
            margin-bottom: 1rem;
        }
    `;
    document.head.appendChild(style);
});
