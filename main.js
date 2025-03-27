/**
 * MechanicBoston.com - Premium JavaScript
 * Handles site-wide functionality including navigation, UI interactions, and premium features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Header elements
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
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active')) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-toggle')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
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
