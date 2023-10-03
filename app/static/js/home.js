const getAboutUsButton = document.getElementById('about-us-button');
const getHomeBorder = document.getElementById('home-border');
const getStartedButton = document.getElementById('get-started-button');

getStartedButton.addEventListener('click', () => {
    window.location.href = '/chat';
});

getAboutUsButton.addEventListener('click', () => {
    window.location.href = '/about';
});