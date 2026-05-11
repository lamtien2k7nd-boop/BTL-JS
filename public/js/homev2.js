function scrolledHeader() {
    // Lắng nghe sự kiện cuộn
    window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    
    if (window.scrollY > 50) { // Cuộn quá 50px thì thu nhỏ
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    })
};
function run() {
    scrolledHeader()
};
run();