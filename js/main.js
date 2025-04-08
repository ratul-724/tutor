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

// code fo premium tutor start here 
// Tutor data
const tutors = [
    {
        id: 1,
        name: "Muhammad Abdullah",
        university: "Ashian University of Bangladesh",
        shortUniversity: "Ashian University",
        location: "Gulshan-2, Dhaka",
        salary: "Above 7000/Month",
        subjects: "Mathematics, Physics",
        experience: "5 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 2,
        name: "Shahriar Hossain",
        university: "Dhaka University",
        shortUniversity: "Dhaka University",
        location: "University Area, Dhaka",
        salary: "Above 5000/Month",
        subjects: "Chemistry, Biology",
        experience: "3 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 3,
        name: "Yeasin Rahman",
        university: "University of Dhaka",
        shortUniversity: "Dhaka University",
        location: "Mirpur-11, Dhaka",
        salary: "6000-10000/Month",
        subjects: "English, History",
        experience: "4 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 4,
        name: "Mehrab Hossan",
        university: "Daffodil International University",
        shortUniversity: "Daffodil University",
        location: "Uttara, Dhaka",
        salary: "3500+/Month",
        subjects: "Computer Science",
        experience: "2 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 5,
        name: "Zara Ahmed",
        university: "Brac University",
        shortUniversity: "Brac University",
        location: "Badda, Dhaka",
        salary: "Negotiable",
        subjects: "Economics, Business",
        experience: "3 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 6,
        name: "Shahparan Palash",
        university: "Bangladesh University of Textile",
        shortUniversity: "BUTEX",
        location: "Uttara-11, Dhaka",
        salary: "Above 6000/Month",
        subjects: "Textile Engineering",
        experience: "4 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 7,
        name: "Tamim Hasan Saad",
        university: "BUET",
        shortUniversity: "BUET",
        location: "Mirpur-1, Dhaka",
        salary: "12k/Month",
        subjects: "Civil Engineering",
        experience: "6 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 8,
        name: "Fahim Islam Nirjen",
        university: "North South University",
        shortUniversity: "NSU",
        location: "Uttara-13, Dhaka",
        salary: "5000/Month",
        subjects: "Accounting, Finance",
        experience: "3 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 9,
        name: "Mohymenul Islam",
        university: "Bangladesh Maritime University",
        shortUniversity: "Maritime University",
        location: "Mirpur, Dhaka",
        salary: "Negotiable",
        subjects: "Marine Science",
        experience: "2 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 10,
        name: "NAHIDUL ISLAM",
        university: "BUET",
        shortUniversity: "BUET",
        location: "Farmgate, Dhaka",
        salary: "9000-12000/Month",
        subjects: "Electrical Engineering",
        experience: "5 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 11,
        name: "Al Shahriar",
        university: "GUET",
        shortUniversity: "GUET",
        location: "Kuril, Dhaka",
        salary: "6000-9000/Month",
        subjects: "Computer Science",
        experience: "4 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 12,
        name: "Support Member",
        university: "Dhaka University",
        shortUniversity: "Dhaka University",
        location: "Basihundhara, Dhaka",
        salary: "10000-15000",
        subjects: "Various Subjects",
        experience: "5+ years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 13,
        name: "Rafiqul Islam",
        university: "Jahangirnagar University",
        shortUniversity: "JU",
        location: "Savar, Dhaka",
        salary: "8000-10000/Month",
        subjects: "Biology, Chemistry",
        experience: "4 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 14,
        name: "Farhana Akter",
        university: "Rajshahi University",
        shortUniversity: "RU",
        location: "Mohammadpur, Dhaka",
        salary: "7000-9000/Month",
        subjects: "English Literature",
        experience: "3 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 15,
        name: "Kamal Hossain",
        university: "Chittagong University",
        shortUniversity: "CU",
        location: "Banani, Dhaka",
        salary: "8500-11000/Month",
        subjects: "Economics",
        experience: "5 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 16,
        name: "Ayesha Siddika",
        university: "North South University",
        shortUniversity: "NSU",
        location: "Dhanmondi, Dhaka",
        salary: "9000+/Month",
        subjects: "Business Administration",
        experience: "4 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 17,
        name: "Imran Khan",
        university: "BUET",
        shortUniversity: "BUET",
        location: "Mirpur-10, Dhaka",
        salary: "10000-15000/Month",
        subjects: "Mechanical Engineering",
        experience: "6 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 18,
        name: "Sabrina Ahmed",
        university: "Brac University",
        shortUniversity: "Brac University",
        location: "Gulshan-1, Dhaka",
        salary: "7500-9500/Month",
        subjects: "Psychology",
        experience: "3 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 19,
        name: "Rahim Sheikh",
        university: "DU",
        shortUniversity: "DU",
        location: "Shyamoli, Dhaka",
        salary: "6000-8000/Month",
        subjects: "Political Science",
        experience: "2 years",
        avatar: "assets/icons/user.png"
    },
    {
        id: 20,
        name: "Tasnim Rahman",
        university: "IUB",
        shortUniversity: "IUB",
        location: "Uttara, Dhaka",
        salary: "8500+/Month",
        subjects: "Marketing",
        experience: "4 years",
        avatar: "assets/icons/user.png"
    }
];

// Configuration
const tutorsPerPage = 12; // 3 rows of 5 tutors
let currentPage = 1;

// Display tutors
function displayTutors(page) {
    const container = document.getElementById('tutors-container');
    container.innerHTML = '';
    
    const startIndex = (page - 1) * tutorsPerPage;
    const endIndex = Math.min(startIndex + tutorsPerPage, tutors.length);
    const tutorsToShow = tutors.slice(startIndex, endIndex);
    
    tutorsToShow.forEach(tutor => {
        const col = document.createElement('div');
        col.className = 'g-3 col-6 col-md-4 col-lg-4';
        
        col.innerHTML = `

            <a href="tutorDetails.html" class=" text-decoration-none">
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img src="${tutor.avatar}" alt="${tutor.name}" class="tutor-avatar">
                            <h5 class="tutor-name">${tutor.name.split(' ')[0]} ${tutor.name.split(' ')[1]}</h5>
                            <p class="tutor-university">${tutor.shortUniversity}</p>
                            <p class="tutor-location">${tutor.location}</p>
                            <p class="tutor-salary">${tutor.salary}</p>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-content">
                                <h5 class="tutor-name">${tutor.name}</h5>
                                <p><strong>University:</strong> ${tutor.university}</p>
                                <p><strong>Location:</strong> ${tutor.location}</p>
                                <p><strong>Subjects:</strong> ${tutor.subjects}</p>
                                <p><strong>Experience:</strong> ${tutor.experience}</p>
                            </div>
                            <p class="tutor-salary">Salary: ${tutor.salary}</p>
                        </div>
                    </div>
                </div>
            </a>
        `;
        
        container.appendChild(col);
    });
    
    updatePagination();
}

// Update pagination
function updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    const totalPages = Math.ceil(tutors.length / tutorsPerPage);
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous" onclick="changePage(${currentPage - 1})">
        <span aria-hidden="true">&laquo;</span>
    </a>`;
    pagination.appendChild(prevLi);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next" onclick="changePage(${currentPage + 1})">
        <span aria-hidden="true">&raquo;</span>
    </a>`;
    pagination.appendChild(nextLi);
}

// Change page
function changePage(page) {
    if (page < 1 || page > Math.ceil(tutors.length / tutorsPerPage)) return;
    currentPage = page;
    displayTutors(currentPage);
}

// Initialize
displayTutors(currentPage);
// code fo premium tutor end here 


