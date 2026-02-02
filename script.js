// Appointment Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const dateInput = document.getElementById('date');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        // Show success message
        showSuccessMessage();

        // Reset form
        form.reset();

        // In a real application, you would send this data to a server
        console.log('Appointment request:', formData);
    });

    // Form validation
    function validateForm(data) {
        // Check if date is not a Sunday or Monday (closed days)
        const selectedDate = new Date(data.date);
        const dayOfWeek = selectedDate.getDay();

        if (dayOfWeek === 0) { // Sunday
            alert('Beklager, vi er stengt på søndager. Vennligst velg en annen dag.');
            return false;
        }

        if (dayOfWeek === 6) { // Saturday
            alert('Beklager, vi er stengt på lørdager. Vennligst velg en annen dag.');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Vennligst oppgi en gyldig e-postadresse.');
            return false;
        }

        // Validate phone number (Norwegian format)
        const phoneRegex = /^[\d\s\-+()]{8,}$/;
        if (!phoneRegex.test(data.phone)) {
            alert('Vennligst oppgi et gyldig telefonnummer.');
            return false;
        }

        return true;
    }

    // Show success message
    function showSuccessMessage() {
        // Create success message if it doesn't exist
        let successMsg = document.querySelector('.success-message');
        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <h3>Takk for din forespørsel!</h3>
                <p>Vi tar kontakt med deg så snart som mulig for å bekrefte timen din.</p>
            `;
            form.parentNode.insertBefore(successMsg, form.nextSibling);
        }

        successMsg.classList.add('show');

        // Scroll to success message
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hide after 5 seconds
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
