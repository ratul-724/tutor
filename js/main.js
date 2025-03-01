// code for header start
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    // Set active class on click
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active")); // Remove active from all
            this.classList.add("active"); // Add active to clicked link
        });
    });

    // Preserve active state when refreshing the page
    const currentPage = window.location.pathname.split("/").pop();
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});
// code for header end





// code for login  section start
document.getElementById("studentSelection").addEventListener("change", function () {
    if (this.checked) {
        document.getElementById("tutorSelection").checked = false;
        document.getElementById("studentOrtutor").textContent = "Student";
    } else {
        document.getElementById("studentOrtutor").textContent = "....";
    }
});

document.getElementById("tutorSelection").addEventListener("change", function () {
    if (this.checked) {
        document.getElementById("studentSelection").checked = false;
        document.getElementById("studentOrtutor").textContent = "Tutor";
    } else {
        document.getElementById("studentOrtutor").textContent = "....";
    }
});
// code for login section end


// code for tution Board section start 
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("tutionPostBtn").addEventListener("click", function () {
        const tutionPost = document.getElementById("tutionPost");

        if (tutionPost) {
            tutionPost.classList.toggle("d-none");
        } else {
            console.error("Element with ID 'tutionPost' not found.");
        }
    });
});

// code for tution Board section end 