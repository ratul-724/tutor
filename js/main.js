// code for header start
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });
    const currentPage = window.location.pathname.split("/").pop();
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});
// code for header end

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