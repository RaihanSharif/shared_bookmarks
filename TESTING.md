# Tests for each assignment rubric are listed below

#### Website must contain a dropdown which lists five users
We fetched the list of users from localStorage using `getUserIds() from the provided storage file.
We also manually tested this feature. 
<img width="683" height="626" alt="Screenshot 2026-06-04 at 12 13 44" src="https://github.com/user-attachments/assets/fac9af0c-a0ea-4f10-98b5-49144af29df3" />


#### Selecting a user must display a list of bookmarks for the relevant user
We tested the fetching of the bookmarks from localStorage using unit tests, and then manually confirmed on the UI. 
The unit tests can be found in the file [bookmarkUtils.test.js](./bookmarkUtils.test.js)!

#### If there are no bookmarks for the selected user, a messsage is displayed to explain this

#### The list of bookmarks must be shown in reverse chronological order

#### Each bookmark has a title, description and created at timestamp displayed

#### Each bookmark’s title is a link to the bookmark’s URL

#### Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark

#### Each bookmark's like counter works independently, and persists data across sessions

#### The website must contain a form with inputs for a URL, a title, and a description. The form should have a submit button.

#### Submitting the form adds a new bookmark for the relevant user only

#### After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark

#### The website must score 100 for accessibility in Lighthouse

#### Unit tests must be written for at least one non-trivial function
