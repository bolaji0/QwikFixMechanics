document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle elements
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Toggle sidebar collapse on desktop
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
    
    // Toggle mobile sidebar visibility
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Service cards expand/collapse
    const serviceExpandButtons = document.querySelectorAll('.service-expand');
    
    serviceExpandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.service-card');
            const details = card.querySelector('.service-details');
            
            details.classList.toggle('active');
            button.textContent = details.classList.contains('active') ? 'Show Less' : 'Learn More';
        });
    });
    
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // If the sidebar is active (mobile), close it
            if (sidebar.classList.contains('active') && window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Handle nav link active state on scroll
    window.addEventListener('scroll', debounce(function() {
        let scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                const currentId = '#' + section.getAttribute('id');
                
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === currentId) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    }, 100));
    
    // Handle "Other" service option in form
    const serviceSelect = document.getElementById('service');
    const otherServiceGroup = document.getElementById('other-service-group');
    
    if (serviceSelect && otherServiceGroup) {
        serviceSelect.addEventListener('change', () => {
            if (serviceSelect.value === 'other') {
                otherServiceGroup.style.display = 'block';
            } else {
                otherServiceGroup.style.display = 'none';
            }
        });
    }
    
    // Initialize modals
    initializeModals();
    
    // Initialize show current date in date picker
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        
        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;
        
        const formattedToday = yyyy + '-' + mm + '-' + dd;
        dateInput.setAttribute('min', formattedToday);
    }
    
    // Handle form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(bookingForm)) {
                // Simulate form submission
                showToast({
                    title: 'Booking Successful!',
                    message: 'We will contact you shortly to confirm your appointment.',
                    type: 'success'
                });
                
                // Reset form
                bookingForm.reset();
                otherServiceGroup.style.display = 'none';
                
                // Scroll to tracker section
                const trackerSection = document.getElementById('tracker');
                if (trackerSection) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: trackerSection.offsetTop - 20,
                            behavior: 'smooth'
                        });
                        
                        // Update tracker status
                        updateTrackerStatus();
                    }, 1000);
                }
            }
        });
    }
});

// Modal functionality
function initializeModals() {
    const modalContainer = document.getElementById('modal-container');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    
    // Close modal when clicked outside
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            closeModal();
        }
    });
    
    // Close modal with close button
    modalClose.addEventListener('click', closeModal);
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modalContainer.classList.remove('active');
        setTimeout(() => {
            modalContent.innerHTML = '';
        }, 300);
    }
    
    // Open modal with specific content
    window.openModal = function(content) {
        modalContent.innerHTML = content;
        modalContainer.classList.add('active');
    };
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
