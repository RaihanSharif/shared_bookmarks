import {
    createBookmark,
    getBookmarks,
    addBookmark,
    removeBookmark,
    likeBookmark,
} from "./bookmarkUtils.js";

import { getData } from "./storage.js"; // used for mocking
jest.mock("./storage.js");

describe("createBookmark function", () => {
    const validTitle = "test bookmark";
    const validDescription = "this is an example bookmark";
    const validUrl = "https://bbc.co.uk";

    test("given valid input, returns bookmark object", () => {
        expect(
            createBookmark(validTitle, validDescription, validUrl),
        ).toMatchObject({
            title: validTitle,
            description: validDescription,
            url: validUrl,
            likeCount: 0,
            createdAt: expect.any(Number), // simpler to test that a date exists
        });
    });

    test("trims whitespace from inputs", () => {
        const newBookmark = createBookmark(
            "  test bookmark  ",
            "  description  ",
            "  https://bbc.co.uk  ",
        );
        expect(newBookmark).toMatchObject({
            title: "test bookmark",
            description: "description",
            url: "https://bbc.co.uk",
        });
    });

    // must wrap in function so jest's expect can catch the thrown error
    test("throws if title is empty", () => {
        expect(() => createBookmark("", validDescription, validUrl)).toThrow(
            "Title is required",
        );
    });

    test("throws if title exceeds 100 characters", () => {
        expect(() =>
            createBookmark("a".repeat(101), validDescription, validUrl),
        ).toThrow("Title must be under 100 characters");
    });

    test("throws if description is empty", () => {
        expect(() => createBookmark(validTitle, "", validUrl)).toThrow(
            "Description is required",
        );
    });

    test("throws if description exceeds 280 characters", () => {
        expect(() =>
            createBookmark(validTitle, "a".repeat(281), validUrl),
        ).toThrow("Description must be under 280 characters");
    });

    test("throws if url is invalid", () => {
        expect(() =>
            createBookmark(validTitle, validDescription, "bbc."),
        ).toThrow("Invalid URL");
    });
});

describe("getBookmarks function", () => {
    afterEach(jest.clearAllMocks);
    test("returns bookmarks sorted by most recent first", () => {
        const bookmarks = [
            { url: "https://a.com", createdAt: 1000, likeCount: 0 },
            { url: "https://b.com", createdAt: 3000, likeCount: 0 },
            { url: "https://c.com", createdAt: 2000, likeCount: 0 },
        ];
        getData.mockReturnValue(bookmarks);

        const result = getBookmarks("1");
        expect(result[0].url).toBe("https://b.com");
        expect(result[1].url).toBe("https://c.com");
        expect(result[2].url).toBe("https://a.com");
    });

    test("returns empty array if no bookmarks exist", () => {
        getData.mockReturnValue(null);
        expect(getBookmarks("1")).toEqual([]);
    });
});
