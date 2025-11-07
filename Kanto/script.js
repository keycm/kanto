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

});