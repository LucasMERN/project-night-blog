const switcher = document.querySelector('#theme-switcher'); // select the switcher

switcher.addEventListener('input', e =>
setTheme(e.target.value))
// set the theme on input and save to local storage

const setTheme = theme => {
    document.documentElement.setAttribute('color-scheme', theme);
    localStorage.setItem('color-scheme', theme);
}
// set the theme on load
setTheme(localStorage.getItem('color-scheme') || 'auto');
