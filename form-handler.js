/**
 * MechanicBoston.com - Form Handler
 * Handles form submissions and lead processing
 */

document.addEventListener('DOMContentLoaded', function() {
    const leadForm = document.getElementById('quick-quote-form');
    
    if (leadForm) {
        leadForm.addEventListener('submit', handleFormSubmit);
    }
    
    /**
     * Handles the form submission
     * @param {Event} event - The form submission event
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        
        // Show loading state
        const submitButton = leadForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';
        
        // Collect form data
        const formData = new FormData(leadForm);
        const leadData = {};
        
        // Convert FormData to object
        for (const [key, value] of formData.entries()) {
            leadData[key] = value;
        }
        
        // Add timestamp and source info
        leadData.timestamp = new Date().toISOString();
        leadData.source = 'homepage_form';
        leadData.utmSource = getUrlParameter('utm_source');
        leadData.utmMedium = getUrlParameter('utm_medium');
        leadData.utmCampaign = getUrlParameter('utm_campaign');
        
        // For MVP: Store in localStorage and simulate API call
        storeLeadLocally(leadData);
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            showThankYouMessage();
            
            // Reset form state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            
            // Optionally, send data to a real endpoint when available
            // sendLeadToAPI(leadData);
        }, 1500);
    }
    
    /**
     * Store lead data in localStorage for MVP testing
     * @param {Object} leadData - Collected lead information
     */
    function storeLeadLocally(leadData) {
        // Get existing leads or initialize empty array
        let storedLeads = localStorage.getItem('mechanicBoston_leads');
        const leads = storedLeads ? JSON.parse(storedLeads) : [];
        
        // Add new lead
        leads.push(leadData);
        
        // Save back to localStorage
        localStorage.setItem('mechanicBoston_leads', JSON.stringify(leads));
        
        // For development: log the lead
        console.log('Lead captured:', leadData);
    }
    
    /**
     * Replace form with thank you message
     */
    function showThankYouMessage() {
        // Create thank you message
        const thankYouDiv = document.createElement('div');
        thankYouDiv.className = 'thank-you-message';
        thankYouDiv.innerHTML = `
            <h2>Thank You!</h2>
            <p>Your request has been submitted. We're connecting you with top mechanics in Boston who specialize in your repair needs.</p>
            <p>You'll receive quotes via email and text message shortly.</p>
            <p class="emergency-note">For immediate assistance, call <a href="tel:6175551234">(617) 555-1234</a></p>
        `;
        
        // Replace form with thank you message
        const formContainer = leadForm.closest('.lead-form-container');
        formContainer.innerHTML = '';
        formContainer.appendChild(thankYouDiv);
        
        // Scroll to thank you message
        thankYouDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    /**
     * For production: Send lead data to API endpoint
     * @param {Object} leadData - Collected lead information
     */
    function sendLeadToAPI(leadData) {
        // This would be implemented when API is available
        fetch('https://api.mechanicboston.com/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Lead successfully submitted to API:', data);
        })
        .catch(error => {
            console.error('Error submitting lead:', error);
            // Fall back to local storage if API fails
            storeLeadLocally(leadData);
        });
    }
    
    /**
     * Get URL parameter value
     * @param {string} name - Parameter name to retrieve
     * @return {string} Parameter value
     */
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
});
