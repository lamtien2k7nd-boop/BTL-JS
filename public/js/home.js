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
            const cardStyle = getComputedStyle(cards[0]);
            const cardWidth = cards[0].offsetWidth +
                parseFloat(cardStyle.marginLeft) +
                parseFloat(cardStyle.marginRight);
            const offset = index * cardWidth;
            track.style.transform = `translateX(-${offset}px)`;
        }
    });
}
// ========== LOGIN/SIGNUP POP UP LOGIC ==========
let currentViewId = 'view-general';
let isAnimating = false;

function openModal() {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.classList.add('active');
}

function closeModal() {
    const overlay = document.getElementById('overlay');
    if (!overlay) return;
    
    overlay.classList.remove('active');
    
    // Reset to general page after closing
    setTimeout(() => {
        if(currentViewId !== 'view-general') {
            resetToGeneral();
        }
    }, 500);
}

function switchView(targetViewId) {
    const modal = document.getElementById('mainModal');
    const backBtn = document.getElementById('back-btn');
    
    if (!modal || isAnimating || currentViewId === targetViewId) return;
    
    isAnimating = true;
    const currentView = document.getElementById(currentViewId);
    const targetView = document.getElementById(targetViewId);

    if (!currentView || !targetView) {
        isAnimating = false;
        return;
    }

    // 1. FADE OUT current view
    currentView.style.opacity = '0';
    if (backBtn) backBtn.style.opacity = '0';

    setTimeout(() => {
        // Fix current height for smooth resize
        const startHeight = modal.offsetHeight;
        modal.style.height = startHeight + 'px';

        // Toggle display
        currentView.style.display = 'none';
        
        if (targetViewId === 'view-general') {
            targetView.style.display = 'flex';
            modal.classList.remove('mode-form');
            if (backBtn) backBtn.style.display = 'none';
        } else {
            targetView.style.display = 'block';
            modal.classList.add('mode-form');
            if (backBtn) backBtn.style.display = 'block';
        }

        // Calculate new height
        modal.style.height = 'auto';
        const endHeight = modal.offsetHeight;
        
        // Return to old height for animation start
        modal.style.height = startHeight + 'px';
        void modal.offsetHeight; // force reflow

        // 2. RESIZE BOX
        modal.style.height = endHeight + 'px';

        setTimeout(() => {
            // 3. FADE IN new view
            modal.style.height = 'auto';
            targetView.style.opacity = '1';
            
            if (targetViewId !== 'view-general' && backBtn) {
                backBtn.style.opacity = '1';
            }

            currentViewId = targetViewId;
            isAnimating = false;

        }, 500);
    }, 300);
}

function resetToGeneral() {
    const modal = document.getElementById('mainModal');
    const backBtn = document.getElementById('back-btn');
    
    const currentView = document.getElementById(currentViewId);
    const generalView = document.getElementById('view-general');
    
    if (currentView) {
        currentView.style.display = 'none';
        currentView.style.opacity = '0';
    }
    
    if (generalView) {
        generalView.style.display = 'flex';
        generalView.style.opacity = '1';
    }
    
    if (modal) modal.classList.remove('mode-form');
    if (backBtn) {
        backBtn.style.display = 'none';
        backBtn.style.opacity = '0';
    }
    
    currentViewId = 'view-general';
}

function toggleGuestForm() {
    const guestForm = document.getElementById('guest-form');
    if (guestForm) {
        guestForm.classList.toggle('active');
    }
}

function initLoginPopup() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeModal();
        });
    }
    
    // Attach to window so onclick works
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.switchView = switchView;
    window.toggleGuestForm = toggleGuestForm;
}



function run(){
    dropdown();

}
run();