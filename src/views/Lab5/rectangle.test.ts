import {Rectangle} from "@/views/Lab4/logic";
import {beforeEach, describe, expect, it} from "vitest";

describe("Rectangle", () => {
    let rectangle: Rectangle;

    beforeEach(() => {
        rectangle = new Rectangle(5, 10);
    });

    describe("Constructor", () => {
        it("Initialization", () => {
            expect(rectangle).toBeTruthy();
        });

        // Expecting to throw an error, since negative width is not allowed
        it("Negative width", () => {
            expect(() => new Rectangle(-5, 10)).toThrowError();
        });

        // Expecting to throw an error, since negative height is not allowed
        it("Negative height", () => {
            expect(() => new Rectangle(5, -10)).toThrowError();
        });
    });

    // Expecting correct area calculation
    describe("getArea", () => {
        it("Correct area", () => {
            expect(rectangle.getArea()).toBeCloseTo(50);
        });
    });
});
