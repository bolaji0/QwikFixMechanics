document.addEventListener('DOMContentLoaded', function() {
    const typingTextElement = document.getElementById('typing-text');
    const cursorElement = document.querySelector('.cursor');
    
    // Text phrases to be typed
    const phrases = [
        "We come to you...",
        "Fix your car fast...",
        "Professional service...",
        "Save time and money...",
        "Drive safe again..."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isWaiting) {
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                typeEffect();
            }, 1500); // Wait at the end of phrase
            return;
        }
        
        if (isDeleting) {
            // Deleting characters
            charIndex--;
            typingTextElement.textContent = currentPhrase.substring(0, charIndex);
            
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            
            setTimeout(typeEffect, 50); // Deleting speed
        } else {
            // Typing characters
            typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentPhrase.length) {
                isWaiting = true;
            }
            
            setTimeout(typeEffect, charIndex === currentPhrase.length ? 0 : 100); // Typing speed
        }
    }
    
    // Start the typing effect
    typeEffect();
    
    // Cursor blinking is handled by CSS
});
