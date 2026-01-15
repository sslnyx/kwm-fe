// Centralized company data for the KWM website
// Update this file to modify company information across all components

export const company = {
    name: "Kentwood Homes",
    brandName: "Kentwood Homes | Multiplex",

    // Contact Information
    phone: "778.308.9911",
    phoneLink: "tel:7783089911",
    email: "info@kentwoodhomes.ca",
    emailLink: "mailto:info@kentwoodhomes.ca",
    website: "www.kentwoodhomes.ca",
    websiteLink: "https://www.kentwoodhomes.ca",

    // Address
    address: {
        line1: "1030 - 8477 Bridgeport Road",
        line2: "Richmond, BC Canada V6X 0S8",
        full: "1030 - 8477 Bridgeport Road, Richmond, BC Canada V6X 0S8",
        mapLink: "https://www.google.com/maps/search/?api=1&query=1030+-+8477+Bridgeport+Road,+Richmond,+BC+V6X+0S8+Canada",
    },

    // Social Media (add as needed)
    social: {
        // instagram: "https://instagram.com/kentwoodhomes",
        // facebook: "https://facebook.com/kentwoodhomes",
        // linkedin: "https://linkedin.com/company/kentwoodhomes",
    },
};

// Helper for formatted phone display
export const getFormattedPhone = () => company.phone;

// Helper for getting full contact info
export const getContactInfo = () => ({
    phone: company.phone,
    phoneLink: company.phoneLink,
    email: company.email,
    emailLink: company.emailLink,
    address: company.address,
});
