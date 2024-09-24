const URL = 'https://gitpro.hanse-merkur.de/WIEKH/bookmarks/-/raw/main/bookmarks/bookmarks.json'
const FAST_UNENDLICH = 9999;
const ORDNER_ID = "toolbar_____"



async function loadBookmarksfromGit(vorhandeneBookmarks) {
    await fetch(URL)
        .then(response => response.json())
        .then(jsonResponse => {
            for (const jsonResponseKey in jsonResponse) {
                if (vorhandeneBookmarks.find(e => e.title === jsonResponse[jsonResponseKey].title)) {
                    let eintrag = vorhandeneBookmarks.find(e => e.title === jsonResponse[jsonResponseKey].title)
                    browser.bookmarks.update(
                        eintrag.id,
                        {
                            "title": jsonResponse[jsonResponseKey].title,
                            "url": jsonResponse[jsonResponseKey].url
                        }
                    )
                }
                else {
                    browser.bookmarks.create(
                        {
                            "title": jsonResponse[jsonResponseKey].title,
                            "url": jsonResponse[jsonResponseKey].url,
                            "parentId": ORDNER_ID
                        }
                    )
                }
            }
        })
}


async function loadBookmarksfromBrowser() {
    await browser.bookmarks.getRecent(FAST_UNENDLICH)
        .then(response =>
        {
            loadBookmarksfromGit(response)
        })
}

loadBookmarksfromBrowser()