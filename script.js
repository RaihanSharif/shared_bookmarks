// Import the storage helper so the page can read the available user IDs.
import { getUserIds } from "./storage.js";

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

  // Log the available user IDs for debugging while the app is still in development.
  console.log("Available user IDs:", userIds);
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
    event.preventDefault();

    // Stop the browser from doing a full page refresh on submit.
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

    // Placeholder log for the submitted bookmark data.
    console.log("Bookmark submit:", { url, title, description });

    // Render a bookmark card using the template in the HTML.
    if (bookmarkList && bookmarkTemplate) {
      // Clone the template content so each new bookmark gets its own card.
      const fragment =
        bookmarkTemplate.content.firstElementChild.cloneNode(true);
      fragment.querySelector(".bookmark-title").textContent = title;
      fragment.querySelector(".bookmark-description").textContent = description;
      fragment.querySelector(".bookmark-link").textContent = url;
      fragment.querySelector(".bookmark-link").href = url;
      bookmarkList.appendChild(fragment);
    }
  });
}
