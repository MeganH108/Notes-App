//toggle dark mode
const toggleButton = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check localStorage for previous preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save preference to localStorage
        if(body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });