// Import the storage helper so the page can read the available user IDs.
import { addBookmark, getBookmarks } from "./bookmarkUtils.js";
import { clearData, getData, getUserIds } from "./storage.js";

// Grab the main UI elements we will interact with.
const userDropdown = document.getElementById("user-dropdown");
const bookmarkForm = document.getElementById("bookmark-form");
const bookmarkList = document.getElementById("bookmarks-list");
const bookmarkTemplate = document.getElementById("bookmark-card-template");

// Fill the dropdown from the stored user IDs
function populateUserOptions() {
    if (!userDropdown) return;

    const userIds = getUserIds();

    // Reset the dropdown to a neutral placeholder option.
    userDropdown.innerHTML =
        '<option value="" disabled selected>Choose a user...</option>';

    // Create one option per user ID returned by storage.
    userIds.forEach((userId) => {
        const option = document.createElement("option");
        option.value = userId;
        option.textContent = `User ${userId}`;
        userDropdown.appendChild(option);
    });
}

// When the page loads, populate the dropdown first.
if (userDropdown) {
    populateUserOptions();

    // Log the chosen user whenever the dropdown value changes.
    userDropdown.addEventListener("change", (event) => {
        console.log("Selected user ID:", event.target.value);
    });
}

// Handle form submission and add a bookmark card to the list.
if (bookmarkForm) {
    bookmarkForm.addEventListener("submit", (event) => {
        // Stop the browser from doing a full page refresh on submit.
        event.preventDefault();

        // TODO: figure out what this is
        if (!bookmarkForm.checkValidity()) {
            // Let the browser show the built-in validation messages.
            bookmarkForm.reportValidity();
            return;
        }

        // Read the form fields and trim any extra whitespace.
        const url = document.getElementById("bookmark-url").value.trim();
        const title = document.getElementById("bookmark-title").value.trim();
        const description = document
            .getElementById("bookmark-description")
            .value.trim();

        console.log("Bookmark submit:", { url, title, description });

        // get the currently selected user
        const userId = userDropdown.value;

        if (userId) {
            addBookmark(userId, title, description, url);
            // Render a bookmark card using the template in the HTML.
            if (bookmarkList && bookmarkTemplate) {
                // fetch reverse chronological order list of bookmarks for the user
                const bookmarks = getBookmarks(userId);
                showBookmarks(bookmarks);
            }
        } else {
            alert("Please select a user before adding a bookmark");
        }
    });
}

function showBookmarks(bookmarks) {
    const bookmarkElems = bookmarks.map((bm) => {
        const fragment =
            bookmarkTemplate.content.firstElementChild.cloneNode(true);
        fragment.querySelector(".bookmark-description").textContent =
            bm.description;
        const link = fragment.querySelector(".bookmark-link");
        link.textContent = bm.title;
        link.href = bm.url;

        return fragment;
    });
    bookmarkList.replaceChildren(...bookmarkElems);
}

// console.log(getData("1"));
// console.log(getData("2"));
// console.log(getData("3"));
// console.log(getData("4"));
// console.log(getData("5"));
// clearData("1");
// clearData("2");
// clearData("3");
// clearData("4");
// clearData("5");
