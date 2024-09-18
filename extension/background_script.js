const TIGERA_DEV_URL = 'https://gitpro.hanse-merkur.de/WIEKH/bookmarks/-/raw/main/bookmarks/tigera_dev.json'
browser.bookmarks.update(
    "--nhkV63O7Rp",
    {
        title: "test",
        url: "https://www.youtube.com"
    }
)

fetch(TIGERA_DEV_URL)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

//todo --> ID der Bookmarks + Speicherort und aenderungen per const einpflegen