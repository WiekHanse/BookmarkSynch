const TIGERA_URL = 'https://gitpro.hanse-merkur.de/WIEKH/bookmarks/-/raw/main/bookmarks/tigera_bookmarks.json'
const FAST_UNENDLICH = 9999;
const ORDNER_ID = "KF_wbQcJve7P"



async function loadBookmarksfromGit(vorhandeneBookmarks) {
    await fetch(TIGERA_URL)
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
                    console.log(jsonResponse[jsonResponseKey])
                }
                else {
                    browser.bookmarks.create(
                        {
                            "title": jsonResponse[jsonResponseKey].title,
                            "url": jsonResponse[jsonResponseKey].url,
                            "parentId": ORDNER_ID
                        }
                    )
                    console.log(jsonResponse[jsonResponseKey])
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