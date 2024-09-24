document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookmarkForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const ordnertitle = document.getElementById('ordnertitle').value;
        const url = document.getElementById('url').value;

        if (url) {
            console.log('URL:', url);
            localStorage.setItem('url', url);
            console.log(localStorage.getItem('url'));
        }

        if (ordnertitle) {
            console.log('Ordnertitel:', ordnertitle);
            localStorage.setItem('ordnerTitel', ordnertitle);
            console.log(localStorage.getItem('ordnerTitel'));
        }
    });
});
