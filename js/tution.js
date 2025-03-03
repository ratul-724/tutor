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