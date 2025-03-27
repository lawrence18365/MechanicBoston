/**
 * MechanicBoston.com - JSON-LD Schema Implementation
 * Enhances SEO with structured data for search engines
 */

// Base Organization schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MechanicBoston",
  "url": "https://mechanicboston.com",
  "logo": "https://mechanicboston.com/assets/images/logo.svg",
  "image": "https://mechanicboston.com/assets/images/hero.jpg",
  "description": "Connecting Boston drivers with trusted mechanics for auto repair, transmission service, brake repair, and emergency towing.",
  "telephone": "+16175551234",
  "email": "info@mechanicboston.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Auto Lane",
    "addressLocality": "Boston",
    "addressRegion": "MA",
    "postalCode": "02108",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "42.3601",
    "longitude": "-71.0589"
  },
  "areaServed": {
    "@type": "City",
    "name": "Boston"
  },
  "sameAs": [
    "https://www.facebook.com/mechanicboston",
    "https://www.instagram.com/mechanicboston",
    "https://twitter.com/mechanicboston"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:30",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "$$"
};

// Service schema for auto repair
const autoRepairService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Auto Repair Service",
  "provider": {
    "@type": "LocalBusiness",
    "name": "MechanicBoston"
  },
  "areaServed": {
    "@type": "City",
    "name": "Boston"
  },
  "description": "Connect with trusted Boston mechanics for all types of auto repair services at competitive prices.",
  "offers": {
    "@type": "Offer",
    "price": "45.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

// FAQ schema for common questions
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is there a fee to use MechanicBoston?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, our quote service is completely free to use. We're paid by our partner shops, not customers."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly will I receive quotes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most customers receive their first quotes within 1 hour during business hours, and all quotes within 24 hours."
      }
    },
    {
      "@type": "Question",
      "name": "How do you select mechanics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All mechanics in our network are fully vetted, including verification of proper licensing, insurance, and certification. We also regularly check customer feedback and maintain strict quality standards."
      }
    },
    {
      "@type": "Question",
      "name": "What areas do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve all neighborhoods in Boston including Allston, Back Bay, Beacon Hill, Brighton, Charlestown, Dorchester, East Boston, Fenway, Hyde Park, Jamaica Plain, Mattapan, Mission Hill, North End, Roslindale, Roxbury, South Boston, South End, and West Roxbury."
      }
    },
    {
      "@type": "Question",
      "name": "Do repairs come with a warranty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all services booked through MechanicBoston's network come with a minimum 90-day warranty on parts and labor. Many shops offer longer warranties for specific services."
      }
    },
    {
      "@type": "Question",
      "name": "What if I'm not satisfied with the service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Customer satisfaction is our priority. If you're not satisfied with the service, contact us immediately and we'll work with you and the shop to resolve any issues under our satisfaction guarantee."
      }
    }
  ]
};

// Review schema for testimonials
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "MechanicBoston"
  },
  "author": {
    "@type": "Person",
    "name": "Michael D."
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "datePublished": "2025-02-10",
  "reviewBody": "My Honda Accord was slipping gears and I was afraid I'd need a complete rebuild. MechanicBoston connected me with a specialist who diagnosed a simple solenoid issue. Saved me over $2,000 and my car shifts perfectly now!"
};

// Insert schema into page
document.addEventListener('DOMContentLoaded', function() {
  // Determine which schema to use based on the current page
  let currentSchema;
  const path = window.location.pathname;
  
  if (path === '/' || path === '/index.html') {
    currentSchema = organizationSchema;
  } else if (path.includes('/contact.html')) {
    currentSchema = { ...organizationSchema, ...faqSchema };
  } else if (path.includes('/services/')) {
    currentSchema = autoRepairService;
  } else {
    currentSchema = organizationSchema;
  }
  
  // Create script element and append to head
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(currentSchema);
  document.head.appendChild(script);
  
  // Add review schema to testimonial sections
  if (document.querySelector('.testimonials')) {
    const reviewScript = document.createElement('script');
    reviewScript.type = 'application/ld+json';
    reviewScript.text = JSON.stringify(reviewSchema);
    document.head.appendChild(reviewScript);
  }
});
