import { getData, setData } from "./storage.js";

// validate parameters and trim whitespaces. Return an object
// with properties {title, description, url, createdAt, likeCount}
function createBookmark(title, description, url) {
    if (!title || title.trim() === "") throw new Error("Title is required");
    if (title.length > 100)
        throw new Error("Title must be under 100 characters");

    if (!description || description.trim() === "")
        throw new Error("Description is required");

    if (description.length > 500)
        throw new Error("Description must be under 500 characters");

    url = url.trim();
    try {
        new URL(url);
    } catch {
        throw new Error("Invalid URL");
    }

    return {
        title: title.trim(),
        description: description.trim(),
        url,
        createdAt: Date.now(),
        likeCount: 0,
    };
}

// returns array of bookmarks for a given user
// sorted in reverse choronological order
export function getBookmarks(userId) {
    return (getData(userId) ?? []).toSorted(
        (a, b) => b.createdAt - a.createdAt,
    );
}

// if the bookmark does not exist, create it and save it to localStorage
export function addBookmark(userId, title, description, url) {
    const currentBookmarks = getData(userId) ?? []; // ?? [] guard against null
    if (currentBookmarks.some((bm) => bm.url === url)) {
        throw new Error("Bookmark already exists");
    }

    const bookmark = createBookmark(title, description, url);
    currentBookmarks.push(bookmark);
    setData(userId, currentBookmarks);
}

// gets a specific bookmark from localStorage
// updates likeCount and immediately stores in localStorage again
export function likeBookmark(userId, url) {
    const bookmarks = getData(userId) ?? [];
    const bookmark = bookmarks.find((bm) => bm.url === url);
    if (bookmark) {
        bookmark.likeCount += 1;
        setData(userId, bookmarks);
    } else {
        throw new Error("Bookmark not found");
    }
}
