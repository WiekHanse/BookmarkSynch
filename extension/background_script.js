const TIGERA_DEV_URL = 'http://localhost:8080/getBookmarksDev'

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

//todo --> ID der Bookmarks