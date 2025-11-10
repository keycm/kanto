document.addEventListener('DOMContentLoaded', () => {

    // Check if the queue table exists before running the script
    const queueTable = document.getElementById('queue-table');
    if (queueTable) {
        
        // Function to update the queue
        function updateQueue() {
            const tableBody = queueTable.querySelector('tbody');
            const rows = tableBody.querySelectorAll('tr');

            let nextRow = tableBody.querySelector('.status-next');
            let ongoingRow = tableBody.querySelector('.status-ongoing');

            // 1. Move "Ongoing" to "Finished" (or remove it)
            if (ongoingRow) {
                // For this demo, we'll just remove it.
                // In a real app, you might move it to a 'completed' list.
                ongoingRow.remove();
            }

            // 2. Move "Next" to "Ongoing"
            if (nextRow) {
                nextRow.cells[2].textContent = 'Ongoing';
                nextRow.cells[2].className = 'status-ongoing';
                nextRow.cells[1].textContent = '12:00pm'; // Set a time
            }

            // 3. Find the first "Standby" and make it "Next"
            const firstStandby = tableBody.querySelector('.status-standby');
            if (firstStandby) {
                firstStandby.cells[2].textContent = 'Next';
                firstStandby.cells[2].className = 'status-next';
            }
            
            // 4. Add a new standby row to keep the list full (optional)
            // This is just to make the demo loop
            if (!firstStandby && !nextRow) {
                // Reset demo if queue is empty
                tableBody.innerHTML = `
                    <tr><td>0004</td><td>10:00am</td><td class="status-ongoing">Ongoing</td></tr>
                    <tr><td>0020</td><td>--:--</td><td class="status-next">Next</td></tr>
                    <tr><td>0005</td><td>--:--</td><td class="status-standby">Standby</td></tr>
                    <tr><td>0011</td><td>--:--</td><td class="status-standby">Standby</td></tr>
                `;
            }
        }

        // Run the update function every 5 seconds
        setInterval(updateQueue, 5000);
    }

    // ==== NEW MODAL JAVASCRIPT ====

    // Get all modals
    const signInModal = document.getElementById('signInModal');
    const registerModal = document.getElementById('registerModal');
    const resetPasswordModal = document.getElementById('resetPasswordModal');
    const reservationModal = document.getElementById('reservationModal');
    const allModals = document.querySelectorAll('.modal-overlay');

    // Get all trigger buttons
    const openSignInBtn = document.getElementById('openSignInModal');
    const openReservationBtn = document.getElementById('openReservationModal');

    // Get all close buttons
    const allCloseBtns = document.querySelectorAll('.modal-close-btn');

    // Get inter-modal links
    const openRegisterLink = document.getElementById('openRegisterFromLogin');
    const openLoginLink = document.getElementById('openLoginFromRegister');
    const openResetLink = document.getElementById('openResetFromLogin');

    // Helper functions
    const openModal = (modal) => {
        if (modal) modal.classList.add('show');
    };

    const closeModal = (modal) => {
        if (modal) modal.classList.remove('show');
    };

    // --- Event Listeners ---

    // Listen for open modal triggers
    if (openSignInBtn) {
        openSignInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(signInModal);
        });
    }

    if (openReservationBtn) {
        openReservationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(reservationModal);
        });
    }

    // Listen for close buttons
    allCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Listen for overlay click to close
    allModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            // Check if the click is on the overlay itself, not the content
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Listen for inter-modal links
    if (openRegisterLink) {
        openRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(signInModal);
            openModal(registerModal);
        });
    }

    if (openLoginLink) {
        openLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(registerModal);
            openModal(signInModal);
        });
    }

    if (openResetLink) {
        openResetLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(signInModal);
            openModal(resetPasswordModal);
        });
    }

});
