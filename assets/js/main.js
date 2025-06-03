// Main application controller
class PortfolioApp {
    constructor() {
        this.data = null;
        this.isLoaded = false;
        
        this.init();
    }

    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Load data
            this.data = await window.dataLoader.loadData();
            
            if (!this.data) {
                console.error('Failed to load portfolio data');
                return;
            }

            // Render content
            this.renderContent();
            
            // Setup interactions
            this.setupInteractions();
            
            // Mark as loaded
            this.isLoaded = true;
            
            console.log('Portfolio loaded successfully');
            
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }

    renderContent() {
        this.renderSocialLinks();
        this.renderExperience();
        this.renderSkills();
        this.renderProjects();
        this.renderEducation();
        this.updateFooter();
    }

    renderSocialLinks() {
        const socialContainer = document.getElementById('social-links');
        const footerSocialContainer = document.getElementById('footer-social-links');
        
        if (!socialContainer || !footerSocialContainer) return;

        const socialLinks = window.dataLoader.getSocialLinks();
        
        const socialHTML = socialLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
               class="social-link">
                ${link.name}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5">
                    <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
            </a>
        `).join('');

        socialContainer.innerHTML = socialHTML;
        footerSocialContainer.innerHTML = socialHTML;
    }

    renderExperience() {
        const experienceContainer = document.getElementById('experience-list');
        if (!experienceContainer) return;

        const experience = window.dataLoader.getExperience();
        
        const experienceHTML = experience.map(job => {
            // Generate action buttons HTML
            let actionsHTML = '';
            
            if (job.learn_more) {
                actionsHTML += `
                    <a href="${job.learn_more}" class="project-btn">
                        Learn More
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3">
                            <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </a>
                `;
            }
            
            if (job.link && job.link.trim() && job.link.trim() !== '') {
                actionsHTML += `
                    <a href="${job.link}" target="_blank" rel="noopener noreferrer" class="project-btn">
                        Visit Website
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3">
                            <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </a>
                `;
            }
            
            return `
                <div class="project-card mb-4">
                    <div class="project-content" style="padding: 16px;">
                        <table class="experience-card">
                            <tr>
                                ${job.image ? `
                                <td style="width: 40px; vertical-align: top; padding-right: 16px;">
                                    <div class="logo-container">
                                        <img src="${job.image}" alt="${job.company} logo">
                                    </div>
                                </td>
                                ` : ''}
                                <td style="vertical-align: top;">
                                    <div>
                                        <div style="margin-bottom: 8px;">
                                            <h4 class="font-medium text-base md:text-lg dark:text-zinc-100" style="display: inline-block; margin: 0 8px 0 0;">${job.title}</h4>
                                            <br>
                                            <span class="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">${job.company}</span>
                                        </div>
                                        ${job.description ? `<p class="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mt-2">${job.description}</p>` : ''}
                                        
                                        ${actionsHTML ? `<div class="experience-actions mt-3 flex flex-wrap gap-2">${actionsHTML}</div>` : ''}
                                    </div>
                                </td>
                                <td class="date-column">
                                    <p class="text-zinc-600 dark:text-zinc-400 text-sm md:text-base">${job.start} - ${job.end}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            `;
        }).join('');

        experienceContainer.innerHTML = experienceHTML;
    }

    renderSkills() {
        const skillsContainer = document.getElementById('skills-list');
        if (!skillsContainer) return;

        const skills = window.dataLoader.getSkills();
        
        // Sort skills by order
        const sortedSkills = skills.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        const skillsHTML = sortedSkills.map(skillCategory => {
            const skillList = skillCategory.skills.split(', ').map(skill => skill.trim());
            
            return `
                <div class="project-card mb-4">
                    <div class="project-content" style="padding: 16px;">
                        <h4 style="font-weight: 500; margin-bottom: 16px;" class="text-zinc-900 dark:text-zinc-100">
                            ${skillCategory.title}
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            ${skillList.map(skill => `
                                <span class="skill-tag">${skill}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        skillsContainer.innerHTML = skillsHTML;
    }

    renderProjects() {
        const projectsContainer = document.getElementById('projects-grid');
        if (!projectsContainer) return;

        const projects = window.dataLoader.getProjects();
        
        const projectsHTML = projects.map(project => `
            <div class="space-y-2">
                <div class="px-4 py-4">
                    <a
                        class="project-link font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                        href="${project.link || '#'}"
                        target="_blank"
                    >
                        ${project.name}
                    </a>
                    <p class="text-base text-zinc-600 dark:text-zinc-400">
                        ${project.description}
                    </p>
                    <div class="project-actions mt-3 flex flex-wrap gap-2">
                        ${(project.link && project.link.trim() && project.link !== '#') ? `
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-btn">
                            Live Demo
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3">
                                <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        ` : ''}
                        ${project.code_link ? `
                        <a href="${project.code_link}" target="_blank" rel="noopener noreferrer" class="project-btn">
                            Code
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3">
                                <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        projectsContainer.innerHTML = projectsHTML;
    }

    renderEducation() {
        const educationContainer = document.getElementById('education-list');
        if (!educationContainer) return;

        const education = window.dataLoader.getEducation();
        
        const educationHTML = education.map(edu => `
            <div class="project-card mb-4">
                <div class="project-content" style="padding: 16px;">
                    <table class="education-card">
                        <tr>
                            ${edu.image ? `
                            <td style="width: 40px; vertical-align: top; padding-right: 16px;">
                                <div class="logo-container">
                                    <img src="${edu.image}" alt="${edu.institution} logo">
                                </div>
                            </td>
                            ` : ''}
                            <td style="vertical-align: top;">
                                <div>
                                    <h3 style="font-weight: 600; margin-bottom: 4px;" class="text-zinc-900 dark:text-zinc-100">
                                        ${edu.degree}
                                    </h3>
                                    <p style="margin-bottom: 4px; font-size: 16px;" class="text-zinc-600 dark:text-zinc-300">
                                        ${edu.institution}
                                    </p>
                                    <p style="font-size: 14px;" class="text-zinc-500 dark:text-zinc-400">
                                        ${edu.gpa}
                                    </p>
                                </div>
                            </td>
                            <td class="date-column">
                                <p style="font-size: 16px; font-weight: 500;" class="text-zinc-600 dark:text-zinc-400">
                                    ${edu.start} - ${edu.end}
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        `).join('');

        educationContainer.innerHTML = educationHTML;
    }

    updateFooter() {
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    }

    setupInteractions() {
        // Refresh animations after content is loaded
        setTimeout(() => {
            if (window.animationManager) {
                window.animationManager.refreshSpotlightEffects();
            }
        }, 100);
    }

    // Public methods for external access
    getData() {
        return this.data;
    }

    isReady() {
        return this.isLoaded;
    }

    refresh() {
        if (this.isLoaded) {
            this.renderContent();
            this.setupInteractions();
        }
    }
}

// Initialize the portfolio application
window.portfolioApp = new PortfolioApp();

// Export for external use
window.PortfolioApp = PortfolioApp; 