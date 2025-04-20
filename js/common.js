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
