import {
    createBookmark,
    getBookmark,
    addBookmark,
    removeBookmark,
    likeBookmark,
} from "./bookmarkUtils.js";

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
            createdAt: expect.any(Number),
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

    test("throws if description exceeds 500 characters", () => {
        expect(() =>
            createBookmark(validTitle, "a".repeat(501), validUrl),
        ).toThrow("Description must be under 500 characters");
    });

    test("throws if url is invalid", () => {
        expect(() =>
            createBookmark(validTitle, validDescription, "bbc."),
        ).toThrow("Invalid URL");
    });
});
