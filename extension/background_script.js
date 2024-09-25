const REPO_URL = localStorage.getItem('url');
const FAST_UNENDLICH = 9999;
let ORDNER_ID = "";
const ORDNER_NAME = localStorage.getItem('ordnerTitel');
const FOLDER_ROLE = "folder";
const BOOKMARK_ROLE = "bookmark";

async function synchBookmarks(vorhandeneBookmarks) {
    try {
        const response = await fetch(REPO_URL);
        const jsonResponse = await response.json();

        for (const jsonResponseKey in jsonResponse) {
            const bookmark = jsonResponse[jsonResponseKey];
            const existingBookmark = vorhandeneBookmarks.find(e => e.title === bookmark.title);
            if (bookmark.role === FOLDER_ROLE) {
                console.log(bookmark)
                browser.bookmarks.search({title: bookmark.title}).then((results) => {
                    if (results.length > 0) {
                        const folder = results.find(item => !item.url);
                        if (folder) {
                            console.log(`Folder ID: ${folder.id}, ${folder.title}`);
                        } else {
                            browser.bookmarks.create(
                                {
                                    title: bookmark.title,
                                    parentId: ORDNER_ID
                                }
                            )
                            console.log("Test")
                        }
                    } else {
                        browser.bookmarks.create(
                            {
                                title: bookmark.title,
                                parentId: ORDNER_ID
                            }
                        )
                        console.log("Test2")
                    }
                });
            }
            /*
            if (true) {
                if (existingBookmark) {
                    await browser.bookmarks.update(existingBookmark.id, {
                        title: bookmark.title,
                        url: bookmark.url
                    });
                } else {
                    await browser.bookmarks.create({
                        title: bookmark.title,
                        url: bookmark.url,
                        parentId: ORDNER_ID
                    });
                }
            }
             */
        }
    } catch (error) {
        console.error('Fehler beim Laden der Bookmarks von Git:', error);
    }
}

async function loadBookmarksfromBrowser() {
    try {
        const recentBookmarks = await browser.bookmarks.getRecent(FAST_UNENDLICH);
        await synchBookmarks(recentBookmarks);
    } catch (error) {
        console.error('Fehler beim Laden der Bookmarks aus dem Browser:', error);
    }
}

async function loadBookmarkOrdner() {
    try {
        const response = await browser.bookmarks.search({title: ORDNER_NAME});
        if (response.length > 0) {
            ORDNER_ID = response[0].id;
            console.log('Ordner ID:', ORDNER_ID);
            await loadBookmarksfromBrowser();
        } else {
            console.warn('Ordner nicht gefunden:', ORDNER_NAME);
        }
    } catch (error) {
        console.error('Fehler beim Laden des Bookmark-Ordners:', error);
    }
}

chrome.commands.onCommand.addListener(function (command) {
    if (command === "toggle-sidebar") {
        chrome.sidebarAction.toggle();
    }
});

function tryFolder() {
    browser.bookmarks.create({
        parentId: 'toolbar_____',
        title: 'Folder Name'
    }).then((newFolder) => {
        console.log(`Added folder: ${newFolder}`);
    });

    browser.bookmarks.search({title: 'Folder Name'}).then((results) => {
        if (results.length > 0) {
            const folder = results.find(item => !item.url);
            if (folder) {
                console.log(`Folder ID: ${folder.id}, ${folder.title}`);
            } else {
                console.log('Folder not found.');
            }
        } else {
            console.log('Folder not found.');
        }
    });
}


//tryFolder()

loadBookmarkOrdner();

/**
 * @todo Unterordner einfuegen --> crerate ohne URL
 * @todo JSON anpassen sodass es das es erkennbar ist ob Bookmark oder nicht und in welchen Ordner
 */
