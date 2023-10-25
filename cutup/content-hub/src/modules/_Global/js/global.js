document.addEventListener('DOMContentLoaded', () => {
    const hamburgerToggle = document.querySelector('#header-mobile-menu-toggle');
    const mobileMenu = document.querySelector('#header-mobile-menu');
    const mobileMenuItems = mobileMenu.querySelectorAll('a');

    mobileMenuItems.forEach((item) => {
        item.setAttribute('tabindex', '-1');
    });

    if (!hamburgerToggle || !mobileMenu) return;

    hamburgerToggle.addEventListener('click', () => {
        hamburgerToggle.classList.toggle('active');
        hamburgerToggle.setAttribute('aria-expanded', hamburgerToggle.classList.contains('active'));
        mobileMenu.classList.toggle('su-hidden');

        if (hamburgerToggle.classList.contains('active')) {
            mobileMenuItems.forEach((item) => {
                item.setAttribute('tabindex', '0');
            });
        } else {
            mobileMenuItems.forEach((item) => {
                item.setAttribute('tabindex', '-1');
            });
        }
    });
});

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
        const searchInput = select.classList.contains('c-select--search') ? select.querySelector('input') : null;

        const resetSearch = () => {
            if (!searchInput) return;
            searchInput.value = '';
            listElements.forEach((listItem) => {
                listItem.classList.remove('su-hidden');
            });
        };

        const handleItemClick = (listItem, event) => {
            event.target.blur();
            wrapper.classList.toggle('open');
            buttonText.innerHTML = listItem.innerText;
            selectInput.value = listItem.dataset.value;
            if (searchInput) resetSearch();
            selectOptions.forEach((option) => {
                if (option.value === listItem.dataset.value) {
                    option.setAttribute('selected', '');
                } else {
                    option.removeAttribute('selected');
                }
            });
            selectInput.dispatchEvent(new Event('change'));
        };

        document.addEventListener('click', (event) => {
            if (!wrapper.contains(event.target)) {
                wrapper.classList.remove('open');
                toggleOpen(false, button, list, listElements);
                if (searchInput) resetSearch();
            }
        });

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const searchValue = searchInput.value.toLowerCase();
                listElements.forEach((listItem) => {
                    if (listItem.innerText.toLowerCase().indexOf(searchValue) > -1) {
                        listItem.classList.remove('su-hidden');
                    } else {
                        listItem.classList.add('su-hidden');
                    }
                });
            });
        }

        button.addEventListener('click', () => {
            wrapper.classList.toggle('open');
            if (wrapper.classList.contains('open')) {
                toggleOpen(true, button, list, listElements);
                if (searchInput) searchInput.focus();
            } else {
                toggleOpen(false, button, list, listElements);
                resetSearch();
            }
        });

        listElements.forEach((listItem) => {
            listItem.addEventListener('keydown', (event) => {
                if (event.keyCode === 13) {
                    handleItemClick(listItem, event);
                }
            });
            listItem.addEventListener('click', (event) => {
                handleItemClick(listItem, event);
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
