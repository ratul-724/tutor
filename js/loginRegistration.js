// code select tutor or student start
document.addEventListener("DOMContentLoaded", function () {
    function selectOption(element, role) {
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        element.classList.add('selected');

        document.getElementById("studentOrtutor").textContent = role;
    }

    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function () {
            const role = this.textContent.includes("Student") ? "Student" : "Tutor";
            selectOption(this, role);
        });
    });
});
// code for select tutor or student end


// password hide and show start 
document.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", function () {
        const passwordInput = this.previousElementSibling; 
        const eyeIcon = this.querySelector("i");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
        } else {
            passwordInput.type = "password"; 
            eyeIcon.classList.replace("fa-eye", "fa-eye-slash"); 
        }
    });
});
// password hide and show end 


