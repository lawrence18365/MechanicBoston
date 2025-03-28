// Premium Quote Form - Enhanced UX
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const quoteForm = document.getElementById('quick-quote-form');
    const serviceSelect = document.getElementById('service-type');
    const zipInput = document.getElementById('zip-code');
    const phoneInput = document.getElementById('phone');
    const formGroups = document.querySelectorAll('.form-group');
    
    // Set pre-selected service if coming from navigation
    function setSelectedService() {
        const storedService = sessionStorage.getItem('selectedService');
        if (storedService && serviceSelect) {
            // Find matching option
            Array.from(serviceSelect.options).forEach(option => {
                if (option.value === storedService) {
                    option.selected = true;
                }
            });
            
            // If no exact match, try partial match
            if (serviceSelect.value === "") {
                Array.from(serviceSelect.options).forEach(option => {
                    if (option.value.includes(storedService) || storedService.includes(option.value)) {
                        option.selected = true;
                    }
                });
            }
        }
    }
    
    // Format phone number as user types
    function formatPhoneNumber(e) {
        let input = e.target.value.replace(/\D/g, '');
        let formatted = '';
        
        if (input.length > 0) {
            formatted += '(';
            formatted += input.substring(0, 3);
        }
        
        if (input.length >= 4) {
            formatted += ') ';
            formatted += input.substring(3, 6);
        }
        
        if (input.length >= 7) {
            formatted += '-';
            formatted += input.substring(6, 10);
        }
        
        e.target.value = formatted;
    }
    
    // Validate ZIP code - numbers only
    function validateZip(e) {
        if (!/^\d*$/.test(e.target.value)) {
            e.target.value = e.target.value.replace(/\D/g, '');
        }
    }
    
    // Add focus and blur effects to form groups
    function addFormFieldEffects() {
        formGroups.forEach(group => {
            const input = group.querySelector('input, select');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Add active class on focus
                input.addEventListener('focus', () => {
                    group.classList.add('input-focused');
                });
                
                // Remove active class on blur if empty
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        group.classList.remove('input-focused');
                    }
                });
                
                // If input has value (e.g. on page load)
                if (input.value) {
                    group.classList.add('input-focused');
                }
            }
        });
    }
    
    // Add smooth scroll to form when clicked from navigation
    function setupSmoothScroll() {
        const formLinks = document.querySelectorAll('a[href="#quote-form"]');
        
        formLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const formSection = document.getElementById('quote-form');
                if (!formSection) return;
                
                // Store the service if data-service attribute exists
                const service = this.getAttribute('data-service');
                if (service) {
                    sessionStorage.setItem('selectedService', service);
                    
                    // Also set it immediately if we're on the same page
                    setSelectedService();
                }
                
                // Scroll to form with smooth behavior
                formSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Focus on first field after scrolling
                setTimeout(() => {
                    serviceSelect.focus();
                }, 800);
            });
        });
    }
    
    // Form submission with validation and animation
    function setupFormSubmission() {
        if (!quoteForm) return;
        
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Visual feedback - add processing class
            quoteForm.classList.add('processing');
            const submitBtn = quoteForm.querySelector('.btn-submit');
            
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Simulate form processing (replace with actual submission)
                setTimeout(() => {
                    // Success state
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Submitted!';
                    submitBtn.classList.add('success');
                    
                    // Success message
                    const formContainer = quoteForm.closest('.form-card');
                    if (formContainer) {
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.innerHTML = `
                            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                            <h3>Your request was successful!</h3>
                            <p>We're connecting you with the best mechanics in Boston.<br>You'll receive a confirmation shortly.</p>
                        `;
                        
                        // Fade out form and show success message
                        quoteForm.style.opacity = '0';
                        
                        setTimeout(() => {
                            quoteForm.style.display = 'none';
                            formContainer.appendChild(successMessage);
                            
                            // Show success message with animation
                            setTimeout(() => {
                                successMessage.classList.add('visible');
                            }, 100);
                        }, 500);
                    }
                }, 1500);
            }
        });
    }
    
    // Add parallax effect to floating graphics
    function setupParallaxEffect() {
        const floatingGraphics = document.querySelectorAll('.floating-graphic');
        
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            floatingGraphics.forEach((graphic, index) => {
                const speed = (index + 1) * 15;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;
                
                graphic.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }
    
    // Initialize all functions
    function init() {
        if (phoneInput) {
            phoneInput.addEventListener('input', formatPhoneNumber);
        }
        
        if (zipInput) {
            zipInput.addEventListener('input', validateZip);
        }
        
        setSelectedService();
        addFormFieldEffects();
        setupSmoothScroll();
        setupFormSubmission();
        setupParallaxEffect();
        
        // Add CSS class when the page is fully loaded
        document.body.classList.add('page-loaded');
    }
    
    // Run initialization
    init();
});
