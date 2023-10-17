document.addEventListener('DOMContentLoaded', () => {
    const storyWrapper = document.querySelector('#full-story');
    const storyToggle = document.querySelector('#full-story-toggle');

    if (!storyWrapper || !storyToggle) return;

    storyToggle.addEventListener('click', () => {
        storyWrapper.classList.toggle('open');
    });
});
