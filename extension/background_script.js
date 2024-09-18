let getBookmark = browser.bookmarks.get("--nhkV63O7Rp");
const URL = 'https://dummy.restapiexample.com/employee'

console.log(getBookmark);

browser.bookmarks.update(
    "--nhkV63O7Rp",
    {
        title: "BG2",
        url: "https://www.youtube.com/watch?v=pekvDs_h-B8"
    }
)

fetch(URL)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))


//todo --> ID der Bookmarks + Speicherort und aenderungen per const einpflegen