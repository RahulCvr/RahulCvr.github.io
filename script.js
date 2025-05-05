// JavaScript for the portfolio site

// Toggle variable for project filters
const ENABLE_PROJECT_FILTERS = 0;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio site loaded');

    // Toggle functionality for work descriptions
    const workItems = document.querySelectorAll('.work-item .work-title, .work-item .work-company');
    workItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const workItem = e.target.closest('.work-item');
            const description = workItem.querySelector('.work-description');
            const tags = workItem.querySelector('.tag-list');

            if (description) {
                const isVisible = description.classList.toggle('visible');
                workItem.classList.toggle('active');

                if (tags) {
                    if (isVisible) {
                        tags.classList.add('visible');
                    } else {
                        tags.classList.remove('visible');
                    }
                }
            }
        });
    });

    // Toggle functionality for project descriptions
    const projectItems = document.querySelectorAll('.project-item .project-title, .project-item .project-tagline');
    projectItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const projectItem = e.target.closest('.project-item');
            const description = projectItem.querySelector('.project-description');
            const tags = projectItem.querySelector('.tag-list');

            if (description) {
                const isVisible = description.classList.toggle('visible');
                projectItem.classList.toggle('active');

                if (tags) {
                    if (isVisible) {
                        tags.classList.add('visible');
                    } else {
                        tags.classList.remove('visible');
                    }
                }
            }
        });
    });

    // Role filtering functionality
    const addRoleFilters = () => {
        const projectsList = document.querySelector('.project-list');
        if (!projectsList) return;

        const uniqueRoles = new Set();
        document.querySelectorAll('.project-item').forEach(item => {
            const roles = item.getAttribute('data-roles');
            if (roles) {
                roles.split(',').forEach(role => uniqueRoles.add(role.trim()));
            }
        });

        const filterContainer = document.createElement('div');
        filterContainer.className = 'role-filters';

        // Add "All" filter
        const allFilter = document.createElement('button');
        allFilter.className = 'role-filter active';
        allFilter.textContent = 'All';
        allFilter.onclick = () => filterProjects('all');
        filterContainer.appendChild(allFilter);

        // Add role-specific filters
        uniqueRoles.forEach(role => {
            const button = document.createElement('button');
            button.className = 'role-filter';
            button.textContent = role.replace('-', ' ');
            button.onclick = () => filterProjects(role);
            filterContainer.appendChild(button);
        });

        // Insert filters before projects list
        projectsList.parentNode.insertBefore(filterContainer, projectsList);
    };

    const filterProjects = (selectedRole) => {
        // Update active state of filter buttons
        document.querySelectorAll('.role-filter').forEach(btn => {
            const btnText = btn.textContent.toLowerCase().replace(/\s+/g, '-');
            btn.classList.toggle('active', btnText === selectedRole || 
                (selectedRole === 'all' && btn.textContent === 'All'));
        });

        // Show/hide projects based on selected role
        document.querySelectorAll('.project-item').forEach(project => {
            if (selectedRole === 'all') {
                project.style.display = '';
                return;
            }
            const roles = project.getAttribute('data-roles').split(',').map(r => r.trim());
            project.style.display = roles.includes(selectedRole.replace(' ', '-')) ? '' : 'none';
        });
    };

    // Initialize role filters if on projects page and filters are enabled
    if (document.querySelector('.project-list') && ENABLE_PROJECT_FILTERS === 1) {
        addRoleFilters();
    }
});