const overlay = document.getElementById('overlay');
const modal = document.getElementById('mainModal');
const backBtn = document.getElementById('back-btn');

let currentViewId = 'view-general';
let isAnimating = false; // Ngăn người dùng click liên tục khi đang chạy animation

// Mở Modal
function openModal() {
    overlay.classList.add('active');
}

// Đóng Modal
function closeModal() {
    overlay.classList.remove('active');
    
    // Reset về trang general khi đóng (tuỳ chọn)
    setTimeout(() => {
        if(currentViewId !== 'view-general') {
            resetToGeneral();
        }
    }, 500);
}

// Đóng khi click ra ngoài
overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
});

// Logic: Fade Out -> Resize -> Fade In
function switchView(targetViewId) {
    if (isAnimating || currentViewId === targetViewId) return;
    
    isAnimating = true;
    const currentView = document.getElementById(currentViewId);
    const targetView = document.getElementById(targetViewId);

    // 1. FADE OUT nội dung hiện tại
    currentView.style.opacity = '0';
    backBtn.style.opacity = '0';

    setTimeout(() => {
        // Cố định chiều cao hiện tại trước khi thay đổi nội dung để resize mượt mà
        const startHeight = modal.offsetHeight;
        modal.style.height = startHeight + 'px';

        // Đổi display
        currentView.style.display = 'none';
        
        if (targetViewId === 'view-general') {
            targetView.style.display = 'flex';
            modal.classList.remove('mode-form');
            backBtn.style.display = 'none';
        } else {
            targetView.style.display = 'block';
            modal.classList.add('mode-form');
            backBtn.style.display = 'block';
        }

        // Tính toán chiều cao mới cần thiết cho trang tiếp theo
        modal.style.height = 'auto'; // Thả auto để trình duyệt tính toán
        const endHeight = modal.offsetHeight;
        
        // Trả lại chiều cao cũ ngay lập tức để chuẩn bị chạy animation
        modal.style.height = startHeight + 'px';
        
        // Force reflow (ép trình duyệt cập nhật layout)
        void modal.offsetHeight;

        // 2. RESIZE BOX (Kích hoạt CSS transition cho height và width)
        modal.style.height = endHeight + 'px';

        setTimeout(() => {
            // 3. FADE IN nội dung mới
            modal.style.height = 'auto'; // Thả auto lại để đáp ứng giao diện responsive
            targetView.style.opacity = '1';
            
            if (targetViewId !== 'view-general') {
                backBtn.style.opacity = '1';
            }

            currentViewId = targetViewId;
            isAnimating = false;

        }, 500); // Đợi 500ms cho animation resize (width/height) hoàn thành

    }, 300); // Đợi 300ms cho animation Fade Out hoàn thành
}

// Hàm hỗ trợ reset nhanh không có delay khi đóng modal
function resetToGeneral() {
    document.getElementById(currentViewId).style.display = 'none';
    document.getElementById(currentViewId).style.opacity = '0';
    
    document.getElementById('view-general').style.display = 'flex';
    document.getElementById('view-general').style.opacity = '1';
    
    modal.classList.remove('mode-form');
    backBtn.style.display = 'none';
    backBtn.style.opacity = '0';
    
    currentViewId = 'view-general';
}