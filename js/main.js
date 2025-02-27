// code for header start
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    // Set active class on click
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active")); // Remove active from all
            this.classList.add("active"); // Add active to clicked link
        });
    });

    // Preserve active state when refreshing the page
    const currentPage = window.location.pathname.split("/").pop();
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});
// code for header end





// code for tutor section 
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = [
        { inputId: 'divisionInput', listId: 'divisionList', iconId: 'divisionDropdownIcon', clearId: 'clearDivisionSelection' },
        { inputId: 'districtInput', listId: 'districtList', iconId: 'districtDropdownIcon', clearId: 'clearDistrictSelection' },
        { inputId: 'areaInput', listId: 'areaList', iconId: 'areaDropdownIcon', clearId: 'clearAreaSelection' },
        { inputId: 'genderInput', listId: 'genderList', iconId: 'genderDropdownIcon', clearId: 'clearGenderSelection' }
    ];

    dropdowns.forEach(dropdown => {
        const inputField = document.getElementById(dropdown.inputId);
        const dropdownList = document.getElementById(dropdown.listId);
        const dropdownIcon = document.getElementById(dropdown.iconId);
        const clearSelection = document.getElementById(dropdown.clearId);

        inputField.addEventListener('click', () => {
            dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
            dropdownIcon.style.transform = dropdownList.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        clearSelection.addEventListener('click', () => {
            inputField.value = '';
            clearSelection.style.display = 'none';
            dropdownList.style.display = 'none';
            dropdownIcon.style.transform = 'rotate(0deg)';
        });

        document.addEventListener('click', (event) => {
            if (!inputField.parentElement.contains(event.target)) {
                dropdownList.style.display = 'none';
                dropdownIcon.style.transform = 'rotate(0deg)';
            }
        });
    });
});

function selectOption(inputId, value) {
    const inputField = document.getElementById(inputId);
    const clearSelection = document.getElementById(`clear${inputId.charAt(0).toUpperCase() + inputId.slice(1)}Selection`);
    inputField.value = value;
    document.getElementById(inputId.replace('Input', 'List')).style.display = 'none';
    document.getElementById(inputId.replace('Input', 'DropdownIcon')).style.transform = 'rotate(0deg)';
    clearSelection.style.display = 'inline';
}
// code for tutor section
