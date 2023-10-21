document.addEventListener('DOMContentLoaded', () => {
    const toggleOpen = (isOpen, button, list, listItems = []) => {
        if (isOpen) {
            button.setAttribute('aria-expanded', 'true');
            list.focus();
            listItems.forEach((listItem) => {
                listItem.setAttribute('tabindex', '0');
            });
            return;
        }
        button.setAttribute('aria-expanded', 'false');
        listItems.forEach((listItem) => {
            listItem.setAttribute('tabindex', '-1');
        });
    };

    const customSelects = document.querySelectorAll('.c-select');
    if (customSelects.length === 0) return;

    customSelects.forEach((select) => {
        const selectInput = select.querySelector('select');
        const selectOptions = selectInput.querySelectorAll('option');
        const wrapper = select.querySelector('.c-wrapper');
        const button = select.querySelector('.c-button');
        const buttonText = select.querySelector('.c-button span');
        const list = select.querySelector('.c-list');
        const listElements = select.querySelectorAll('.c-list li');

        document.addEventListener('click', (event) => {
            if (!wrapper.contains(event.target)) {
                wrapper.classList.remove('open');
                toggleOpen(false, button, list, listElements);
            }
        });

        button.addEventListener('click', () => {
            wrapper.classList.toggle('open');
            if (wrapper.classList.contains('open')) {
                toggleOpen(true, button, list, listElements);
            } else {
                toggleOpen(false, button, list, listElements);
            }
        });

        listElements.forEach((listItem) => {
            listItem.addEventListener('click', () => {
                wrapper.classList.toggle('open');
                buttonText.innerHTML = listItem.innerText;
                selectInput.value = listItem.dataset.value;
                selectOptions.forEach((option) => {
                    if (option.value === listItem.dataset.value) {
                        option.setAttribute('selected', '');
                    } else {
                        option.removeAttribute('selected');
                    }
                });
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sendButtons = document.querySelectorAll('.c-button-send');
    if (sendButtons.length === 0) return;

    sendButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const dialog = button.parentElement.querySelector('.c-dialog-send');

            dialog.addEventListener('click', () => {
                dialog.close();
            });

            dialog.querySelector('.c-dialog-body').addEventListener('click', (e) => {
                e.stopPropagation();
            });

            dialog.querySelectorAll('button').forEach((button) => {
                button.addEventListener('click', () => {
                    dialog.close();
                });
            });

            dialog.showModal();
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const declineButtons = document.querySelectorAll('.c-button-decline');
    if (declineButtons.length === 0) return;

    declineButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const dialog = button.parentElement.querySelector('.c-dialog-decline');

            dialog.addEventListener('click', () => {
                dialog.close();
            });

            dialog.querySelector('.c-dialog-body').addEventListener('click', (e) => {
                e.stopPropagation();
            });

            dialog.querySelectorAll('button').forEach((button) => {
                button.addEventListener('click', () => {
                    dialog.close();
                });
            });

            dialog.addEventListener('close', () => {
                document.body.style.overflowY = 'auto';
            });

            dialog.showModal();
            document.body.style.overflowY = 'hidden';
        });
    });
});
