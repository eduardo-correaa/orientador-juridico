document.addEventListener("DOMContentLoaded", () => {

    // Menu Mobile
    const button = document.querySelector('#toggle-menu');
    if (button) {
        button.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
        });
    }

});