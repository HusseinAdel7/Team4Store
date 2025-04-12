document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('paymentForm');
    const cardNumber = document.getElementById('cardNumber');
    const cardName = document.getElementById('cardName');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const cardPreview = document.querySelector('.card-number');
    const cardHolderPreview = document.querySelector('.card-holder');
    const expiryPreview = document.querySelector('.card-expiry');

    // Format card number
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = value;
        cardPreview.textContent = value || '•••• •••• •••• ••••';
    });

    // Format expiry date
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0,2) + '/' + value.slice(2);
        }
        e.target.value = value;
        expiryPreview.textContent = value || 'MM/YY';
    });

    // Update cardholder name preview
    cardName.addEventListener('input', function(e) {
        cardHolderPreview.textContent = e.target.value.toUpperCase() || 'CARDHOLDER NAME';
    });

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Card number validation
        const cardNumberValue = cardNumber.value.replace(/\s/g, '');
        if (!/^\d{16}$/.test(cardNumberValue)) {
            showError('cardNumberError', 'Please enter a valid 16-digit card number');
            isValid = false;
        } else {
            hideError('cardNumberError');
        }

        // Cardholder name validation
        if (!cardName.value.trim()) {
            showError('cardNameError', 'Please enter cardholder name');
            isValid = false;
        } else {
            hideError('cardNameError');
        }

        // Expiry date validation
        const [month, year] = expiryDate.value.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        if (!/^\d{2}\/\d{2}$/.test(expiryDate.value) || 
            parseInt(month) > 12 || 
            parseInt(month) < 1 || 
            (parseInt(year) === currentYear && parseInt(month) < currentMonth) ||
            parseInt(year) < currentYear) {
            showError('expiryDateError', 'Please enter a valid expiry date');
            isValid = false;
        } else {
            hideError('expiryDateError');
        }

        // CVV validation
        if (!/^\d{3}$/.test(cvv.value)) {
            showError('cvvError', 'Please enter a valid 3-digit CVV');
            isValid = false;
        } else {
            hideError('cvvError');
        }

        if (isValid) {
            // Simulate successful payment
            document.getElementById('successMessage').style.display = 'block';
            form.reset();
            cardPreview.textContent = '•••• •••• •••• ••••';
            cardHolderPreview.textContent = 'CARDHOLDER NAME';
            expiryPreview.textContent = 'MM/YY';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 3000);
        }
    });

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function hideError(elementId) {
        document.getElementById(elementId).style.display = 'none';
    }
});
