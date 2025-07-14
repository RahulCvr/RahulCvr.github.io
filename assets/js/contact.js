// Contact form functionality
class ContactForm {
    constructor() {
        this.form = null;
        this.submitBtn = null;
        this.submitText = null;
        this.submitSpinner = null;
        this.formMessages = null;
        this.successMessage = null;
        this.errorMessage = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.submitText = document.getElementById('submit-text');
        this.submitSpinner = document.getElementById('submit-spinner');
        this.formMessages = document.getElementById('form-messages');
        this.successMessage = document.getElementById('success-message');
        this.errorMessage = document.getElementById('error-message');
        
        if (!this.form) {
            console.warn('Contact form not found');
            return;
        }

        // Add form submit handler
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Add real-time validation
        this.setupValidation();
    }

    setupValidation() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Add input event listeners for real-time validation
        nameInput.addEventListener('input', () => this.validateName());
        emailInput.addEventListener('input', () => this.validateEmail());
        messageInput.addEventListener('input', () => this.validateMessage());

        // Add blur event listeners for validation on focus out
        nameInput.addEventListener('blur', () => this.validateName());
        emailInput.addEventListener('blur', () => this.validateEmail());
        messageInput.addEventListener('blur', () => this.validateMessage());
    }

    validateName() {
        const nameInput = document.getElementById('name');
        const name = nameInput.value.trim();
        const errorDiv = nameInput.parentElement.querySelector('.error-message');
        
        if (name.length < 2) {
            this.showFieldError(errorDiv, 'Name must be at least 2 characters long');
            return false;
        }
        
        this.hideFieldError(errorDiv);
        return true;
    }

    validateEmail() {
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();
        const errorDiv = emailInput.parentElement.querySelector('.error-message');
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showFieldError(errorDiv, 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showFieldError(errorDiv, 'Please enter a valid email address');
            return false;
        }
        
        this.hideFieldError(errorDiv);
        return true;
    }

    validateMessage() {
        const messageInput = document.getElementById('message');
        const message = messageInput.value.trim();
        const errorDiv = messageInput.parentElement.querySelector('.error-message');
        
        if (message.length < 10) {
            this.showFieldError(errorDiv, 'Message must be at least 10 characters long');
            return false;
        }
        
        this.hideFieldError(errorDiv);
        return true;
    }

    showFieldError(errorDiv, message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    hideFieldError(errorDiv) {
        errorDiv.classList.add('hidden');
    }

    validateForm() {
        const nameValid = this.validateName();
        const emailValid = this.validateEmail();
        const messageValid = this.validateMessage();
        
        return nameValid && emailValid && messageValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Hide any previous messages
        this.hideMessages();
        
        // Validate form
        if (!this.validateForm()) {
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Submit form data
            const formData = new FormData(this.form);
            
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showSuccessMessage();
                this.resetForm();
                
                // Track form submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'Contact',
                        event_label: 'Contact Form Submission'
                    });
                }
            } else {
                const errorData = await response.json();
                this.showErrorMessage(errorData.errors ? errorData.errors.map(e => e.message).join(', ') : 'Please try again later.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitText.textContent = 'Sending...';
            this.submitSpinner.classList.add('show');
        } else {
            this.submitBtn.disabled = false;
            this.submitText.textContent = 'Send Message';
            this.submitSpinner.classList.remove('show');
        }
    }

    showSuccessMessage() {
        this.formMessages.classList.remove('hidden');
        this.successMessage.classList.remove('hidden');
        this.errorMessage.classList.add('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideMessages();
        }, 5000);
    }

    showErrorMessage(message = 'Something went wrong. Please try again or contact me directly.') {
        this.formMessages.classList.remove('hidden');
        this.errorMessage.classList.remove('hidden');
        this.successMessage.classList.add('hidden');
        
        // Update error message if provided
        const errorText = this.errorMessage.querySelector('div:last-child');
        if (errorText) {
            errorText.textContent = message;
        }
    }

    hideMessages() {
        this.formMessages.classList.add('hidden');
        this.successMessage.classList.add('hidden');
        this.errorMessage.classList.add('hidden');
    }

    resetForm() {
        this.form.reset();
        
        // Hide any field errors
        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.classList.add('hidden'));
    }
}

// Initialize contact form
window.contactForm = new ContactForm(); 