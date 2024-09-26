const REPO_URL = localStorage.getItem('url');
const FAST_UNENDLICH = 9999;
let ORDNER_ID = "";
const ORDNER_NAME = localStorage.getItem('ordnerTitel');
const FOLDER_ROLE = "folder";
const BOOKMARK_ROLE = "bookmark";
const DEFAULT_FOLDER = "default";
let UNTER_ORDNER_ID = "";

async function synchBookmarks(vorhandeneBookmarks) {
    try {
        const response = await fetch(REPO_URL);
        const jsonResponse = await response.json();

        for (const bookmark of jsonResponse) {
            const existingBookmark = vorhandeneBookmarks.find(e => e.title === bookmark.title);

            if (bookmark.role === FOLDER_ROLE) {
                const result = await browser.bookmarks.search({ title: bookmark.title });
                const folder = result.find(item => !item.url);

                if (folder) {
                    console.log("folder found");
                } else {
                    await browser.bookmarks.create({
                        title: bookmark.title,
                        parentId: ORDNER_ID
                    });
                    console.log("folder created");
                }
            }

            if (bookmark.role === BOOKMARK_ROLE) {
                const parentFolder = bookmark.parentFolder
                console.log(parentFolder)
                if (parentFolder === DEFAULT_FOLDER) {
                    const result = await browser.bookmarks.search({ title: bookmark.title });
                    const existing = result.find(item => item.url);

                    if (existing) {
                        await browser.bookmarks.update(existing.id, {
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
                } else {
                    const result = await browser.bookmarks.search({ title: bookmark.title });
                    const existing = result.find(item => item.url);

                    const response = await browser.bookmarks.search({title: bookmark.parentFolder});
                    if (response.length > 0) {
                        UNTER_ORDNER_ID = response[0].id;
                    } else {
                        console.warn('Ordner nicht gefunden:', ORDNER_NAME);
                    }

                    if (existing) {
                        await browser.bookmarks.update(existing.id, {
                            title: bookmark.title,
                            url: bookmark.url
                        });
                    } else {
                        await browser.bookmarks.create({
                            title: bookmark.title,
                            url: bookmark.url,
                            parentId: UNTER_ORDNER_ID
                        });
                    }
                }
            }
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

loadBookmarkOrdner();

/**
 * @todo Unterordner einfuegen --> crerate ohne URL
 * @todo JSON anpassen sodass es das es erkennbar ist ob Bookmark oder nicht und in welchen Ordner
 */
