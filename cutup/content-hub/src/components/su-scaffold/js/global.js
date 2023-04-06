(() => {
    document.addEventListener('DOMContentLoaded', function () {
        if (document.querySelector('.currentDate')) {
            const now = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

            [...document.querySelectorAll('.currentDate')].forEach((item) => {
                item.innerHTML = `Today is: ${now}`;
            });
        }
    });
})();
