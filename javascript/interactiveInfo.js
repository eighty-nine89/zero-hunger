document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.icon').style.animationPlayState = 'paused';
        item.style.transform = 'scale(1.05)';
    });

    item.addEventListener('mouseleave', () => {
        item.querySelector('.icon').style.animationPlayState = 'running';
        item.style.transform = 'scale(1)';
    });
});
