// document.addEventListener('DOMContentLoaded', function() {
//     const testimonialCards = document.querySelectorAll('.testimonial-card');
//     const prevButton = document.querySelector('.prev-testimonial');
//     const nextButton = document.querySelector('.next-testimonial');
//     const dotsContainer = document.querySelector('.testimonial-dots');
    
//     let currentIndex = 0;
    
//     // Create dots for testimonials
//     testimonialCards.forEach((_, index) => {
//         const dot = document.createElement('div');
//         dot.classList.add('testimonial-dot');
//         if (index === 0) dot.classList.add('active');
        
//         dot.addEventListener('click', () => {
//             showTestimonial(index);
//         });
        
//         dotsContainer.appendChild(dot);
//     });
    
//     const dots = document.querySelectorAll('.testimonial-dot');
    
//     // Function to show a specific testimonial
//     function showTestimonial(index) {
//         // Hide all testimonials
//         testimonialCards.forEach(card => {
//             card.classList.remove('active');
//             card.style.transform = 'translateX(100px)';
//             card.style.opacity = '0';
//         });
        
//         // Update dots
//         dots.forEach((dot, i) => {
//             dot.classList.toggle('active', i === index);
//         });
        
//         // Show the selected testimonial
//         testimonialCards[index].classList.add('active');
//         currentIndex = index;
//     }
    
//     // Previous button event
//     prevButton.addEventListener('click', () => {
//         currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
//         showTestimonial(currentIndex);
//     });
    
//     // Next button event
//     nextButton.addEventListener('click', () => {
//         currentIndex = (currentIndex + 1) % testimonialCards.length;
//         showTestimonial(currentIndex);
//     });
    
//     // Auto-rotate testimonials
//     let testimonialInterval = setInterval(() => {
//         currentIndex = (currentIndex + 1) % testimonialCards.length;
//         showTestimonial(currentIndex);
//     }, 7000);
    
//     // Pause auto-rotation when hovering over testimonials
//     const testimonialSlider = document.querySelector('.testimonial-slider');
    
//     testimonialSlider.addEventListener('mouseenter', () => {
//         clearInterval(testimonialInterval);
//     });
    
//     testimonialSlider.addEventListener('mouseleave', () => {
//         testimonialInterval = setInterval(() => {
//             currentIndex = (currentIndex + 1) % testimonialCards.length;
//             showTestimonial(currentIndex);
//         }, 7000);
//     });
    
//     // Swipe support for mobile
//     let touchStartX = 0;
//     let touchEndX = 0;
    
//     testimonialSlider.addEventListener('touchstart', (e) => {
//         touchStartX = e.changedTouches[0].screenX;
//     });
    
//     testimonialSlider.addEventListener('touchend', (e) => {
//         touchEndX = e.changedTouches[0].screenX;
//         handleSwipe();
//     });
    
//     function handleSwipe() {
//         // Detect swipe direction
//         if (touchEndX < touchStartX - 50) {
//             // Swipe left - show next
//             currentIndex = (currentIndex + 1) % testimonialCards.length;
//             showTestimonial(currentIndex);
//         }
        
//         if (touchEndX > touchStartX + 50) {
//             // Swipe right - show previous
//             currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
//             showTestimonial(currentIndex);
//         }
//     }
// });






