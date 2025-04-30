document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const tutorListings = document.getElementById('tutorListings');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const subjectFilter = document.getElementById('subjectFilter');
    const locationFilter = document.getElementById('locationFilter');
    const genderFilter = document.getElementById('genderFilter');
    const priceFilter = document.getElementById('priceFilter');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const noResults = document.getElementById('noResults');
    const resultCount = document.getElementById('resultCount');
    
    // Sample tutor data
    const tutors = [
        {
            id: 1,
            imgSrc: "assets/icons/user.png",
            name: "Dr. Ahmed Rahman",
            subject: "math",
            subjects: ["Mathematics", "Calculus", "Statistics"],
            location: "dhaka",
            areas: ["Mirpur", "Dhanmondi", "Gulshan"],
            price: 800,
            experience: "8 years",
            education: "PhD in Mathematics, DU",
            gender: "Male",
            bio: "Specialized in advanced mathematics with 8 years of teaching experience at university level.",
            contact: "ahmed.math@example.com"
        },
        {
            id: 2,
            imgSrc: "assets/icons/user.png",
            name: "Fatima Khan",
            subject: "science",
            subjects: ["Physics", "Chemistry"],
            location: "chittagong",
            areas: ["Agrabad", "Nasirabad"],
            price: 600,
            experience: "5 years",
            education: "MSc in Physics, CU",
            gender: "Female",
            bio: "Passionate about making science fun and understandable for students of all levels.",
            contact: "fatima.science@example.com"
        },
        {
            id: 3,
            imgSrc: "assets/icons/user.png",
            name: "John Smith",
            subject: "english",
            subjects: ["English Literature", "IELTS Preparation"],
            location: "dhaka",
            areas: ["Banani", "Uttara"],
            price: 1200,
            experience: "10 years",
            education: "MA in English, Oxford",
            gender: "Male",
            bio: "Native English speaker with extensive experience in test preparation and literature.",
            contact: "john.english@example.com"
        },
        {
            id: 4,
            imgSrc: "assets/icons/user.png",
            name: "Nusrat Jahan",
            subject: "history",
            subjects: ["World History", "Bangladesh History"],
            location: "sylhet",
            areas: ["Zindabazar", "Upashahar"],
            price: 500,
            experience: "3 years",
            education: "BA in History, SU",
            gender: "Female",
            bio: "Makes history come alive with engaging stories and contextual learning.",
            contact: "nusrat.history@example.com"
        },
        {
            id: 5,
            imgSrc: "assets/icons/user.png",
            name: "Arif Hossain",
            subject: "programming",
            subjects: ["Python", "JavaScript", "Web Development"],
            location: "dhaka",
            areas: ["Mohammadpur", "Farmgate"],
            price: 1500,
            experience: "6 years",
            education: "BSc in CSE, BUET",
            gender: "Male",
            bio: "Professional developer who loves teaching programming fundamentals and practical skills.",
            contact: "arif.code@example.com"
        }
    ]; 
    
    // Current filter state
    let currentSearch = '';
    let currentSubject = 'all';
    let currentLocation = 'all';
    let currentGender = 'both';
    let currentPrice = 'all';
    
    // Initialize the page
    loadTutors();
    
    // Event listeners
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    subjectFilter.addEventListener('change', function() {
        currentSubject = this.value;
        loadTutors();
    });
    
    locationFilter.addEventListener('change', function() {
        currentLocation = this.value;
        loadTutors();
    });
    genderFilter.addEventListener('change', function() {
        currentGender = this.value;
        loadTutors();
    });
    
    priceFilter.addEventListener('change', function() {
        currentPrice = this.value;
        loadTutors();
    });
    
    // Functions
    function handleSearch() {
        currentSearch = searchInput.value.trim().toLowerCase();
        loadTutors();
    }
    
    function loadTutors() {
        // Show loading state
        tutorListings.innerHTML = '';
        loadingSpinner.classList.remove('d-none');
        noResults.classList.add('d-none');
    
        // Simulate API delay
        setTimeout(() => {
            // Filter tutors
            let filteredTutors = tutors.filter(tutor => {
                // Subject filter
                if (currentSubject !== 'all' && tutor.subject !== currentSubject) {
                    return false;
                }
    
                // Location filter
                if (currentLocation !== 'all' && tutor.location !== currentLocation) {
                    return false;
                }
    
                // Gender filter
                if (currentGender !== 'both' && tutor.gender.toLowerCase() !== currentGender.toLowerCase()) {
                    return false;
                }
    
                // Price filter
                if (currentPrice !== 'all') {
                    const [min, max] = currentPrice.split('-');
                    if (max) {
                        if (tutor.price < parseInt(min) || tutor.price > parseInt(max)) {
                            return false;
                        }
                    } else if (currentPrice === '2000+') {
                        if (tutor.price < 2000) {
                            return false;
                        }
                    }
                }
    
                // Search term
                if (currentSearch) {
                    const searchFields = [
                        tutor.name.toLowerCase(),
                        tutor.subjects.join(' ').toLowerCase(),
                        tutor.areas.join(' ').toLowerCase(),
                        tutor.bio.toLowerCase()
                    ];
    
                    if (!searchFields.some(field => field.includes(currentSearch))) {
                        return false;
                    }
                }
    
                return true;
            });
    
            // Update result count
            resultCount.textContent = `${filteredTutors.length} ${filteredTutors.length === 1 ? 'tutor' : 'tutors'} found`;
    
            // Display results
            if (filteredTutors.length === 0) {
                noResults.classList.remove('d-none');
            } else {
                renderTutors(filteredTutors);
            }
    
            loadingSpinner.classList.add('d-none');
        }, 200);
    }
    
    function renderTutors(tutorsToRender) {
        tutorListings.innerHTML = '';
        
        tutorsToRender.forEach(tutor => {
            const tutorCard = document.createElement('div');
            tutorCard.className = 'tutor-card overflow-hidden rounded-4 card shadow-sm mb-4';
            
            // Get display names
            const subjectName = {
                'math': 'Mathematics',
                'science': 'Science',
                'english': 'English',
                'history': 'History',
                'programming': 'Programming'
            }[tutor.subject];
            
            const locationName = {
                'dhaka': 'Dhaka',
                'chittagong': 'Chittagong',
                'rajshahi': 'Rajshahi',
                'rangpur': 'Rangpur',
                'khulna': 'Khulna',
                'barisal': 'Barisal',
                'sylhet': 'Sylhet',
                'mymensingh': 'Mymensingh',
            }[tutor.location];
 
            tutorCard.innerHTML = `
                <div class="card-body  bg">
                    <div class="d-flex justify-content-between align-items-start mb-2"> 
                        <div class="d-flex align-items-center">
                            <img src="${tutor.imgSrc}" alt="" width="60" height="60" class="rounded-circle me-3">
                            <div class="">
                                <h5 class="card-title fw-bold color mb-1">${tutor.name}</h5>
                                <span class="badge bg-primary-gradient text-white mb-1">${subjectName}</span>
                            </div>
                        </div>
                        <div class="fw-bold color">৳${tutor.price}/hr</div>
                    </div>
                    
                    <div class="mb-3">
                        <p class="card-text text-primary-emphasis mb-1"><strong>Subjects:</strong> ${tutor.subjects.join(', ')}</p>
                        <p class="card-text text-primary-emphasis mb-1"><strong>Location:</strong> ${locationName} (${tutor.areas.join(', ')})</p>
                        <p class="card-text text-primary-emphasis mb-1"><strong>Experience:</strong> ${tutor.experience}</p>
                        <p class="card-text text-primary-emphasis mb-2"><strong>Education:</strong> ${tutor.education}</p>
                        <p class="card-text text-primary-emphasis mb-2"><strong>Gender:</strong> ${tutor.gender}</p>
                        <p class="card-text text-muted">${tutor.bio}</p>
                    </div>
                    
                    <a href="#" class="btnCode" onclick="window.location.href='tutordetails.html?id=${tutor.id}'">
                        <i class="fas fa-envelope me-1"></i> Contact Tutor
                    </a>
                </div>
            `;
            
            tutorListings.appendChild(tutorCard);
        });
    }
});
