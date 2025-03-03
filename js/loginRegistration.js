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