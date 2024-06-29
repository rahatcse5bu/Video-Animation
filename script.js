//  Intro Section

document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('myVideo');
    const splash = document.querySelector('.splash');
// Add touch event listeners for mobile
document.addEventListener("touchmove", handleScroll);
document.addEventListener("touchstart", handleScroll);

function handleScroll(e) {
    let scrollY = window.scrollY || window.pageYOffset;
    scrollPosition = scrollY / 1000;
}

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
// Getting the scroll position from the event and convert it into seconds
videoScene.on("update", (e) => {
	scrollPosition = e.scrollPos / 1000;
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
videoScene.on("progress", function(e) {
    if (window.innerWidth > 768) { // Assuming mobile devices are under 768px width
        alert("Hey Mobile");
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
