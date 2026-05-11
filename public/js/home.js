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



function run(){
    dropdown();

}
run();