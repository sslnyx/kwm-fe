// Centralized project data for the KWM website
// Update this file to add, remove, or modify projects across all components

export interface Project {
    name: string;
    slug: string;
    location: string;
    units: string;
    status: "featured" | "upcoming" | "completed";
    isFeatured?: boolean;
}

export const projects: Project[] = [
    {
        name: "McGill",
        slug: "mcgill",
        location: "McGill & Renfrew, Vancouver",
        units: "Five 3-Bedroom Multiplexes",
        status: "featured",
        isFeatured: true,
    },
    {
        name: "Skeena",
        slug: "skeena",
        location: "Skeena & Grandview, Vancouver",
        units: "Four 3-Bedroom Multiplexes",
        status: "upcoming",
    },
    {
        name: "Oakridge",
        slug: "oakridge",
        location: "Oak & W 45th, Vancouver",
        units: "Six 3-Bedroom Multiplexes",
        status: "upcoming",
    },
];

// Helper functions
export const getFeaturedProjects = () =>
    projects.filter((p) => p.status === "featured");

export const getUpcomingProjects = () =>
    projects.filter((p) => p.status === "upcoming");

export const getAllProjects = () => projects;

export const getProjectBySlug = (slug: string) =>
    projects.find((p) => p.slug === slug);
