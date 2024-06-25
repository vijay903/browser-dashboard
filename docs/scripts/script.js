const greeting = () => {
    const date = new Date();
    const hours = date.getHours();
    let greeting = '';
    if(hours >= 16) {
        greeting = 'Good Evening!';
    } else if(hours >= 12) {
        greeting = 'Good Afternoon!';
    } else {
        greeting = 'Good Morning!';
    }
    document.querySelector('.greeting-container .greeting').textContent = greeting;
}

const timer = () => {
    const el = document.querySelector('.timer-container .timer');
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    setInterval(() => {
        const date = new Date();
        const timeString = date.toLocaleString('en-US', options);
        el.textContent = timeString;
    }, 1000);
}

const init = () => {
    greeting();
    timer();
}

init();

