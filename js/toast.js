document.addEventListener('DOMContentLoaded', function() {
    const toastContainer = document.getElementById('toast-container');
    
    // Function to create and show toast notification
    window.showToast = function({ title, message, type = 'info', duration = 5000 }) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Create toast content
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${getIconByType(type)}"></i>
            </div>
            <div class="toast-content">
                <h4 class="toast-title">${title}</h4>
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
            <div class="toast-progress"></div>
        `;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Progress bar animation
        const progressBar = toast.querySelector('.toast-progress');
        progressBar.style.width = '100%';
        progressBar.style.transition = `width ${duration}ms linear`;
        
        // Show toast with animation
        setTimeout(() => {
            toast.classList.add('active');
            progressBar.style.width = '0%';
        }, 10);
        
        // Set up close button
        const closeButton = toast.querySelector('.toast-close');
        closeButton.addEventListener('click', () => {
            removeToast(toast);
        });
        
        // Auto-remove after duration
        const timeoutId = setTimeout(() => {
            removeToast(toast);
        }, duration);
        
        // Store timeout ID for potential early removal
        toast.dataset.timeoutId = timeoutId;
        
        // Return toast element
        return toast;
    };
    
    // Helper function to remove toast with animation
    function removeToast(toast) {
        // Clear the auto-remove timeout
        clearTimeout(parseInt(toast.dataset.timeoutId));
        
        // Remove active class to trigger exit animation
        toast.classList.remove('active');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            toast.remove();
        }, 300);
    }
    
    // Helper function to get appropriate icon based on toast type
    function getIconByType(type) {
        switch(type) {
            case 'success':
                return 'fa-check-circle';
            case 'error':
                return 'fa-exclamation-circle';
            case 'warning':
                return 'fa-exclamation-triangle';
            case 'info':
            default:
                return 'fa-info-circle';
        }
    }
});
