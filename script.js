document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.querySelector('.form-next-btn');
    const prevBtn = document.querySelector('.form-prev-btn');
    const confirmBtn = document.querySelector('.form-confirm-btn');
    const formPages = document.querySelectorAll('.form-page');
    const guestInfo = document.getElementById('guest-info');
    const dateInfo = document.getElementById('date-info');
    const timeInfo = document.getElementById('time-info');
    const guestsSelect = document.getElementById('form-guests');
    const dateInput = document.getElementById('form-date');
    const timeSelect = document.getElementById('form-time');
    const checkboxes = document.querySelectorAll('.form-checkbox-container input');
    let currentPage = 0;

    // Function to switch form pages with fade and scale animation
    function goToPage(pageIndex) {
        if (pageIndex < 0 || pageIndex >= formPages.length) return; // Ensure valid page index

        // Add 'exiting' class to the current page for the transition effect
        formPages[currentPage].classList.add('exiting');
        formPages[currentPage].addEventListener('transitionend', function handleTransition() {
            formPages[currentPage].classList.remove('active', 'exiting');
            formPages[currentPage].removeEventListener('transitionend', handleTransition);

            currentPage = pageIndex; // Update current page index
            formPages[currentPage].classList.add('active'); // Make the new page active

            // If moving to the second page, update guest, date, and time info
            if (currentPage === 1) {
                guestInfo.textContent = `Antal Gæster: ${guestsSelect.value}`;
                dateInfo.textContent = `Dato: ${dateInput.value}`;
                timeInfo.textContent = `Tidspunkt: ${timeSelect.value}`;
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        goToPage(1); // Move to the second page
    });

    prevBtn.addEventListener('click', () => {
        goToPage(0); // Move back to the first page
    });

    const formInputs = document.querySelectorAll('#form-name, #form-phone, #form-email');

    formInputs.forEach(input => {
        input.addEventListener('input', validateForm);
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateForm);
    });

    function validateForm() {
        const allFilled = [...formInputs].every(input => input.value.trim() !== '');
        const termsChecked = document.getElementById('form-terms').checked;

        if (allFilled && termsChecked) {
            confirmBtn.removeAttribute('disabled');
            confirmBtn.classList.add('enabled');
        } else {
            confirmBtn.setAttribute('disabled', 'true');
            confirmBtn.classList.remove('enabled');
        }
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    
    dateInput.min = minDate; // Set the minimum date
});