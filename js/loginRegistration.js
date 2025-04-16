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

// registration section code start here
// User Type Selection
function selectUserType(type) {
    const studentOption = document.getElementById('studentOption');
    const tutorOption = document.getElementById('tutorOption');
    const studentTypeImgBorder = document.getElementById('studentTypeImgBorder');
    const tutorTypeImgBorder = document.getElementById('tutorTypeImgBorder');
    const studentRegistration = document.getElementById('studentRegistration');
    const tutorRegistration = document.getElementById('tutorRegistration');
    const userTypeInput = document.getElementById('userType');

    if (type === 'student') {
        studentOption.classList.add('active');
        tutorOption.classList.remove('active');
        studentTypeImgBorder.style.border = '3px solid  #0fc16e';
        tutorTypeImgBorder.style.border = 'none';
        studentRegistration.style.display = 'block';
        tutorRegistration.style.display = 'none';
        userTypeInput.value = 'student';
        // Set progress to 50% when student is selected
        updateProgressBar(50);
    } else {
        tutorOption.classList.add('active');
        studentOption.classList.remove('active');
        studentTypeImgBorder.style.border = 'none';
        tutorTypeImgBorder.style.border = '3px solid  #0fc16e';
        studentRegistration.style.display = 'none';
        tutorRegistration.style.display = 'block';
        userTypeInput.value = 'tutor';
        // Set progress to 33% when tutor is selected (default)
        updateProgressBar(33);
    }
    
    // Reset to first section
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(type + 'BasicInfo').classList.add('active');
}

// Validate Form Fields
function validateSection(sectionId) {
    const section = document.getElementById(sectionId);
    const inputs = section.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid'); // Add Bootstrap's invalid class for styling
        } else {
            input.classList.remove('is-invalid');
        }
    });
    return isValid;
}

// Navigation Functions
function nextSection(currentId, nextId) {
    // Validate current section before proceeding
    if (!validateSection(currentId)) {
        submitForm(false, 'Please fill out all required fields before proceeding.');
        return;
    }

    document.getElementById(currentId).classList.remove('active');
    document.getElementById(nextId).classList.add('active');

    // Update progress bar based on the section
    if (currentId === 'studentBasicInfo' && nextId === 'studentPreview') {
        updateProgressBar(100);
        generateStudentPreview();
    } else if (nextId.includes('Education')) {
        updateProgressBar(66);
    } else if (nextId.includes('Teaching')) {
        updateProgressBar(75);
    } else if (nextId.includes('Preview')) {
        updateProgressBar(100);
        generateTutorPreview();
    }
}

function prevSection(currentId, prevId) {
    document.getElementById(currentId).classList.remove('active');
    document.getElementById(prevId).classList.add('active');

    // Update progress bar based on the section
    if (currentId === 'studentPreview' && prevId === 'studentBasicInfo') {
        updateProgressBar(50);
    } else if (prevId.includes('Basic')) {
        updateProgressBar(33);
    } else if (prevId.includes('Education')) {
        updateProgressBar(66);
    } else if (prevId.includes('Teaching')) {
        updateProgressBar(75);
    }
}

// Update Progress Bar
function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
}

// Generate Student Preview
function generateStudentPreview() {
    const previewContent = document.getElementById('studentPreviewContent');
    let html = '<div class="list-group">';
    
    html += `
        <div class="preview-item">
            <strong>Name:</strong> ${document.getElementById('studentName').value}
        </div>
        <div class="preview-item">
            <strong>Phone:</strong> ${document.getElementById('studentPhone').value}
        </div>
        <div class="preview-item">
            <strong>Email:</strong> ${document.getElementById('studentEmail').value || 'Not provided'}
        </div>
        <div class="preview-item">
            <strong>Gender:</strong> ${document.getElementById('studentGender').options[document.getElementById('studentGender').selectedIndex].text}
        </div>
        <div class="preview-item">
            <strong>Blood Group:</strong> ${document.getElementById('studentBlood').value || 'Not provided'}
        </div>
    `;
    
    html += '</div>';
    previewContent.innerHTML = html;
}

