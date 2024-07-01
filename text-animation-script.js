/*let currentScroll = 0;
const maxScroll = 4400; // Adjust this based on the number of text elements
const scrollStep = 200; // Each text fades in/out in 200px scroll steps
const delay = 300; // Delay before the next text starts to fade in
const stayDuration = 60; // Duration each text stays fully visible

const handleScroll = (scrollAmount) => {
    // Adjust the current scroll position
    currentScroll += scrollAmount;
    
    // Clamp the current scroll position between 0 and maxScroll
    currentScroll = Math.max(0, Math.min(currentScroll, maxScroll));
    
    // Get the text elements
    const textElements = [
        document.querySelector('.fade-text'),
        document.querySelector('.fade-text-2'),
        document.querySelector('.fade-text-3'),
        document.querySelector('.fade-text-4'),
        document.querySelector('.fade-text-5'),
        document.querySelector('.fade-text-6'),
        document.querySelector('.fade-text-7'),
        document.querySelector('.fade-text-8')
    ];

    textElements.forEach((element, index) => {
        const startFadeIn = index * (scrollStep + delay + stayDuration);
        const endFadeIn = startFadeIn + scrollStep;
        const startFadeOut = endFadeIn + stayDuration; // Delay before starting to fade out
        const endFadeOut = startFadeOut + scrollStep;

        if (currentScroll >= startFadeIn && currentScroll < endFadeIn) {
            element.style.opacity = (currentScroll - startFadeIn) / scrollStep;
            element.style.zIndex = 10; // Bring the element to the front
        } else if (currentScroll >= endFadeIn && currentScroll < startFadeOut) {
            element.style.opacity = 2; // Keep the element fully visible
            element.style.zIndex = 10; // Keep the element in the front
        } else if (currentScroll >= startFadeOut && currentScroll < endFadeOut) {
            element.style.opacity = 1 - ((currentScroll - startFadeOut) / scrollStep);
            element.style.zIndex = 10; // Keep the element in the front
        } else {
            element.style.opacity = 0;
            element.style.zIndex = 0; // Send the element to the back
        }
    });
};

document.addEventListener('wheel', function(event) {
    // Prevent the default scroll behavior
    event.preventDefault();
    handleScroll(event.deltaY);
});

// Variables to track touch events
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchmove', function(event) {
    touchEndY = event.touches[0].clientY;
    const touchDeltaY = touchStartY - touchEndY;
    touchStartY = touchEndY; // Reset for continuous scrolling
    handleScroll(touchDeltaY);
});
*/