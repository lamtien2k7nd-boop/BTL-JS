document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.tests .card');
    const itemsPerPage = 8;
    const totalPages = Math.ceil(cards.length / itemsPerPage);
    let currentPage = 1;

    const pagesContainer = document.querySelector('.pages');
    
    if(totalPages <= 1) {
        if(pagesContainer && cards.length === 0) {
            pagesContainer.innerHTML = '<p>Không có dữ liệu.</p>';
        } else if (pagesContainer) {
            pagesContainer.style.display = 'none';
        }
        return;
    }

    function renderCards() {
        cards.forEach((card, index) => {
            const start = (currentPage - 1) * itemsPerPage;
            const end = currentPage * itemsPerPage;
            if (index >= start && index < end) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function renderPagination() {
        if (!pagesContainer) return;
        pagesContainer.innerHTML = '';

        // Prev btn
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.innerHTML = '&lt;';
        prevBtn.style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';
        prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                update();
            }
        });
        pagesContainer.appendChild(prevBtn);

        // Define a window of 4 pages to display safely, similar to actual production pages
        let startPage = Math.max(1, currentPage - 1);
        let endPage = startPage + 3;
        if(endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - 3);
        }

        if(startPage > 1) {
            pagesContainer.appendChild(createPageLabel('...'));
        }

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            btn.textContent = i;
            btn.addEventListener('click', () => {
                currentPage = i;
                update();
            });
            pagesContainer.appendChild(btn);
        }

        if(endPage < totalPages) {
            pagesContainer.appendChild(createPageLabel('...'));
        }

        // Next btn
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.innerHTML = '&gt;';
        nextBtn.style.cursor = currentPage === totalPages ? 'not-allowed' : 'pointer';
        nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                update();
            }
        });
        pagesContainer.appendChild(nextBtn);
    }

    function createPageLabel(text) {
        const span = document.createElement('span');
        span.textContent = text;
        return span;
    }

    function update() {
        renderCards();
        renderPagination();
        window.scrollTo({ top: 150, behavior: 'smooth' }); // scroll up smoothly near the grid
    }

    update();
});
