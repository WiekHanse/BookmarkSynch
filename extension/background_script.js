const URL = localStorage.getItem('url');
const FAST_UNENDLICH = 9999;
let ORDNER_ID = "toolbar_____";
const ORDNER_NAME = localStorage.getItem('ordnerTitel');

async function loadBookmarksfromGit(vorhandeneBookmarks) {
    try {
        const response = await fetch(URL);
        const jsonResponse = await response.json();

        for (const jsonResponseKey in jsonResponse) {
            const bookmark = jsonResponse[jsonResponseKey];
            const existingBookmark = vorhandeneBookmarks.find(e => e.title === bookmark.title);

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
    } catch (error) {
        console.error('Fehler beim Laden der Bookmarks von Git:', error);
    }
}

async function loadBookmarksfromBrowser() {
    try {
        const recentBookmarks = await browser.bookmarks.getRecent(FAST_UNENDLICH);
        await loadBookmarksfromGit(recentBookmarks);
    } catch (error) {
        console.error('Fehler beim Laden der Bookmarks aus dem Browser:', error);
    }
}

async function loadBookmarkOrdner() {
    try {
        const response = await browser.bookmarks.search({ title: ORDNER_NAME });
        if (response.length > 0) {
            ORDNER_ID = response[0].id;
            console.log('Ordner ID:', ORDNER_ID);
            await loadBookmarksfromBrowser();
        } else {
            console.log('Ordner nicht gefunden:', ORDNER_NAME);
            console.log('Standartortner:',ORDNER_ID, ' wird verwendet!')
            await loadBookmarksfromBrowser();
        }
    } catch (error) {
        console.error('Fehler beim Laden des Bookmark-Ordners:', error);
    }
}

loadBookmarkOrdner();
