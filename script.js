// import helper functions from storage.js for data-related operations
import { getUserIds } from "./storage.js";

// show the available user IDs in the browser console for debugging
console.log("Available user IDs:", getUserIds());

// grab key DOM nodes for the dropdown and the bookmark form
const userDropdown = document.getElementById("user-dropdown");
const bookmarkForm = document.getElementById("bookmark-form");

// wire up the dropdown change event to log the selected user
if (userDropdown) {
  userDropdown.addEventListener("change", (event) => {
    console.log("Selected user ID:", event.target.value);
  });
}

// wire up the form submit event to capture form values and prevent page reload
if (bookmarkForm) {
  bookmarkForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // read the values entered by the user
    const url = document.getElementById("bookmark-url").value.trim();
    const title = document.getElementById("bookmark-title").value.trim();
    const description = document
      .getElementById("bookmark-description")
      .value.trim();

    // placeholder: log the submitted bookmark data
    console.log("Bookmark submit:", { url, title, description });
  });
}
