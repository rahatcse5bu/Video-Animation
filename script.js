let currentScroll = 0;
const maxScroll = 4400; // Adjust this based on the number of text elements
const scrollStep = 200; // Each text fades in/out in 200px scroll steps
const delayText = 30; // Delay before the next text starts to fade in
const stayDuration = 60; // Duration each text stays fully visible

const handleScrollText = (scrollAmount) => {
    // Adjust the current scroll position
    currentScroll += scrollAmount;
    
    // Clamp the current scroll position between 0 and maxScroll
    currentScroll = Math.max(0, Math.min(currentScroll, maxScroll));
    // console.log('currentScroll amount: ', currentScroll)
    
    // Get the text elements
    const textElements = [
        document.querySelector('.fade-text-1'),
        document.querySelector('.fade-text-2'),
        document.querySelector('.fade-text-3'),
        document.querySelector('.fade-text-4'),
        document.querySelector('.fade-text-5'),
        document.querySelector('.fade-text-6'),
        document.querySelector('.fade-text-7'),
        document.querySelector('.fade-text-8')
    ];

    textElements.forEach((element, index) => {
        const startFadeIn = index * (scrollStep + delayText + stayDuration);
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


//  Video Section

document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('myVideo');
    const splash = document.querySelector('.splash');


    // Function to check if video is fully loaded
    function isVideoFullyLoaded() {
        return video.readyState === 4; // readyState 4 means 'HAVE_ENOUGH_DATA'
    }

    // Hide splash screen when video is fully loaded
    function hideSplashScreen() {
        // Wait a bit to ensure smooth transition
        setTimeout(function() {
            splash.classList.add('hide');
        }, 500); // Adjust timing as needed
    }

    // Check video load status on various events
    video.addEventListener('loadedmetadata', function() {
        if (isVideoFullyLoaded()) {
            hideSplashScreen();
        }
    });

    video.addEventListener('canplaythrough', function() {
        if (isVideoFullyLoaded()) {
            hideSplashScreen();
        }
    });

    // Fallback: If events don't work, use time-based check
    setTimeout(function() {
        if (isVideoFullyLoaded()) {
            hideSplashScreen();
        }
    }, 5000); // Wait up to 5 seconds

    

});

     
const intro = document.querySelector(".intro");
const video = intro.querySelector("video");
// After Intro Section
// const section = document.querySelector("section");
// const end = section.querySelector("h1");
// Scroll Magic
const controller = new ScrollMagic.Controller();
// Scenes
// Video Animation
let videoScene = new ScrollMagic.Scene({
	duration: 12000,
	triggerElement: intro,
	triggerHook: 0,
})
	.setPin(intro)
	.addTo(controller);

// Video Animation
let accelerationRate = 0.1;
let scrollPosition = 0;
let delay = 0;
// Add touch event listeners for mobile
document.addEventListener("touchmove", handleScroll);
document.addEventListener("touchstart", handleScroll);

function handleScroll(e) {
    let scrollY = window.scrollY || window.pageYOffset;
    scrollPosition = scrollY / 1000;
}
// Getting the scroll position from the event and convert it into seconds
videoScene.on("update", (e) => {
	const currentScrollPos = e.scrollPos / 1000;
    const deltaY = currentScrollPos - scrollPosition;
    scrollPosition = currentScrollPos;
    handleScrollText(deltaY * 100)
    // console.log('deltaY: ', deltaY);
});
// Delay catches upto the scrollPosition at accelerationRate
setInterval(() => {
	delay += (scrollPosition - delay) * accelerationRate;
	video.currentTime = delay;
}, 33.3);
// 33.3 will be the interval of each frame
// Video is in 30fps, so 1 sec = 30 frames => 1000 milliseconds = 30 frames
// That implies 33.3 milliseconds would be great for each frame

let lastPosition = -1;
videoScene.on("progress", function (e) {
    if (window.innerWidth > 768) { // Assuming mobile devices are under 768px width
     //   alert("Hey Mobile");
        let scrollPosition = e.progress * video.duration;
        if (lastPosition !== scrollPosition) {
            video.currentTime = scrollPosition;
            lastPosition = scrollPosition;
        }
    }
});
// document.addEventListener("DOMContentLoaded", function() {
//     const video = document.getElementById('myVideo');
//     const splash = document.querySelector('.splash');

//     function hideSplashScreen() {
//         setTimeout(function() {
//             splash.classList.add('hide');
//         }, 500);
//     }

//     video.addEventListener('canplaythrough', function() {
//         hideSplashScreen();
//     });

//     setTimeout(function() {
//         if (video.readyState >= 4) {
//             hideSplashScreen();
//         }
//     }, 10000); // Fallback timeout
// });


document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('myVideo');
    const controller = new ScrollMagic.Controller();

    const breakpoints = [0, 500, 1000, 1500, 2000, 2500]; // These should match the scroll positions you want to link to video segments.
    const videoTimes = [0, 5, 10, 15, 20, 25]; // Times in seconds where each video segment starts.

    breakpoints.forEach((breakpoint, index) => {
        new ScrollMagic.Scene({
            triggerElement: document.body,
            offset: breakpoint,
            duration: 50 // Small duration means the change happens right at the breakpoint.
        })
        .on('enter', () => {
            video.currentTime = videoTimes[index];
            video.play(); // Consider auto-pausing after a brief moment if continuous play isn't needed.
        })
        .addTo(controller);
    });

    // Optional: Pause video playback if the user scrolls past the last breakpoint.
    new ScrollMagic.Scene({
        triggerElement: document.body,
        offset: breakpoints[breakpoints.length - 1] + 100,
        duration: 50
    })
    .on('leave', () => {
        video.pause();
    })
    .addTo(controller);
});
