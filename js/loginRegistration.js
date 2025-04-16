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
    const studentRegistration = document.getElementById('studentRegistration');
    const tutorRegistration = document.getElementById('tutorRegistration');
    const userTypeInput = document.getElementById('userType');

    if (type === 'student') {
        studentOption.classList.add('active');
        tutorOption.classList.remove('active');
        studentRegistration.style.display = 'block';
        tutorRegistration.style.display = 'none';
        userTypeInput.value = 'student';
        // Set progress to 50% when student is selected
        updateProgressBar(50);
    } else {
        studentOption.classList.remove('active');
        tutorOption.classList.add('active');
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

// Navigation Functions
function nextSection(currentId, nextId) {
    document.getElementById(currentId).classList.remove('active');
    document.getElementById(nextId).classList.add('active');
    
    // Student flow
    if (currentId === 'studentBasicInfo' && nextId === 'studentPreview') {
        updateProgressBar(100);
        generateStudentPreview();
    }
    // Tutor flow
    else if (nextId.includes('Education')) {
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
    
    // Student flow
    if (currentId === 'studentPreview' && prevId === 'studentBasicInfo') {
        updateProgressBar(50);
    }
    // Tutor flow
    else if (prevId.includes('Basic')) {
        updateProgressBar(33);
    } else if (prevId.includes('Education')) {
        updateProgressBar(66);
    } else if (prevId.includes('Teaching')) {
        updateProgressBar(75);
    }
}

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
    let html = '<div class="list-group">';
    
    html += `
        <div class="preview-item">
            <strong>Name:</strong> ${document.getElementById('tutorName').value}
        </div>
        <div class="preview-item">
            <strong>Phone:</strong> ${document.getElementById('tutorPhone').value}
        </div>
        <div class="preview-item">
            <strong>Degree:</strong> ${document.getElementById('tutorDegree').value || 'Not provided'}
        </div>
        <div class="preview-item">
            <strong>University:</strong> ${document.getElementById('tutorUniversity').value || 'Not provided'}
        </div>
        <div class="preview-item">
            <strong>Experience:</strong> ${document.getElementById('tutorExperience').options[document.getElementById('tutorExperience').selectedIndex].text || 'Not provided'}
        </div>
    `;
    
    // Add selected classes
    const selectedClasses = [];
    for (let i = 1; i <= 10; i++) {
        if (document.getElementById('tutorClass' + i).checked) {
            selectedClasses.push('Class ' + i);
        }
    }
    html += `<div class="preview-item"><strong>Preferred Classes:</strong> ${selectedClasses.join(', ') || 'None selected'}</div>`;
    
    // Add selected subjects
    const selectedSubjects = [];
    const subjectIds = ['Math', 'English', 'Bangla', 'Physics', 'Chemistry', 'Biology'];
    subjectIds.forEach(subject => {
        if (document.getElementById('tutor' + subject).checked) {
            selectedSubjects.push(subject);
        }
    });
    html += `<div class="preview-item"><strong>Subjects:</strong> ${selectedSubjects.join(', ') || 'None selected'}</div>`;
    
    html += '</div>';
    previewContent.innerHTML = html;
}

// Password Toggle
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.parentNode.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        }
    });
});

// Form Submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate passwords match
    const userType = document.getElementById('userType').value;
    const password = document.getElementById(userType + 'Password').value;
    const confirmPassword = document.getElementById(userType + 'ConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showResult(false, 'Passwords do not match!');
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
        // Add other tutor-specific fields
    }
    
    // In a real app, you would send this to your backend
    console.log('User data:', user);
    showResult(true, 'Registration successful! Redirecting to login...');
    
    // Simulate redirect
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});

// Show Result Modal
function showResult(isSuccess, message) {
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