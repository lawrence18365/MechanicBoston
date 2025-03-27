/**
 * MechanicBoston.com - Cookie Consent Banner
 * GDPR and CCPA compliant cookie consent implementation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already made a cookie choice
    const consentGiven = localStorage.getItem('cookieConsent');
    
    if (!consentGiven) {
        createConsentBanner();
    }
    
    /**
     * Creates and displays the cookie consent banner
     */
    function createConsentBanner() {
        // Create banner elements
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-labelledby', 'cookieTitle');
        banner.setAttribute('aria-describedby', 'cookieDescription');
        
        // Banner content
        banner.innerHTML = `
            <div class="cookie-content">
                <h2 id="cookieTitle">Cookie Consent</h2>
                <p id="cookieDescription">We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. By clicking "Accept", you consent to our use of cookies. Read our <a href="/privacy-policy.html">Privacy Policy</a> to learn more.</p>
                <div class="cookie-buttons">
                    <button id="cookie-accept" class="btn btn-primary">Accept All</button>
                    <button id="cookie-essential" class="btn btn-secondary">Essential Only</button>
                    <button id="cookie-settings" class="btn btn-text">Cookie Settings</button>
                </div>
            </div>
        `;
        
        // Add banner to page
        document.body.appendChild(banner);
        
        // Add banner styles
        addBannerStyles();
        
        // Add event listeners to buttons
        document.getElementById('cookie-accept').addEventListener('click', function() {
            setConsent('all');
            removeBanner(banner);
        });
        
        document.getElementById('cookie-essential').addEventListener('click', function() {
            setConsent('essential');
            removeBanner(banner);
        });
        
        document.getElementById('cookie-settings').addEventListener('click', function() {
            showCookieSettings();
        });
    }
    
    /**
     * Adds CSS styles for the cookie banner
     */
    function addBannerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: white;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                padding: 15px;
                font-family: Arial, sans-serif;
            }
            
            .cookie-content {
                max-width: 1200px;
                margin: 0 auto;
                padding: 10px;
            }
            
            .cookie-content h2 {
                margin-top: 0;
                font-size: 1.2rem;
            }
            
            .cookie-content p {
                margin-bottom: 15px;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .cookie-buttons {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .btn-text {
                background: none;
                border: none;
                color: #0066cc;
                cursor: pointer;
                text-decoration: underline;
                padding: 10px;
                font-weight: normal;
            }
            
            @media (max-width: 600px) {
                .cookie-buttons {
                    flex-direction: column;
                }
                
                .cookie-buttons button {
                    width: 100%;
                    margin-bottom: 5px;
                }
            }
            
            /* Cookie settings modal */
            .cookie-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1001;
            }
            
            .cookie-modal-content {
                background: white;
                padding: 20px;
                border-radius: 5px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            .cookie-modal h3 {
                margin-top: 0;
            }
            
            .cookie-toggle {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
            }
            
            .cookie-toggle:last-child {
                border-bottom: none;
            }
            
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 60px;
                height: 30px;
            }
            
            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
                border-radius: 34px;
            }
            
            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 22px;
                width: 22px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            
            input:checked + .toggle-slider {
                background-color: #0066cc;
            }
            
            input:checked + .toggle-slider:before {
                transform: translateX(30px);
            }
            
            .cookie-modal-buttons {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    /**
     * Records user consent preference
     * @param {string} level - The consent level ('all' or 'essential')
     */
    function setConsent(level) {
        localStorage.setItem('cookieConsent', level);
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        
        // If consent is 'all', initialize additional cookies/tracking here
        if (level === 'all') {
            // Initialize analytics, marketing cookies, etc.
            console.log('All cookies accepted. Analytics initialized.');
        } else {
            // Initialize only essential cookies
            console.log('Only essential cookies accepted.');
        }
    }
    
    /**
     * Shows detailed cookie settings modal
     */
    function showCookieSettings() {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'cookie-modal';
        
        // Modal content
        modal.innerHTML = `
            <div class="cookie-modal-content">
                <h3>Cookie Preferences</h3>
                <p>Manage your cookie preferences below. Essential cookies are necessary for the website to function and cannot be disabled.</p>
                
                <div class="cookie-toggle">
                    <div>
                        <h4>Essential Cookies</h4>
                        <p>Necessary for the website to function properly. Cannot be disabled.</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" checked disabled>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                
                <div class="cookie-toggle">
                    <div>
                        <h4>Analytics Cookies</h4>
                        <p>Help us understand how visitors interact with our website.</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="analytics-cookie">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                
                <div class="cookie-toggle">
                    <div>
                        <h4>Marketing Cookies</h4>
                        <p>Used to track visitors across websites to display relevant advertisements.</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="marketing-cookie">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                
                <div class="cookie-modal-buttons">
                    <button id="cookie-save" class="btn btn-primary">Save Preferences</button>
                    <button id="cookie-cancel" class="btn btn-secondary">Cancel</button>
                </div>
            </div>
        `;
        
        // Add modal to page
        document.body.appendChild(modal);
        
        // Add event listeners
        document.getElementById('cookie-save').addEventListener('click', function() {
            const analytics = document.getElementById('analytics-cookie').checked;
            const marketing = document.getElementById('marketing-cookie').checked;
            
            // If any optional cookies are enabled, consider it 'all'
            const consentLevel = (analytics || marketing) ? 'all' : 'essential';
            setConsent(consentLevel);
            
            // Store individual preferences
            localStorage.setItem('cookieAnalytics', analytics);
            localStorage.setItem('cookieMarketing', marketing);
            
            // Remove modal and banner
            document.body.removeChild(modal);
            const banner = document.querySelector('.cookie-banner');
            if (banner) {
                removeBanner(banner);
            }
        });
        
        document.getElementById('cookie-cancel').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Close modal when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    /**
     * Removes the cookie consent banner with animation
     * @param {HTMLElement} banner - The banner element to remove
     */
    function removeBanner(banner) {
        banner.style.transition = 'transform 0.5s ease-in-out';
        banner.style.transform = 'translateY(100%)';
        
        setTimeout(function() {
            document.body.removeChild(banner);
        }, 500);
    }
});
