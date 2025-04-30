document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        postsContainer: document.getElementById('postsContainer'),
        filterChips: document.getElementById('filterChips'),
        searchInput: document.getElementById('searchInput'),
        searchButton: document.getElementById('searchButton'),
        createPostBtn: document.getElementById('createPostBtn'),
        loadingSpinner: document.getElementById('loadingSpinner'),
        noResults: document.getElementById('noResults'),
        paginationContainer: document.getElementById('paginationContainer'),
        postForm: document.getElementById('postForm'),
        applyForm: document.getElementById('applyForm'),
        submitPostBtn: document.getElementById('submitPostBtn'),
        submitApplyBtn: document.getElementById('submitApplyBtn'),
        applyModalTitle: document.getElementById('applyModalTitle')
    };
    
    // Sample data
    const samplePosts = [
        {
            id: 1,
            title: "Mathematics Teacher for Class 9-10",
            status: "active",
            urgent: true,
            location: "Mirpur, Dhaka",
            subject: "Mathematics",
            topics: ["General Math", "Higher Math"],
            level: "Class 9-10",
            students: 2,
            budget: "2000-3000",
            schedule: "5 days/week, Evening",
            description: "Looking for an experienced math teacher who can teach both general and higher math for my two children. Must have experience with SSC candidates.",
            applications: 5,
            posted: "2 days ago",
            contact: {
                name: "Mr. Rahman",
                phone: "01XXXXXXXXX"
            }
        },
        {
            id: 2,
            title: "English Medium Science Teacher",
            status: "active",
            urgent: false,
            location: "Gulshan, Dhaka",
            subject: "Science",
            topics: ["Physics", "Chemistry"],
            level: "Class 7-8",
            students: 1,
            budget: "3000-4000",
            schedule: "3 days/week, Afternoon",
            description: "Looking for a female science teacher who can teach physics and chemistry in English medium. Must have experience with international curriculum.",
            applications: 3,
            posted: "1 week ago",
            contact: {
                name: "Mrs. Khan",
                phone: "01XXXXXXXXX"
            }
        },
        {
            id: 3,
            title: "ICT Teacher for University Student",
            status: "active",
            urgent: true,
            location: "Dhanmondi, Dhaka",
            subject: "Programming",
            topics: ["Python", "Java"],
            level: "University",
            students: 1,
            budget: "5000",
            schedule: "2 days/week, Flexible",
            description: "Need an experienced ICT teacher who can help with university-level programming courses. Must have strong knowledge in Python and Java.",
            applications: 7,
            posted: "3 days ago",
            contact: {
                name: "Ms. Ahmed",
                phone: "01XXXXXXXXX"
            }
        },
        {
            id: 4,
            title: "Arabic Language Teacher",
            status: "filled",
            urgent: false,
            location: "Uttara, Dhaka",
            subject: "Arabic",
            topics: ["Basic Arabic"],
            level: "Adults",
            students: 1,
            budget: "1500-2000",
            schedule: "Weekend Only",
            description: "Looking for an Arabic teacher who can teach basic Arabic language for religious purposes. Must be fluent in Arabic pronunciation.",
            applications: 4,
            posted: "2 weeks ago",
            contact: {
                name: "Mr. Hossain",
                phone: "01XXXXXXXXX"
            }
        },
        {
            id: 5,
            title: "English Tutor for IELTS Preparation",
            status: "active",
            urgent: false,
            location: "Banani, Dhaka",
            subject: "English",
            topics: ["IELTS Preparation"],
            level: "Adults",
            students: 1,
            budget: "4000-5000",
            schedule: "4 days/week, Evening",
            description: "Need a certified English tutor for IELTS preparation. Must have proven track record of helping students achieve band 7+.",
            applications: 2,
            posted: "5 days ago",
            contact: {
                name: "Ms. Chowdhury",
                phone: "01XXXXXXXXX"
            }
        },
        {
            id: 6,
            title: "Physics Teacher for HSC Candidates",
            status: "active",
            urgent: true,
            location: "Mohammadpur, Dhaka",
            subject: "Physics",
            topics: ["HSC Physics"],
            level: "Class 11-12",
            students: 3,
            budget: "3500-4500",
            schedule: "6 days/week, Afternoon",
            description: "Looking for a physics specialist to teach HSC candidates. Must have experience with creative questions and board exam patterns.",
            applications: 6,
            posted: "1 day ago",
            contact: {
                name: "Mr. Islam",
                phone: "01XXXXXXXXX"
            }
        }
    ];
    
    const filterOptions = [
        { id: 'all', name: 'All Posts' },
        { id: 'dhaka', name: 'Dhaka' },
        { id: 'chittagong', name: 'Chittagong' },
        { id: 'math', name: 'Mathematics' },
        { id: 'science', name: 'Science' },
        { id: 'english', name: 'English' },
        { id: 'active', name: 'Active' },
        { id: 'urgent', name: 'Urgent' }
    ];
    
    // State management
    const state = {
        posts: [],
        filteredPosts: [],
        currentFilters: ['all'],
        currentPage: 1,
        postsPerPage: 20,
        searchQuery: ''
    };
    
    // Initialize
    init();
    
    // Event listeners
    elements.createPostBtn.addEventListener('click', showCreatePostModal);
    elements.searchButton.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keyup', e => e.key === 'Enter' && handleSearch());
    elements.submitPostBtn.addEventListener('click', submitPost);
    elements.submitApplyBtn.addEventListener('click', submitApplication);
    
    // Functions
    function init() {
        // Load sample data
        state.posts = [...samplePosts];
        state.filteredPosts = [...samplePosts];
        
        // Render initial UI
        renderFilterChips();
        renderPosts();  
    }
    
    function renderFilterChips() {
        elements.filterChips.innerHTML = '';
        
        filterOptions.forEach(filter => {
            const chip = document.createElement('button');
            chip.className = `filter-chip btn btn-sm ${state.currentFilters.includes(filter.id) ? 'active btn-success' : 'btn-outline-success'}`;
            chip.textContent = filter.name;
            chip.dataset.filter = filter.id;
            
            chip.addEventListener('click', () => {
                if (filter.id === 'all') {
                    state.currentFilters = ['all'];
                } else {
                    // Remove 'all' if other filters are selected
                    if (state.currentFilters.includes('all')) {
                        state.currentFilters = state.currentFilters.filter(f => f !== 'all');
                    }
                    
                    // Toggle filter
                    if (state.currentFilters.includes(filter.id)) {
                        state.currentFilters = state.currentFilters.filter(f => f !== filter.id);
                        // If no filters left, show all
                        if (state.currentFilters.length === 0) {
                            state.currentFilters = ['all'];
                        }
                    } else {
                        state.currentFilters.push(filter.id);
                    }
                }
                
                applyFilters();
                renderFilterChips();
            });
            
            elements.filterChips.appendChild(chip);
        });
    }
    
    function applyFilters() {
        // Show loading state
        elements.loadingSpinner.classList.remove('d-none');
        elements.postsContainer.innerHTML = '';
        
        setTimeout(() => {
            let results = [...state.posts];
            
            // Apply search filter
            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase();
                results = results.filter(post => 
                    post.title.toLowerCase().includes(query) ||
                    post.subject.toLowerCase().includes(query) ||
                    post.location.toLowerCase().includes(query) ||
                    post.description.toLowerCase().includes(query)
                );
            }
            
            // Apply category filters
            if (!state.currentFilters.includes('all')) {
                results = results.filter(post => {
                    // Check location filters
                    const locationMatch = state.currentFilters.some(filter => 
                        post.location.toLowerCase().includes(filter)
                    );
                    
                    // Check subject filters
                    const subjectMatch = state.currentFilters.some(filter => 
                        post.subject.toLowerCase().includes(filter)
                    );
                    
                    // Check status filters
                    const statusMatch = state.currentFilters.some(filter => 
                        post.status.includes(filter) || 
                        (filter === 'urgent' && post.urgent)
                    );
                    
                    return locationMatch || subjectMatch || statusMatch;
                });
            }
            
            state.filteredPosts = results;
            state.currentPage = 1; // Reset to first page when filters change
            
            renderPosts();
            renderPagination();
            
            // Show/hide no results message
            elements.noResults.classList.toggle('d-none', results.length > 0);
            elements.loadingSpinner.classList.add('d-none');
        }, 500);
    }
    
    function renderPosts() {
        elements.postsContainer.innerHTML = '';
        
        // Calculate pagination
        const startIdx = (state.currentPage - 1) * state.postsPerPage;
        const endIdx = startIdx + state.postsPerPage;
        const postsToShow = state.filteredPosts.slice(startIdx, endIdx);
        
        if (postsToShow.length === 0) {
            elements.noResults.classList.remove('d-none');
            return;
        }
        
        postsToShow.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'col-12 col-lg-6';
            
            // Determine status badge
            let statusBadge = '';
            if (post.status === 'filled') {
                statusBadge = '<span class="badge bg-secondary badge-status">Filled</span>';
            } else if (post.urgent) {
                statusBadge = '<span class="badge bg-danger badge-status">Urgent</span>';
            } else {
                statusBadge = '<span class="badge bg-success badge-status">Active</span>';
            }
            
            postEl.innerHTML = `
                <div class="post-card card h-100 shadow-sm" style="background: linear-gradient(to bottom right,#e8f0e8, #d8e8f4);">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                ${statusBadge}
                                <h5 class="card-title fw-bold mt-2">${post.title}</h5>
                            </div>
                            <small class="text-muted">${post.posted}</small>
                        </div>
                        
                        <div class="mb-3 flex-grow-1">
                            <p class="card-text mb-2"><i class="fas fa-map-marker-alt icon-feature me-2"></i> ${post.location}</p>
                            <p class="card-text mb-2"><i class="fas fa-book icon-feature me-2"></i> ${post.subject}: ${post.topics.join(', ')}</p>
                            <p class="card-text mb-2"><i class="fas fa-user-graduate icon-feature me-2"></i> ${post.level} (${post.students} student${post.students > 1 ? 's' : ''})</p>
                            <p class="card-text mb-2"><i class="fas fa-money-bill-wave icon-feature me-2"></i> ৳${post.budget}/month</p>
                            <p class="card-text mb-3"><i class="fas fa-clock icon-feature me-2"></i> ${post.schedule}</p>
                            
                            <p class="card-text">${post.description}</p>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <span class="badge bg-success-gradient text-white">
                                <i class="fas fa-users me-1"></i> ${post.applications} applied
                            </span>
                            <button class="btn btnCode btn-sm ${post.status === 'filled' ? 'disabled' : ''}" 
                                    data-post-id="${post.id}" 
                                    onclick="showApplyModal(${post.id}, '${post.title}')">
                                <i class="fas fa-paper-plane me-1"></i> Apply
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            elements.postsContainer.appendChild(postEl);
        });
    }
    
    function renderPagination() {
        const pageCount = Math.ceil(state.filteredPosts.length / state.postsPerPage);
        
        if (pageCount <= 1) {
            // elements.paginationContainer.classList.add('d-none');
            return;
        }
        
        // elements.paginationContainer.classList.remove('d-none');
        const paginationEl = elements.paginationContainer.querySelector('.pagination');
        paginationEl.innerHTML = '';
        
        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${state.currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = '<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>';
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (state.currentPage > 1) {
                state.currentPage--;
                renderPosts();
                updatePaginationUI();
            }
        });
        paginationEl.appendChild(prevLi);
        
        // Page buttons
        for (let i = 1; i <= pageCount; i++) {
            const pageLi = document.createElement('li');
            pageLi.className = `page-item ${state.currentPage === i ? 'active' : ''}`;
            pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            
            pageLi.addEventListener('click', (e) => {
                e.preventDefault();
                state.currentPage = i;
                renderPosts();
                updatePaginationUI();
            });
            
            paginationEl.appendChild(pageLi);
        }
        
        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${state.currentPage === pageCount ? 'disabled' : ''}`;
        nextLi.innerHTML = '<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>';
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (state.currentPage < pageCount) {
                state.currentPage++;
                renderPosts();
                updatePaginationUI();
            }
        });
        paginationEl.appendChild(nextLi);
    }
    
    function updatePaginationUI() {
        const pageItems = elements.paginationContainer.querySelectorAll('.page-item');
        pageItems.forEach((item, index) => {
            if (index === 0) {
                // Previous button
                item.classList.toggle('disabled', state.currentPage === 1);
            } else if (index === pageItems.length - 1) {
                // Next button
                item.classList.toggle('disabled', state.currentPage === pageItems.length - 2);
            } else {
                // Page buttons
                item.classList.toggle('active', index === state.currentPage);
            }
        });
    }
    
    function handleSearch() {
        state.searchQuery = elements.searchInput.value.trim();
        applyFilters();
    }
    
    function showCreatePostModal() {
        const modal = new bootstrap.Modal(document.getElementById('createPostModal'));
        
        // Build form dynamically
        elements.postForm.innerHTML = `
            <div class="mb-3">
                <label class="form-label fw-bold">What subject do you need help with?</label>
                <select class="form-select focusNone" id="postSubject" required>
                    <option value="" selected disabled>Select subject</option>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>Bangla</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>ICT/Programming</option>
                    <option>Arabic</option>
                    <option>Other</option>
                </select>
            </div>
            
            <div class="mb-3">
                <label class="form-label fw-bold">Specific Topics (comma separated)</label>
                <input type="text" class="form-control focusNone" id="postTopics" placeholder="e.g. Algebra, Geometry, Calculus" required>
            </div>
            
            <div class="mb-3">
                <label class="form-label fw-bold">Location</label>
                <div class="row g-2">
                    <div class="col-md-6">
                        <select class="form-select focusNone" id="postDistrict" required>
                            <option value="" selected disabled>Select district</option>
                            <option>Dhaka</option>
                            <option>Chittagong</option>
                            <option>Sylhet</option>
                            <option>Khulna</option>
                            <option>Rajshahi</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control focusNone" id="postArea" placeholder="Specific area (e.g. Mirpur, Gulshan)" required>
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <label class="form-label fw-bold">Student Details</label>
                <div class="row g-2">
                    <div class="col-md-6">
                        <select class="form-select focusNone" id="postLevel" required>
                            <option value="" selected disabled>Class/Level</option>
                            <option>Class 1-5</option>
                            <option>Class 6-8</option>
                            <option>Class 9-10</option>
                            <option>Class 11-12</option>
                            <option>University</option>
                            <option>Adult Learner</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <select class="form-select focusNone" id="postStudents" required>
                            <option value="" selected disabled>Number of students</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4+</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <label class="form-label fw-bold">Schedule & Budget</label>
                <div class="row g-2">
                    <div class="col-md-6">
                        <select class="form-select focusNone" id="postDays" required>
                            <option value="" selected disabled>Days per week</option>
                            <option>1 day</option>
                            <option>2 days</option>
                            <option>3 days</option>
                            <option>4 days</option>
                            <option>5 days</option>
                            <option>6 days</option>
                            <option>Weekend only</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <select class="form-select focusNone" id="postTime" required>
                            <option value="" selected disabled>Preferred time</option>
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Evening</option>
                            <option>Flexible</option>
                        </select>
                    </div>
                    <div class="col-12 mt-2">
                        <div class="input-group">
                            <span class="input-group-text">৳</span>
                            <input type="number" class="focusNone form-control" id="postMinBudget" placeholder="Minimum" required>
                            <span class="input-group-text">to</span>
                            <input type="number" class="form-control focusNone" id="postMaxBudget" placeholder="Maximum" required>
                            <span class="input-group-text">/month</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <label class="form-label fw-bold">Additional Requirements</label>
                <textarea class="form-control focusNone" id="postDescription" rows="3" required></textarea>
            </div>
            
            <div class="mb-3">
                <label class="form-label fw-bold">Contact Information</label>
                <div class="row g-2">
                    <div class="col-md-6">
                        <input type="text" class="form-control focusNone" id="postContactName" placeholder="Your name" required>
                    </div>
                    <div class="col-md-6"> 
                        <input type="tel" class="form-control focusNone" id="postContactPhone" placeholder="Phone number" required>
                    </div>
                </div>
            </div>
            
            <div class="form-check mb-3">
                <input class="form-check-input focusNone" type="checkbox" id="postUrgent" value="">
                <label class="form-check-label" for="postUrgent">
                    Mark as Urgent
                </label>
            </div>
        `;
        
        modal.show();
    }
    
    function showApplyModal(postId, postTitle) {
        // Ensure the modal exists
        const modalElement = document.getElementById('applyModal');
        if (!modalElement) {
            console.error('Apply Modal element not found.');
            return;
        }
    
        // Initialize the Bootstrap modal
        const modal = new bootstrap.Modal(modalElement);
    
        // Update the modal title dynamically
        const applyModalTitle = document.getElementById('applyModalTitle');
        if (applyModalTitle) {
            applyModalTitle.textContent = `Apply for: ${postTitle}`;
        } else {
            console.error('Apply Modal Title element not found.');
            return;
        }
    
        // Populate the form dynamically
        const applyForm = document.getElementById('applyForm');
        if (applyForm) {
            applyForm.innerHTML = `
                <input type="hidden" id="applyPostId" value="${postId}">
                <div class="mb-3">
                    <label class="form-label fw-bold">Your Qualifications</label>
                    <textarea class="form-control focusNone" id="applyQualifications" rows="3" placeholder="Describe your education, experience and why you're suitable..." required></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Expected Salary</label>
                    <div class="input-group">
                        <span class="input-group-text">৳</span>
                        <input type="number" class="form-control focusNone" id="applySalary" placeholder="Amount per month" required>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Availability</label>
                    <textarea class="form-control focusNone" id="applyAvailability" rows="2" placeholder="When are you available for this position?" required></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Contact Information</label>
                    <div class="row g-2">
                        <div class="col-md-6">
                            <input type="text" class="form-control focusNone" id="applyName" placeholder="Your name" required>
                        </div>
                        <div class="col-md-6">
                            <input type="tel" class="form-control focusNone" id="applyPhone" placeholder="Phone number" required>
                        </div>
                        <div class="col-12 mt-2">
                            <input type="email" class="form-control focusNone" id="applyEmail" placeholder="Email address" required>
                        </div>
                    </div>
                </div>
            `;
        } else {
            console.error('Apply Form element not found.');
            return;
        }
    
        // Show the modal
        modal.show();
    }
    window.showApplyModal = showApplyModal;
    function submitPost() {
        // In a real app, you would validate and send to server
        alert('Post created successfully!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('createPostModal'));
        modal.hide();
        
        // Add the new post to our local state (simulating server response)
        const newPost = {
            id: state.posts.length + 1,
            title: document.getElementById('postSubject').value + " Teacher for " + document.getElementById('postLevel').value,
            status: "active",
            urgent: document.getElementById('postUrgent').checked,
            location: document.getElementById('postDistrict').value + ", " + document.getElementById('postArea').value,
            subject: document.getElementById('postSubject').value,
            topics: document.getElementById('postTopics').value.split(',').map(t => t.trim()),
            level: document.getElementById('postLevel').value,
            students: parseInt(document.getElementById('postStudents').value),
            budget: document.getElementById('postMinBudget').value + "-" + document.getElementById('postMaxBudget').value,
            schedule: document.getElementById('postDays').value + ", " + document.getElementById('postTime').value,
            description: document.getElementById('postDescription').value,
            applications: 0,
            posted: "Just now",
            contact: {
                name: document.getElementById('postContactName').value,
                phone: document.getElementById('postContactPhone').value
            }
        };
        
        state.posts.unshift(newPost); // Add at beginning
        state.filteredPosts.unshift(newPost);
        renderPosts();
        renderPagination();
    }
    
    function submitApplication() {
        // In a real app, you would validate and send to server
        // alert('Application submitted successfully!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('applyModal'));
        modal.hide();
        
        // Update application count (simulating server response)
        const postId = parseInt(document.getElementById('applyPostId').value);
        const postIndex = state.posts.findIndex(p => p.id === postId);
        
        if (postIndex !== -1) {
            state.posts[postIndex].applications++;
            
            // Also update in filteredPosts if it exists there
            const filteredIndex = state.filteredPosts.findIndex(p => p.id === postId);
            if (filteredIndex !== -1) {
                state.filteredPosts[filteredIndex].applications++;
            }
            
            renderPosts();
        }
    }
});
