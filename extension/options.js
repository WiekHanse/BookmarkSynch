document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookmarkForm');
    const messageDiv = document.getElementById('message');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const ordnertitle = document.getElementById('ordnertitle').value;
        const url = document.getElementById('url').value;

        if (url) {
            console.log('URL:', url);
            localStorage.setItem('url', url);
            document.getElementById('url').value = "";
        }

        if (ordnertitle) {
            console.log('Ordnertitel:', ordnertitle);
            localStorage.setItem('ordnerTitel', ordnertitle);
            document.getElementById('ordnertitle').value = "";
        }
        messageDiv.textContent = 'Daten wurden erfolgreich übernommen!';
        messageDiv.style.display = 'block';

        setTimeout(function () {
            messageDiv.style.display = 'none';
            browser.runtime.reload();
        }, 3000);

    });
    document.getElementById('reloadButton').addEventListener('click', () => {
        browser.runtime.reload();
    });
});
