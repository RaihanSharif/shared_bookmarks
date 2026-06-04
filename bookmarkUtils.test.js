import {
    createBookmark,
    getBookmarks,
    addBookmark,
    removeBookmark,
    likeBookmark,
} from "./bookmarkUtils.js";

import { getData, setData } from "./storage.js"; // used for mocking
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
            createdAt: expect.any(Number), // Simpler to test that a date exists
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

    // Must wrap in function so jest's expect can catch the thrown error
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
    // mMst clear mocks so that after each test so that
    // 'localStorage' is cleared, and does not interfere with next test
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

describe("addBookmark function", () => {
    afterEach(jest.clearAllMocks);

    test("stores bookmark in localStorage for the correct user", () => {
        getData.mockReturnValue([]); // mocks empty initial bookmarks array

        addBookmark("1", "Title", "Desc", "https://a.com");

        // Using arrayContaining, objectContaining
        // allows us to test that some array with some object with url
        // is created without having to check all the specifics of the bookmark object
        expect(setData).toHaveBeenCalledWith(
            "1",
            expect.arrayContaining([
                expect.objectContaining({ url: "https://a.com" }),
            ]),
        );
    });

    test("does not store bookmark under a different user", () => {
        getData.mockReturnValue([]);

        addBookmark("1", "Title", "Desc", "https://a.com");

        // ensure setData is only called once and only with the right userId as key
        expect(setData).toHaveBeenCalledTimes(1);
        expect(setData).toHaveBeenCalledWith("1", expect.anything());
    });

    test("throws if bookmark URL already exists for that user", () => {
        const existing = [{ url: "https://a.com" }];
        getData.mockReturnValue(existing);

        expect(() =>
            addBookmark("1", "Title", "Desc", "https://a.com"),
        ).toThrow("Bookmark already exists");
    });

    test("allows same URL for a different user", () => {
        // set up a mock implementation of getData, to simulate that user 1 has same url
        // as the one that will be saved to user 2
        getData.mockImplementation((userId) => {
            if (userId === "1") return [{ url: "https://a.com" }];
            return [];
        });

        // should not throw duplicatation error
        expect(() =>
            addBookmark("2", "Title", "Desc", "https://a.com"),
        ).not.toThrow();

        // should store data for user 2
        expect(setData).toHaveBeenCalledWith(
            "2",
            expect.arrayContaining([
                expect.objectContaining({ url: "https://a.com" }),
            ]),
        );
    });
});

describe("likeBookmark function", () => {
    afterEach(jest.clearAllMocks);

    test("increments likeCount for the correct bookmark", () => {
        const bookmarks = [{ url: "https://a.com", likeCount: 0 }];
        getData.mockReturnValue(bookmarks);

        likeBookmark("1", "https://a.com");

        expect(setData).toHaveBeenCalledWith(
            "1",
            expect.arrayContaining([
                expect.objectContaining({ url: "https://a.com", likeCount: 1 }),
            ]),
        );
    });

    test("does not increment likeCount for other bookmarks", () => {
        const bookmarks = [
            { url: "https://a.com", likeCount: 0 },
            { url: "https://b.com", likeCount: 0 },
        ];
        getData.mockReturnValue(bookmarks);

        likeBookmark("1", "https://a.com");

        expect(setData).toHaveBeenCalledWith(
            "1",
            expect.arrayContaining([
                expect.objectContaining({ url: "https://b.com", likeCount: 0 }), // the unedited bookmark
            ]),
        );
    });

    test("throws if bookmark is not found", () => {
        getData.mockReturnValue([{ url: "https://a.com", likeCount: 0 }]);

        expect(() => likeBookmark("1", "https://b.com")).toThrow(
            "Bookmark not found",
        );
    });

    test("does not save data if bookmark is not found", () => {
        getData.mockReturnValue([]);

        expect(() => likeBookmark("1", "https://a.com")).toThrow();
        expect(setData).not.toHaveBeenCalled(); // does not call setData on some unspecifed userId, URL
    });
});