// Generate Tutor Preview
function generateTutorPreview() {
    const previewContent = document.getElementById('tutorPreviewContent');
    if (!previewContent) {
        console.error('Element with ID "tutorPreviewContent" not found.');
        return;
    }

    let html = '<div class="list-group">';
    const tutorName = document.getElementById('tutorName').value || 'Not provided';
    const tutorPhone = document.getElementById('tutorPhone').value || 'Not provided';
    const tutorEmail = document.getElementById('tutorEmail').value || 'Not provided';
    const tutorGender = document.getElementById('tutorGender').value || 'Not provided';
    const tutorDOB = document.getElementById('tutorDOB').value || 'Not provided';
    const tutorMarital = document.getElementById('tutorMarital').value || 'Not provided';
    const tutorBlood = document.getElementById('tutorBlood').value || 'Not provided';
    const tutorDegree = document.getElementById('tutorDegree').value || 'Not provided';
    const tutorInstitute = document.getElementById('tutorInstitute').value || 'Not provided';
    const tutorSubject = document.getElementById('tutorSubject').value || 'Not provided';
    const tutorResult = document.getElementById('tutorResult').value || 'Not provided';
    const tutorExperience = document.getElementById('tutorExperience').value || 'Not provided';
    const tutorBackground = document.getElementById('tutorBackground').value || 'Not provided';
    const tutorBio = document.getElementById('tutorBio').value || 'Not provided';
    const tutorSchedule = document.getElementById('tutorSchedule').value || 'Not provided';
    const tutorPlatform = document.getElementById('tutorPlatform').value || 'Not provided';
    const tutorSalary = document.getElementById('tutorSalary').value || 'Not provided';

    html += `
        <div class="preview-item">
            <strong>Name :</strong> ${tutorName}
        </div>
        <div class="preview-item">
            <strong>Phone :</strong> ${tutorPhone}
        </div>
        <div class="preview-item">
            <strong>Email :</strong> ${tutorEmail}
        </div>
        <div class="preview-item">
            <strong>Gender :</strong> ${tutorGender}
        </div>
        <div class="preview-item">
            <strong>Date of birth :</strong> ${tutorDOB}
        </div>
        <div class="preview-item">
            <strong>Marital Status :</strong> ${tutorMarital}
        </div>
        <div class="preview-item">
            <strong>Blood Group :</strong> ${tutorBlood}
        </div>
        <div class="preview-item">
            <strong>Heighest Degree Name :</strong> ${tutorDegree}
        </div>
        <div class="preview-item">
            <strong>Institute Name :</strong> ${tutorInstitute}
        </div>
        <div class="preview-item">
            <strong>Mejor Subject :</strong> ${tutorSubject}
        </div>
        <div class="preview-item">
            <strong>Result :</strong> ${tutorResult}
        </div>
        <div class="preview-item">
            <strong>Experience :</strong> ${tutorExperience}
        </div>
        <div class="preview-item">
            <strong>Tutor Background :</strong> ${tutorBackground}
        </div>
        <div class="preview-item">
            <strong>Bio :</strong> ${tutorBio}
        </div>
        <div class="preview-item">
            <strong>Teaching time :</strong> ${tutorSchedule}
        </div>
        <div class="preview-item">
            <strong>Platform :</strong> ${tutorPlatform}
        </div>
        <div class="preview-item">
            <strong>Salary :</strong> ${tutorSalary}
        </div>
    `;
    html += '</div>';
    previewContent.innerHTML = html;
}

// Form Submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate the last section before submission
    const userType = document.getElementById('userType').value;
    const lastSectionId = userType === 'student' ? 'studentPreview' : 'tutorPreview';

    if (!validateSection(lastSectionId)) {
        submitForm(false, 'Please fill out all required fields before submitting.');
        return;
    }

    // Validate passwords match
    const password = document.getElementById(userType + 'Password').value;
    const confirmPassword = document.getElementById(userType + 'ConfirmPassword').value;

    if (password !== confirmPassword) {
        submitForm(false, 'Passwords do not match!');
        return;
    }

    // Create user object
    const user = {
        userType,
        name: document.getElementById(userType + 'Name').value,
        phone: document.getElementById(userType + 'Phone').value,
        password,
        registeredAt: new Date().toISOString()
    };

    // Add additional fields
    if (userType === 'student') {
        user.email = document.getElementById('studentEmail').value;
        user.gender = document.getElementById('studentGender').value;
        user.bloodGroup = document.getElementById('studentBlood').value;
    } else {
        user.degree = document.getElementById('tutorDegree').value;
        user.university = document.getElementById('tutorUniversity').value;
        user.experience = document.getElementById('tutorExperience').value;
        user.subjects = [];
    }

    // Simulate backend submission
    console.log('User data:', user);
    submitForm(true, 'Registration successful! Redirecting to login...');

    // Simulate redirect
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});

// Show Result Modal
function submitForm(isSuccess, message) {
    const modalTitle = document.getElementById('resultModalTitle');
    const modalBody = document.getElementById('resultModalBody');
    const modal = new bootstrap.Modal(document.getElementById('resultModal'));

    if (isSuccess) {
        modalTitle.innerHTML = '<i class="fas fa-check-circle text-success me-2"></i> Success';
        modalBody.innerHTML = `
            <div class="text-center">
                <i class="fas fa-check-circle text-success fa-5x mb-3"></i>
                <h4>${message}</h4>
            </div>
        `;
    } else {
        modalTitle.innerHTML = '<i class="fas fa-times-circle text-danger me-2"></i> Error';
        modalBody.innerHTML = `
            <div class="text-center">
                <i class="fas fa-times-circle text-danger fa-5x mb-3"></i>
                <h4>${message}</h4>
            </div>
        `;
    }

    modal.show();
}
// registration section code end here