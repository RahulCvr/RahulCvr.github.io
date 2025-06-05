// Data loader for YAML/JSON configuration
class DataLoader {
    constructor() {
        this.data = null;
    }

    async loadData() {
        try {
            // Determine root path for data loading
            const basePath = window.rootPath || '';
            
            // Try loading JSON first (more reliable for web)
            try {
                const jsonResponse = await fetch(`${basePath}data/config.json`);
                if (jsonResponse.ok) {
                    this.data = await jsonResponse.json();
                    console.log('Successfully loaded JSON configuration');
                    return this.data;
                }
            } catch (jsonError) {
                console.log('JSON config not available, trying YAML...');
            }

            // Fallback to YAML
            const response = await fetch(`${basePath}data/config.yaml`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const yamlText = await response.text();
            this.data = this.parseYAML(yamlText);
            console.log('Successfully loaded YAML configuration');
            return this.data;
        } catch (error) {
            console.error('Error loading data:', error);
            
            // Fallback to default data if both fail
            this.data = this.getDefaultData();
            console.log('Using fallback default data');
            return this.data;
        }
    }

    // Fallback default data in case external loading fails
    getDefaultData() {
        return {
            site: {
                title: "Rahul Cv",
                description: "Personal portfolio website",
                author: "Rahul Cv",
                profession: "Data Scientist",
                url: "https://rahulcvr.github.io"
            },
            social_links: [
                {
                    name: "GitHub",
                    url: "https://github.com/rahulcvr",
                    icon: "github"
                },
                {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/rahulreddycv",
                    icon: "linkedin"
                },
                {
                    name: "Email",
                    url: "mailto:rahulreddycv@gmail.com",
                    icon: "email"
                }
            ],
            experience: [],
            skills: [],
            projects: [],
            education: []
        };
    }

    // Simple YAML parser for our specific structure
    parseYAML(yamlText) {
        const lines = yamlText.split('\n');
        const result = {};
        let currentSection = null;
        let currentItem = null;
        let indentLevel = 0;

        for (let line of lines) {
            const trimmed = line.trim();
            
            // Skip empty lines and comments
            if (!trimmed || trimmed.startsWith('#')) continue;

            const indent = line.length - line.trimStart().length;
            
            // Top-level sections
            if (indent === 0 && trimmed.endsWith(':')) {
                currentSection = trimmed.slice(0, -1);
                result[currentSection] = {};
                currentItem = null;
                continue;
            }

            // Section properties
            if (indent === 2 && currentSection) {
                if (trimmed.startsWith('- ')) {
                    // Array item
                    if (!Array.isArray(result[currentSection])) {
                        result[currentSection] = [];
                    }
                    currentItem = {};
                    result[currentSection].push(currentItem);
                    
                    // Parse the first property of the array item
                    const firstProp = trimmed.slice(2);
                    if (firstProp.includes(':')) {
                        const [key, value] = firstProp.split(':').map(s => s.trim());
                        currentItem[key] = this.parseValue(value);
                    }
                } else if (trimmed.includes(':')) {
                    // Regular property
                    const [key, value] = trimmed.split(':').map(s => s.trim());
                    result[currentSection][key] = this.parseValue(value);
                }
                continue;
            }

            // Array item properties
            if (indent === 4 && currentItem && trimmed.includes(':')) {
                const [key, value] = trimmed.split(':').map(s => s.trim());
                currentItem[key] = this.parseValue(value);
                continue;
            }
        }

        return result;
    }

    parseValue(value) {
        if (!value || value === '""' || value === "''") return '';
        
        // Remove quotes
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
            return value.slice(1, -1);
        }
        
        // Parse numbers
        if (!isNaN(value) && !isNaN(parseFloat(value))) {
            return parseFloat(value);
        }
        
        return value;
    }

    getSocialLinks() {
        return this.data?.social_links || [];
    }

    getSpotlight() {
        return this.data?.spotlight || {
            show: false,
            title: '',
            content: ''
        };
    }

    getExperience() {
        return this.data?.experience || [];
    }

    getSkills() {
        return this.data?.skills || [];
    }

    getProjects() {
        return this.data?.projects || [];
    }

    getEducation() {
        return this.data?.education || [];
    }

    getSiteInfo() {
        return this.data?.site || {};
    }

    // Utility method to validate links
    isValidUrl(url) {
        if (!url) return false;
        try {
            new URL(url);
            return true;
        } catch {
            // Check for relative URLs or email links
            return url.startsWith('/') || url.startsWith('mailto:') || url.startsWith('assets/');
        }
    }

    // Get social links with validation
    getValidatedSocialLinks() {
        const links = this.getSocialLinks();
        return links.filter(link => this.isValidUrl(link.url));
    }
}

// Global data loader instance
window.dataLoader = new DataLoader(); 