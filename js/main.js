// code for header start
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    // Get the current page's filename
    const currentPage = window.location.pathname.split("/").pop();

    // Loop through each nav link
    navLinks.forEach(link => {
        // Check if the href matches the current page
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});
// code for header end


// code for modal start here 
// YouTube video modal functionality
let videoModal = null;
let youtubePlayer = null;

function openVideoModal() {
    // Initialize modal if not already done
    if (!videoModal) {
        videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    }
    // Show the modal
    videoModal.show();
    // Load YouTube API if not already loaded
    if (!document.getElementById('youtubeAPI')) {
        const tag = document.createElement('script');
        tag.id = 'youtubeAPI';
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}
// This function will be called by YouTube API when ready
function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('youtubeVideo', {
        events: {
            'onReady': onPlayerReady,
        }
    });
}
function onPlayerReady(event) {
    // Optional: Autoplay when modal opens
    event.target.playVideo();
}
// Pause video when modal is closed
document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
    if (youtubePlayer && typeof youtubePlayer.pauseVideo === 'function') {
        youtubePlayer.pauseVideo();
    }
});
// Close modal when clicking outside (optional)
document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        videoModal.hide();
    }
});
// code for modal end here 


// counter in home strt
document.addEventListener("DOMContentLoaded", function () {
    function startCounter(element, target) {
        let count = 0;
        let speed = target / 100; // Adjust speed as needed

        let counter = setInterval(() => {
            count += Math.ceil(speed);
            if (count >= target) {
                count = target;
                clearInterval(counter);
            }
            element.innerText = count;
        }, 20);
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let number = entry.target;
                let targetValue = parseInt(number.getAttribute("data-target"));
                startCounter(number, targetValue);
                observer.unobserve(number);
            }
        });
    }

    let observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

    document.querySelectorAll(".counter").forEach(counter => {
        counter.setAttribute("data-target", counter.innerText);
        counter.innerText = "0"; 
        observer.observe(counter);
    });
});

// counter in home end

