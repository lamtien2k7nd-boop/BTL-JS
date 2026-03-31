function dropdown(){
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-content');
        const icon = dropdown.querySelector('i');

        if (!btn || !menu) return;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            menu.classList.toggle('show');
        });
        icon.addEventListener('click', (e) => {
        e.preventDefault();
        menu.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                menu.classList.remove('show');
            }
        });
    });
}
function carousel(){
    // Tìm tất cả các track
    const allTracks = document.querySelectorAll('.track');
    
    allTracks.forEach(track => {
        const cards = track.querySelectorAll('.card');
        let index = 0;
        const visible = 4;
        const total = cards.length;

        // Tìm container của track này
        const tabPanel = track.closest('.tab-panel');
        const container = tabPanel || track.closest('.tab-content') || track.closest('.SPT-container');
        
        if (!container || total === 0) return;

        // Tìm button prev/next trong container
        const nextBtn = container.querySelector('button.next');
        const prevBtn = container.querySelector('button.prev');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                index++;
                if (index > total - visible) {
                    index = 0;
                }
                update();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                index--;
                if (index < 0) {
                    index = total - visible;
                }
                update();
            });
        }

        function update() {
            if (cards.length === 0) return;
            const cardWidth = cards[0].offsetWidth;
            const offset = index * cardWidth;
            track.style.transform = `translateX(-${offset}px)`;
        }
    });
}

function run(){
    dropdown();
    carousel();
}
run();