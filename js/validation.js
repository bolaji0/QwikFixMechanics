document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    window.validateForm = function(form) {
        let isValid = true;
        
        // Reset all error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(errorMsg => {
            errorMsg.style.display = 'none';
        });
        
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
        });
        
        // Validate name (at least 2 words)
        const nameInput = form.querySelector('#name');
        if (nameInput) {
            const nameValue = nameInput.value.trim();
            if (nameValue === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else if (nameValue.split(' ').filter(word => word.length > 0).length < 2) {
                showError(nameInput, 'Please enter your full name');
                isValid = false;
            }
        }
        
        // Validate email
        const emailInput = form.querySelector('#email');
        if (emailInput) {
            const emailValue = emailInput.value.trim();
            if (emailValue === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Validate phone
        const phoneInput = form.querySelector('#phone');
        if (phoneInput) {
            const phoneValue = phoneInput.value.trim();
            if (phoneValue === '') {
                showError(phoneInput, 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(phoneValue)) {
                showError(phoneInput, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Validate service selection
        const serviceSelect = form.querySelector('#service');
        if (serviceSelect) {
            if (serviceSelect.value === '') {
                showError(serviceSelect, 'Please select a service');
                isValid = false;
            } else if (serviceSelect.value === 'other') {
                const otherServiceInput = form.querySelector('#other-service');
                if (otherServiceInput && otherServiceInput.value.trim() === '') {
                    showError(otherServiceInput, 'Please specify the service needed');
                    isValid = false;
                }
            }
        }
        
        // Validate date
        const dateInput = form.querySelector('#date');
        if (dateInput) {
            if (dateInput.value === '') {
                showError(dateInput, 'Please select a date');
                isValid = false;
            } else {
                const selectedDate = new Date(dateInput.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    showError(dateInput, 'Date cannot be in the past');
                    isValid = false;
                }
            }
        }
        
        // Validate time
        const timeSelect = form.querySelector('#time');
        if (timeSelect && timeSelect.value === '') {
            showError(timeSelect, 'Please select a time slot');
            isValid = false;
        }
        
        // Validate address
        const addressInput = form.querySelector('#address');
        if (addressInput && addressInput.value.trim() === '') {
            showError(addressInput, 'Service location is required');
            isValid = false;
        }
        
        // Validate vehicle information
        const vehicleInput = form.querySelector('#vehicle');
        if (vehicleInput && vehicleInput.value.trim() === '') {
            showError(vehicleInput, 'Vehicle information is required');
            isValid = false;
        }
        
        return isValid;
    };
    
    // Helper function to show error message
    function showError(inputElement, message) {
        const formGroup = inputElement.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to validate phone
    function isValidPhone(phone) {
        // Accept formats like (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
        const phoneRegex = /^[\d\s().-]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
    
    // Real-time validation for form fields
    const formInputs = document.querySelectorAll('#booking-form input, #booking-form select, #booking-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Validate individual field on blur
            validateField(this);
        });
        
        if (input.type !== 'checkbox' && input.type !== 'radio') {
            input.addEventListener('input', function() {
                // Remove error styling while typing
                const formGroup = this.closest('.form-group');
                if (formGroup.classList.contains('error')) {
                    formGroup.classList.remove('error');
                    const errorElement = formGroup.querySelector('.error-message');
                    errorElement.style.display = 'none';
                }
            });
        }
    });
    
    // Function to validate an individual field
    function validateField(field) {
        const form = field.closest('form');
        
        // Reset error for this field
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.error-message');
        errorElement.style.display = 'none';
        
        // Specific validation based on field ID
        switch (field.id) {
            case 'name':
                const nameValue = field.value.trim();
                if (nameValue === '') {
                    showError(field, 'Name is required');
                } else if (nameValue.split(' ').filter(word => word.length > 0).length < 2) {
                    showError(field, 'Please enter your full name');
                }
                break;
                
            case 'email':
                const emailValue = field.value.trim();
                if (emailValue === '') {
                    showError(field, 'Email is required');
                } else if (!isValidEmail(emailValue)) {
                    showError(field, 'Please enter a valid email address');
                }
                break;
                
            case 'phone':
                const phoneValue = field.value.trim();
                if (phoneValue === '') {
                    showError(field, 'Phone number is required');
                } else if (!isValidPhone(phoneValue)) {
                    showError(field, 'Please enter a valid phone number');
                }
                break;
                
            case 'service':
                if (field.value === '') {
                    showError(field, 'Please select a service');
                }
                break;
                
            case 'other-service':
                if (document.getElementById('service').value === 'other' && field.value.trim() === '') {
                    showError(field, 'Please specify the service needed');
                }
                break;
                
            case 'date':
                if (field.value === '') {
                    showError(field, 'Please select a date');
                } else {
                    const selectedDate = new Date(field.value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (selectedDate < today) {
                        showError(field, 'Date cannot be in the past');
                    }
                }
                break;
                
            case 'time':
                if (field.value === '') {
                    showError(field, 'Please select a time slot');
                }
                break;
                
            case 'address':
                if (field.value.trim() === '') {
                    showError(field, 'Service location is required');
                }
                break;
                
            case 'vehicle':
                if (field.value.trim() === '') {
                    showError(field, 'Vehicle information is required');
                }
                break;
        }
    }
});
