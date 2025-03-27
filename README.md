# MechanicBoston.com - Lead Generation Website

A lead generation website for connecting Boston drivers with qualified auto repair services.

## Project Overview

MechanicBoston.com is a simple HTML/CSS/JavaScript website designed to capture and qualify leads for auto repair services in the Boston area. The site features:

- Responsive design that works on all devices
- Multi-step lead capture forms
- Service-specific landing pages
- Basic client-side form validation
- Lead storage in localStorage (MVP version)

## Project Structure

```
mechanicboston-mvp/
├── index.html              # Homepage with featured services + lead form
├── services/               # 3 core services
│   ├── brake-repair.html   # Brake repair service page
│   ├── transmission.html   # Transmission service page
│   └── emergency-towing.html  # Emergency towing page
├── about.html              # About us page
├── contact.html            # Main lead capture form
├── privacy-policy.html     # Privacy policy
├── css/
│   ├── styles.css          # Main styles
│   └── mobile.css          # Mobile responsiveness
├── js/
│   ├── main.js             # Core functionality
│   └── form-handler.js     # Form submission logic
├── assets/                 # Images and icons (not included in repo)
│   ├── images/
│   │   ├── hero.jpg
│   │   ├── service-1.jpg
│   │   └── logo.svg
│   └── icons/
│       └── phone.svg
└── README.md               # This file
```

## Deployment Instructions

### Hosting Requirements

- Basic web hosting with HTML/CSS/JS support
- No server-side languages required for MVP
- No database needed for MVP version

### Setup Steps

1. **Domain Configuration**:
   - Point mechanicboston.com to your hosting provider
   - Ensure HTTPS is enabled for better SEO and security

2. **File Upload**:
   - Upload all files maintaining the directory structure
   - Ensure file permissions are set correctly (typically 644 for files, 755 for directories)

3. **Asset Preparation**:
   - Create/obtain the following assets before deployment:
     - Logo in SVG format (logo.svg and logo-white.svg for dark backgrounds)
     - Hero image (1200 x 800px recommended)
     - Service images (at least 3 images, 800 x 600px)
     - Team photos (if using real people rather than stock photos)
     - Icons for services and features (SVG preferred)

4. **Form Configuration**:
   - For MVP: Forms save to localStorage by default
   - For production: Modify form-handler.js to send data to your preferred endpoint:
     - Email service (e.g., Formspree)
     - CRM integration (e.g., HubSpot, Pipedrive)
     - Custom backend (when ready to upgrade from MVP)

5. **Google Setup**:
   - Set up Google Analytics (add code to header of all pages)
   - Configure Google Search Console
   - Create Google Business Profile

### Testing Before Launch

1. **Cross-browser Testing**:
   - Test on Chrome, Firefox, Safari, and Edge
   - Check mobile responsiveness on iOS and Android devices

2. **Form Testing**:
   - Submit test leads through all forms
   - Verify validation works properly
   - Check form progression through multi-step forms

3. **Link Verification**:
   - Ensure all internal links work properly
   - Check external links (e.g., social media, phone numbers)

4. **Performance Check**:
   - Optimize images (compress all JPGs and PNGs)
   - Run Lighthouse test for performance scoring

## Future Enhancements (Post-MVP)

- Backend integration for lead processing
- Real-time shop availability calendar
- User accounts for returning customers
- Reviews and ratings system
- Blog/content section for SEO growth
- Appointment scheduling functionality
- Email marketing integration
- Neighborhood-specific landing pages

## Contact

For support or questions about this project:
- Email: admin@mechanicboston.com
- Phone: (617) 555-1234
