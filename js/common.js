// Load Navbar
fetch('nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').outerHTML = data;
    });
// Load Footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').outerHTML = data;
    });

// code for search system start here 
const districtAreas = {
    dhaka: [
        "Dhanmondi", "Gulshan", "Mirpur", "Uttara", "Banani", 
        "Mohammadpur", "Farmgate", "Motijheel", "Shyamoli", "Badda"
    ],
    chittagong: [
        "Agrabad", "Nasirabad", "Halishahar", "Patenga", "Chawkbazar",
        "Kotwali", "Pahartali", "Panchlaish", "Double Mooring"
    ],
    sylhet: [
        "Zindabazar", "Upashahar", "Ambarkhana", "Subidbazar", "Mirabazar",
        "Naya Sarak", "Kumarpara", "Tilagor", "Uposhohor"
    ],
    khulna: [
        "Khalishpur", "Sonadanga", "Boyra", "Doulatpur", "Khalishpur",
        "Khan Jahan Ali", "Rupsha", "Phultala", "Atra Shilpa"
    ],
    rajshahi: [
        "Shaheb Bazar", "Kazla", "Motihar", "Binodpur", "Alupotti",
        "Boro Kuthi", "Shiroil", "Harian", "Nowhata"
    ]
};

// DOM elements
const districtSelect = document.getElementById('district');
const areaInput = document.getElementById('area');
const areaSuggestions = document.getElementById('area-suggestions');

// Enable/disable area input based on district selection
districtSelect.addEventListener('change', function() {
    if (this.value) {
        areaInput.disabled = false;
        areaInput.placeholder = "Start typing area...";
    } else {
        areaInput.disabled = true;
        areaInput.value = "";
        areaInput.placeholder = "Any Area";
        hideSuggestions();
    }
});

// Show area suggestions when typing
areaInput.addEventListener('input', function() {
    const district = districtSelect.value;
    const input = this.value.toLowerCase();
    
    if (!district || input.length < 1) {
        hideSuggestions();
        return;
    }
    
    const filteredAreas = districtAreas[district].filter(area => 
        area.toLowerCase().includes(input)
    );
    
    showSuggestions(filteredAreas);
});

// Show suggestions dropdown
function showSuggestions(areas) {
    if (areas.length === 0) {
        hideSuggestions();
        return;
    }
    
    areaSuggestions.innerHTML = areas.map(area => 
        `<div class="suggestion-item">${area}</div>`
    ).join('');
    
    // Add click event to suggestions
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            areaInput.value = this.textContent;
            hideSuggestions();
        });
    });
    
    areaSuggestions.style.display = 'block';
}

// Hide suggestions dropdown
function hideSuggestions() {
    areaSuggestions.style.display = 'none';
}

// Hide suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.id !== 'area') {
        hideSuggestions();
    }
});
// code for search system end here 