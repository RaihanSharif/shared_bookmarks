import {
    createBookmark,
    getBookmark,
    addBookmark,
    removeBookmark,
    likeBookmark,
} from "./bookmarkUtils.js";

describe("createBookmark function", () => {
    // happy case; invalid title, description, or url

    test("given valid input, create bookmark", () => {
        const newBookmark = createBookmark(
            "test bookmark",
            "this is an example bookmark",
            "https://bbc.co.uk",
        );

        const expected = {
            title: "test bookmark",
            description: "this is an example bookmark",
            url: "https://bbc.co.uk",
            likeCount: 0,
            createdAt: expect.any(Number), // no need to test exact date/time value
        };
        expect(newBookmark).toMatchObject(expected);
    });
});
