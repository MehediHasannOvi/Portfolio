toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    onclick: null,
    showDuration: '300',
    hideDuration: '2000',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
};

document.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    if (!fullName || !email || !phone || !message) {
        alert('All Fields are required');
    }
    sendMessage(fullName, email, phone, message);
});

const sendMessage = async (fullName, email, phone, message) => {
    const messageButton = document.getElementById('message-me');
    messageButton.disabled = true;
    messageButton.classList.add('btn-disabled');
    messageButton.innerText = 'Sending message....';

    try {
        const response = await fetch('/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, email, phone, message }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('ERROR', data);
            throw new Error(data.message);
        }

        toastr.success(
            'Your message has been sent successfully. Thank you for contacting',
            'Message'
        );
        document.getElementById('fullName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        document.getElementById('phone').value = '';
    } catch (error) {
        console.error('ERROR', error);
        toastr.error(error?.message, 'ERROR');
    } finally {
        messageButton.classList.remove('btn-disabled');
        messageButton.innerText = 'Message';
        messageButton.disabled = false;
    }
};
