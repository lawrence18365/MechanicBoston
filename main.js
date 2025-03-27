/**
 * MechanicBoston.com - Combined JavaScript
 * Handles site-wide functionality including header, navigation, and form interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================================================
    // Header & Navigation Functionality
    // ======================================================
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Create menu overlay for mobile
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle functionality
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            mainNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = expanded ? '' : 'hidden';
        });
    }
    
    // Close menu when clicking outside or on overlay
    menuOverlay.addEventListener('click', function() {
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Dropdown functionality for mobile
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Add subtle hover effects to nav items
    const navItems = document.querySelectorAll('.main-nav > ul > li > a:not(.btn)');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
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
    
    // Enhanced dropdown animation
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    
    dropdownMenus.forEach(menu => {
        const items = menu.querySelectorAll('li');
        
        items.forEach((item, index) => {
            item.style.transitionDelay = (index * 0.05) + 's';
            item.style.transform = 'translateY(10px)';
            item.style.opacity = '0';
            item.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        });
        
        const parentDropdown = menu.closest('.has-dropdown');
        
        parentDropdown.addEventListener('mouseenter', function() {
            items.forEach(item => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            });
        });
        
        parentDropdown.addEventListener('mouseleave', function() {
            items.forEach(item => {
                item.style.transform = 'translateY(10px)';
                item.style.opacity = '0';
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
