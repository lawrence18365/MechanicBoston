/**
 * MechanicBoston.com - Google Analytics 4 Implementation
 * This script handles the setup and events for Google Analytics tracking
 */

// Google Analytics 4 Initialization
// Replace G-XXXXXXXXXX with your actual GA4 Measurement ID when deploying
(function() {
    // Only initialize if cookie consent has been given
    if (localStorage.getItem('cookieConsent') === 'all') {
        // Google Analytics 4 base code
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX', {
            'send_page_view': true,
            'anonymize_ip': true,
            'cookie_domain': 'mechanicboston.com',
            'cookie_expires': 63072000, // 2 years in seconds
            'custom_map': {
                'dimension1': 'page_template',
                'dimension2': 'user_consent_level'
            }
        });
        
        // Set custom dimensions
        gtag('set', 'page_template', getPageTemplate());
        gtag('set', 'user_consent_level', localStorage.getItem('cookieConsent'));
        
        // Set up event listeners after analytics is loaded
        setupEventTracking();
    }
})();

/**
 * Determine the current page template for better analytics segmentation
 * @returns {string} The page template name
 */
function getPageTemplate() {
    const pathName = window.location.pathname;
    
    if (pathName === '/' || pathName === '/index.html') {
        return 'homepage';
    } else if (pathName.includes('/services/')) {
        return 'service_page';
    } else if (pathName.includes('/neighborhoods/')) {
        return 'neighborhood_page';
    } else if (pathName.includes('/blog/')) {
        return pathName.endsWith('index.html') ? 'blog_index' : 'blog_article';
    } else if (pathName.includes('/maintenance-calculator.html')) {
        return 'tool_page';
    } else if (pathName.includes('/testimonials.html')) {
        return 'testimonials_page';
    } else if (pathName.includes('/faq.html')) {
        return 'faq_page';
    } else if (pathName.includes('/contact.html')) {
        return 'contact_page';
    } else if (pathName.includes('/about.html')) {
        return 'about_page';
    } else {
        return 'other';
    }
}

/**
 * Setup event tracking for key user interactions
 */
function setupEventTracking() {
    // Track form submissions
    trackFormSubmissions();
    
    // Track outbound links
    trackOutboundLinks();
    
    // Track phone calls
    trackPhoneCalls();
    
    // Track service selection
    trackServiceSelection();
    
    // Track maintenance calculator usage
    trackMaintenanceCalculator();
}

/**
 * Track all form submissions
 */
function trackFormSubmissions() {
    document.addEventListener('submit', function(event) {
        const form = event.target;
        const formId = form.id || 'unknown_form';
        
        // Determine form type for better tracking
        let formType = 'other_form';
        
        if (formId.includes('quote') || formId === 'quick-quote-form') {
            formType = 'quote_request';
        } else if (formId === 'calculator-form') {
            formType = 'maintenance_calculator';
        } else if (formId.includes('contact')) {
            formType = 'contact_form';
        } else if (formId.includes('review')) {
            formType = 'review_submission';
        } else if (formId.includes('subscribe')) {
            formType = 'newsletter_signup';
        }
        
        // Track the form submission event
        gtag('event', 'form_submission', {
            'form_id': formId,
            'form_type': formType,
            'page_location': window.location.href
        });
    });
}

/**
 * Track outbound link clicks
 */
function trackOutboundLinks() {
    document.addEventListener('click', function(event) {
        const link = event.target.closest('a');
        
        if (link && link.hostname !== window.location.hostname && !link.href.startsWith('tel:') && !link.href.startsWith('mailto:')) {
            // This is an outbound link
            gtag('event', 'outbound_link_click', {
                'link_url': link.href,
                'link_text': link.innerText.trim() || '[IMAGE LINK]',
                'page_location': window.location.href
            });
        }
    });
}

/**
 * Track phone call clicks
 */
function trackPhoneCalls() {
    document.addEventListener('click', function(event) {
        const link = event.target.closest('a');
        
        if (link && link.href.startsWith('tel:')) {
            // This is a phone call link
            gtag('event', 'phone_call', {
                'phone_number': link.href.replace('tel:', ''),
                'link_location': getElementLocation(link),
                'page_location': window.location.href
            });
        }
    });
}

/**
 * Track service selection in forms
 */
function trackServiceSelection() {
    const serviceSelects = document.querySelectorAll('select[name="service-type"], select[name="service-needed"]');
    
    serviceSelects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value && this.value !== '') {
                gtag('event', 'service_selection', {
                    'service_type': this.value,
                    'form_id': this.closest('form').id || 'unknown_form',
                    'page_location': window.location.href
                });
            }
        });
    });
}

/**
 * Track maintenance calculator usage
 */
function trackMaintenanceCalculator() {
    // Only setup if we're on the calculator page
    const calculatorForm = document.getElementById('calculator-form');
    if (!calculatorForm) return;
    
    // Track calculator form submission
    calculatorForm.addEventListener('submit', function() {
        const vehicleYear = document.getElementById('vehicle-year').value;
        const vehicleMake = document.getElementById('vehicle-make').value;
        const vehicleModel = document.getElementById('vehicle-model').value;
        const vehicleType = document.getElementById('vehicle-type').value;
        const drivingConditions = document.getElementById('driving-conditions').value;
        
        gtag('event', 'maintenance_calculator_use', {
            'vehicle_year': vehicleYear,
            'vehicle_make': vehicleMake,
            'vehicle_type': vehicleType,
            'driving_conditions': drivingConditions
        });
    });
    
    // Track printing of maintenance schedule
    document.addEventListener('click', function(event) {
        if (event.target.id === 'print-schedule') {
            gtag('event', 'maintenance_schedule_print', {
                'page_location': window.location.href
            });
        }
    });
}

/**
 * Helper function to identify where in the page an element is located
 * @param {HTMLElement} element - The element to locate
 * @returns {string} - Description of the element's location
 */
function getElementLocation(element) {
    // Check if in header
    if (element.closest('.site-header')) {
        return 'header';
    }
    
    // Check if in footer
    if (element.closest('.site-footer')) {
        return 'footer';
    }
    
    // Check if in emergency CTA
    if (element.closest('.emergency-cta')) {
        return 'emergency_cta';
    }
    
    // Check if in a form
    if (element.closest('form')) {
        return 'form_' + (element.closest('form').id || 'unknown');
    }
    
    // Default to main content
    return 'main_content';
}
