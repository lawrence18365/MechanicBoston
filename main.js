/**
 * MechanicBoston.com - Main JavaScript
 * Handles site-wide functionality including navigation and UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Add aria-expanded attribute toggle for accessibility
            const isExpanded = mainNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active')) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-toggle')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Service dropdown for "other" option
    const serviceTypeSelect = document.getElementById('service-type');
    const otherServiceGroup = document.getElementById('other-service-group');
    
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
    
    // Simple form validation for ZIP code (numbers only)
    const zipCodeInput = document.getElementById('zip-code');
    
    if (zipCodeInput) {
        zipCodeInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
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
    
    // Remove error styling when user starts typing
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                this.nextElementSibling.remove();
            }
        });
    });
    
    // Basic phone number formatting
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
});
