// Import the storage helper so the page can read the available user IDs.
import { addBookmark, getBookmarks, likeBookmark } from "./bookmarkUtils.js";
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

    // When user selected call showBookmarks function to show list of all
    // bookmarks for that user.
    userDropdown.addEventListener("change", (event) => {
        showBookmarks(event.target.value);
    });
}

// when bookmark form submitted
// check validation, save data to localStorage
// show updated list of bookmarks
if (bookmarkForm) {
    bookmarkForm.addEventListener("submit", (event) => {
        // Stop the browser from doing a full page refresh on submit.
        event.preventDefault();

        // checks that the form input validations are passed
        // or show error message to the user
        // this is necessary because of event.preventDefault()
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

        // get the currently selected user
        const userId = userDropdown.value;

        if (userId) {
            try {
                addBookmark(userId, title, description, url); // throws error if bookmark already exists
            } catch (e) {
                alert(e.message);
            }
            // Render a bookmark card using the template in the HTML.
            if (bookmarkList && bookmarkTemplate) {
                bookmarkForm.reset(); // clears the form fields after successful submission.
                showBookmarks(userId);
            }
        } else {
            alert("Please select a user before adding a bookmark");
        }
    });
}

// fetch data from localStore
// create DOM elements for relevent properties of fetched bookmark Object
// and display them in the bookmark container
function showBookmarks(userId) {
    // fetch reverse chronological order list of bookmarks for the user
    const bookmarks = getBookmarks(userId);
    if (bookmarks.length === 0) {
        bookmarkList.textContent = `There are no bookmarks for user ${userId}`;
        return;
    }
    const bookmarkElems = bookmarks.map((bm) => {
        const fragment =
            bookmarkTemplate.content.firstElementChild.cloneNode(true);
        fragment.querySelector(".bookmark-description").textContent =
            bm.description;

        const link = fragment.querySelector(".bookmark-link");
        link.textContent = bm.title;
        link.href = bm.url;

        let date = new Date(bm.createdAt);

        // format the date. E.g. "Wed, 3 Jun 2026, 23:30"
        date = date.toLocaleString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });

        const createdTime = fragment.querySelector(".created-time");
        createdTime.textContent = `Created at: ${date}`;

        const likeBtn = fragment.querySelector(".likes-btn");
        likeBtn.textContent = `Like bookmark: (${bm.likeCount})`;
        likeBtn.addEventListener("click", (e) => {
            likeBookmark(userId, bm.url);
            showBookmarks(userId);
        });

        const copyBtn = fragment.querySelector(".copy-btn");
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(bm.url);
            alert(`url copied to clipboard: ${bm.url}`);
        });
        return fragment;
    });
    bookmarkList.replaceChildren(...bookmarkElems);
}
