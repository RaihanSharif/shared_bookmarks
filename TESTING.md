# Tests for each assignment rubric are listed below

#### Website must contain a dropdown which lists five users
We fetched the list of users from localStorage using `getUserIds() from the provided storage file.
We also manually tested this feature. 
<img width="683" height="626" alt="Screenshot 2026-06-04 at 12 13 44" src="https://github.com/user-attachments/assets/fac9af0c-a0ea-4f10-98b5-49144af29df3" />


#### Selecting a user must display a list of bookmarks for the relevant user
We tested the fetching of the bookmarks from localStorage using unit tests, and then manually confirmed on the UI. 
The unit tests can be found in the file [bookmarkUtils.test.js](./bookmarkUtils.test.js)!


### If there are no bookmarks for the selected user, a messsage is displayed to explain this
We testing fetching data from localStorage using unit tests, and tested the UI manually.
The message at the bottom "There are no boomarks for user 3" is shown for user 3 in the screenshot below.
<img width="484" height="494" alt="Screenshot 2026-06-04 at 12 16 57" src="https://github.com/user-attachments/assets/f0320acb-c65b-41f2-8730-c62e6c608a74" />

### The list of bookmarks must be shown in reverse chronological order
We tested the chronological order of the bookmarks using unit tests. Also verified manually. 
As you can see below:
<img width="681" height="601" alt="Screenshot 2026-06-04 at 12 21 28" src="https://github.com/user-attachments/assets/178295e5-b4fb-4328-b962-203ee8a08bda" />


### Each bookmark has a title, description and created at timestamp displayed
Tested using unit tests. Unit tests also for input validation. Also visually confirmed. 
<img width="634" height="181" alt="Screenshot 2026-06-04 at 12 23 20" src="https://github.com/user-attachments/assets/84558f36-e806-47f2-9b0c-2f875c0b3fa3" />


### Each bookmark’s title is a link to the bookmark’s URL
Tested with unit test and visual inspection.
<img width="1233" height="292" alt="Screenshot 2026-06-04 at 12 24 06" src="https://github.com/user-attachments/assets/102f0ab2-8ab0-49b3-a001-f16eae1d9b88" />

### Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark
Tested visually, and with alert message. See screenshot:
<img width="1221" height="701" alt="Screenshot 2026-06-04 at 12 25 02" src="https://github.com/user-attachments/assets/27cce5b5-5c8c-46f9-a3b8-890639c8f680" />


### Each bookmark's like counter works independently, and persists data across sessions
Tested the like incrementing using unit tests and visual inspection. 

### The website must contain a form with inputs for a URL, a title, and a description. The form should have a submit button.
Form has necessary validation. Will not submit if a valid user is not selected. Form can be navigated and submitted by keyboard.
<img width="641" height="235" alt="Screenshot 2026-06-04 at 12 26 30" src="https://github.com/user-attachments/assets/2df7c674-e902-4988-b122-53d9277ca0d5" />


### Submitting the form adds a new bookmark for the relevant user only
Tested using unit tests which can be found at [bookmarkUtils.test.js](./bookmarkUtils.test.js)!

### After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark
Tested visually. Checked for all users in case creating a bookmark for one user accidentally shows a different user's bookmarks.

### The website must score 100 for accessibility in Lighthouse
With bookmarks loaded:
<img width="1234" height="649" alt="Screenshot 2026-06-04 at 12 31 02" src="https://github.com/user-attachments/assets/54b25a91-b147-493e-a891-7f90375daa76" />

With no bookmarks:
<img width="1238" height="639" alt="Screenshot 2026-06-04 at 12 31 40" src="https://github.com/user-attachments/assets/9a10367a-acf9-407d-a119-5ae5c5e61de7" />


#### Unit tests must be written for at least one non-trivial function
Unit tests were written for all functions that access or edit localStorage data.
This incldues:
- Creating a new bookmark object before storage
- Storing a newly created bookmark in localStorage
- Accessing the list of bookmarks of a given user
- Adding likes to a specific bookmark

These can all be found in the file: [bookmarkUtils.test.js](./bookmarkUtils.test.js)!
