// You'll need JavaScript to toggle between sections when clicking the sidebar items
document.addEventListener('DOMContentLoaded', function() {
    const sections = {
        'Teacher': 'tutorContainer',
        'Cocker': 'cockerContainer',
        'Electrician': 'electricianContainer',
        'Painter': 'painterContainer',
        'Farmer': 'farmerContainer'
    };
    
    Object.keys(sections).forEach(id => {
        document.getElementById(id).addEventListener('click', function() {
            // Hide all sections
            Object.values(sections).forEach(sectionId => {
                document.getElementById(sectionId).classList.add('d-none');
            });
            
            // Show selected section
            document.getElementById(sections[id]).classList.remove('d-none');
            
            // Update active state in sidebar
            document.querySelectorAll('.hire-category-item').forEach(item => {
                item.classList.remove('active-category');
            });
            this.classList.add('active-category');
        });
    });
});

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
