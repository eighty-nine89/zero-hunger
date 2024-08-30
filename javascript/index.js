document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.onboarding-slide');
    const nextBtns = document.querySelectorAll('.next-btn');
    const getStartedBtn = document.querySelector('.get-started-btn');
    let currentSlide = 0;

    nextBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (index + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        });
    });

    getStartedBtn.addEventListener('click', () => {
        // alert('Welcome to Zero Hunger! Start exploring the app.');
        // You can redirect to the main page here
        window.location.href = '../login.html';
    });
});