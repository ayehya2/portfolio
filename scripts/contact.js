class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.btnText = this.submitBtn?.querySelector('.btn-text');
        this.btnLoading = document.getElementById('btn-loading');
        this.feedback = document.getElementById('form-feedback');
        
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        // Add real-time validation
        this.initValidation();
    }
    
    initValidation() {
        const inputs = this.form?.querySelectorAll('.form-input, .form-textarea');
        
        inputs?.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        this.setLoading(true);
        
        try {
            const formData = this.getFormData();
            
            // Check honeypot
            if (formData.honeypot) {
                throw new Error('Bot detected');
            }
            
            // Simulate email sending (replace with actual email service)
            await this.sendEmail(formData);
            
            this.showSuccess('Message sent successfully! I\'ll get back to you soon.');
            this.form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('Failed to send message. Please try again or contact me directly.');
        } finally {
            this.setLoading(false);
        }
    }
    
    async sendEmail(formData) {
        // This is a placeholder for actual email service integration
        // You can integrate with services like EmailJS, Formspree, Netlify Forms, etc.
        
        // Example with EmailJS (uncomment and configure):
        /*
        return emailjs.send(
            'your_service_id',
            'your_template_id',
            {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            },
            'your_public_key'
        );
        */
        
        // Simulated delay for demonstration
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() < 0.9) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('.form-input[required], .form-textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        const name = input.name;
        const errorElement = document.getElementById(`${name}-error`);
        
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(name)} is required.`;
        }
        
        // Email validation
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Minimum length validation
        else if (name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }
        
        // Display error
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
        
        // Update input styling
        if (isValid) {
            input.classList.remove('error');
        } else {
            input.classList.add('error');
        }
        
        return isValid;
    }
    
    clearError(input) {
        const name = input.name;
        const errorElement = document.getElementById(`${name}-error`);
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        input.classList.remove('error');
    }
    
    getFieldLabel(name) {
        const labels = {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message'
        };
        
        return labels[name] || name;
    }
    
    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }
    
    setLoading(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('loading');
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
        }
    }
    
    showSuccess(message) {
        this.feedback.textContent = message;
        this.feedback.className = 'form-feedback success';
        
        setTimeout(() => {
            this.feedback.className = 'form-feedback';
            this.feedback.textContent = '';
        }, 5000);
    }
    
    showError(message) {
        this.feedback.textContent = message;
        this.feedback.className = 'form-feedback error';
        
        setTimeout(() => {
            this.feedback.className = 'form-feedback';
            this.feedback.textContent = '';
        }, 5000);
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contactForm = new ContactForm();
});