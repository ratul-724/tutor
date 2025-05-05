// code for wholesale market end here
// Image preview functionality
document.getElementById('marketImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('imagePreview');
            preview.src = event.target.result;
            document.getElementById('imagePreviewContainer').classList.remove('d-none');
        };
        reader.readAsDataURL(file);
    }
});

// Add specialty functionality
document.getElementById('addSpecialtyBtn').addEventListener('click', function() {
    const input = document.getElementById('specialtyInput');
    if (input.value.trim()) {
        const specialty = input.value.trim();
        const badge = document.createElement('span');
        badge.className = 'badge bg-primary bg-opacity-10 text-primary';
        badge.innerHTML = specialty + 
                        '<button type="button" class="ms-2 btn-close btn-close-white btn-sm" aria-label="Close"></button>';
        
        badge.querySelector('button').addEventListener('click', function() {
            badge.remove();
        });
        
        document.getElementById('specialtiesContainer').appendChild(badge);
        input.value = '';
    }
});

// Add certification functionality
document.getElementById('addCertificationBtn').addEventListener('click', function() {
    const input = document.getElementById('certificationInput');
    if (input.value.trim()) {
        const certification = input.value.trim();
        const badge = document.createElement('span');
        badge.className = 'badge bg-success bg-opacity-10 text-success';
        badge.innerHTML = certification + 
                        '<button type="button" class="ms-2 btn-close btn-close-white btn-sm" aria-label="Close"></button>';
        
        badge.querySelector('button').addEventListener('click', function() {
            badge.remove();
        });
        
        document.getElementById('certificationsContainer').appendChild(badge);
        input.value = '';
    }
});

// Enable/disable time inputs based on open/close switch
const dayControls = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

dayControls.forEach(day => {
    const checkbox = document.getElementById(`${day}Open`);
    const openTime = document.getElementById(`${day}OpenTime`);
    const closeTime = document.getElementById(`${day}CloseTime`);
    
    checkbox.addEventListener('change', function() {
        openTime.disabled = !this.checked;
        closeTime.disabled = !this.checked;
    });
});

// Form submission
document.getElementById('marketForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Market data would be saved here in a real application');
    // You would collect all the form data here and send it to your backend
});
// code for wholesale market end here


// code for transport start here
// Header image preview
document.getElementById('truckImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const previewContainer = document.getElementById('headerPreviewContainer');
            previewContainer.classList.remove('d-none');
            previewContainer.querySelector('.van-header-preview').style.backgroundImage = 
                `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${event.target.result}')`;
        };
        reader.readAsDataURL(file);
    }
});

// Update header preview text
document.getElementById('truckId').addEventListener('input', function() {
    document.getElementById('previewTitle').textContent = `Truck #${this.value}`;
});

document.getElementById('truckTitle').addEventListener('input', function() {
    document.getElementById('previewSubtitle').textContent = this.value;
});

// Add feature functionality
document.getElementById('addFeatureBtn').addEventListener('click', function() {
    const input = document.getElementById('featureInput');
    if (input.value.trim()) {
        const feature = input.value.trim();
        const badge = document.createElement('span');
        badge.className = 'bg-success-gradient text-white rounded-5 d-flex align-items-center px-2 py-1 m-1';
        badge.innerHTML = `<i class="fas fa-check me-1"></i> ${feature}` + 
                        '<button type="button" class="ms-2 btn-close btn-close-white btn-sm" aria-label="Close"></button>';
        
        badge.querySelector('button').addEventListener('click', function() {
            badge.remove();
        });
        
        document.getElementById('featuresContainer').appendChild(badge);
        input.value = '';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    // Generate calendar for specified month/year
    function generateCalendar(month, year) {
        // Update month/year display
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                        "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        document.getElementById('currentMonthYear').textContent = `${monthNames[month]} ${year}`;
        
        // Get first and last day of month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Get days in month
        const daysInMonth = lastDay.getDate();
        
        // Get starting day of week (0-6)
        const startDay = firstDay.getDay();
        
        let calendarHTML = '';
        let date = 1;
        
        // Create calendar rows
        for (let i = 0; i < 6; i++) {
            // Stop if we've processed all days
            if (date > daysInMonth) break;
            
            calendarHTML += '<tr>';
            
            // Create cells for each day of week
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startDay) {
                    // Previous month days
                    const prevMonthLastDay = new Date(year, month, 0).getDate();
                    calendarHTML += `<td class="bg-light text-muted">${prevMonthLastDay - (startDay - j - 1)}</td>`;
                } else if (date > daysInMonth) {
                    // Next month days
                    calendarHTML += `<td class="bg-light text-muted">${date - daysInMonth}</td>`;
                    date++;
                } else {
                    // Current month days
                    const today = new Date();
                    const isToday = date === today.getDate() && 
                                month === today.getMonth() && 
                                year === today.getFullYear();
                    const todayClass = isToday ? 'bg-info bg-opacity-10' : '';
                    
                    calendarHTML += `
                        <td class="${todayClass}" 
                            onclick="toggleBooked(this)" 
                            data-date="${year}-${month+1}-${date}">
                            ${date}
                        </td>`;
                    date++;
                }
            }
            
            calendarHTML += '</tr>';
        }
        
        document.getElementById('calendarBody').innerHTML = calendarHTML;
    }
    
    // Toggle booked status
    window.toggleBooked = function(cell) {
        if (cell.classList.contains('bg-light')) return; // Skip disabled cells
        
        if (cell.classList.contains('booked')) {
            // Unmark as booked
            cell.classList.remove('booked', 'bg-danger', 'bg-opacity-10');
            cell.innerHTML = cell.textContent; // Remove strikethrough
        } else {
            // Mark as booked
            cell.classList.add('booked', 'bg-danger', 'text-danger', 'bg-opacity-10');
            cell.innerHTML = `<del>${cell.textContent}</del>`; // Add strikethrough
        }
    }
    
    // Month navigation
    window.changeMonth = function(offset) {
        currentMonth += offset;
        
        // Handle year transition
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        
        generateCalendar(currentMonth, currentYear);
    }
    // Initialize with current month
    generateCalendar(currentMonth, currentYear);
});
// Form submission
document.getElementById('truckForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Truck data would be saved here in a real application');
    // You would collect all the form data here and send it to your backend
});
// code for transport end here


// code for van market start here
// Header image preview
document.getElementById('vanImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('headerPreview');
            preview.style.backgroundImage = `url('${event.target.result}')`;
            preview.classList.remove('d-none');
        };
        reader.readAsDataURL(file);
    }
});

// Update header preview text
document.getElementById('vanTitle').addEventListener('input', function() {
    document.getElementById('previewVanTitle').textContent = this.value;
});

document.getElementById('vanLocation').addEventListener('input', function() {
    document.getElementById('previewVanLocation').innerHTML = 
        `<i class="fas fa-map-marker-alt me-1"></i> ${this.value}`;
});

// Add product functionality
document.getElementById('addProductBtn').addEventListener('click', function() {
    const template = document.getElementById('productTemplate').cloneNode(true);
    template.classList.remove('d-none');
    template.removeAttribute('id');
    
    // Set up remove button
    template.querySelector('button').addEventListener('click', function() {
        template.remove();
    });
    
    // Set up image preview
    template.querySelector('input[type="file"]').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                template.querySelector('img').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    document.getElementById('productsContainer').appendChild(template);
});

// Form submission
document.getElementById('vanForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Van data would be saved here in a real application');
    // You would collect all the form data here and send it to your backend
});
 {/* code for van market end here  */}
