import {Square} from "@/views/Lab4/logic";
import {beforeEach, describe, expect, it} from "vitest";

describe("Square", () => {
    let square: Square;

    beforeEach(() => {
        square = new Square(5);
    });

    describe("Constructor", () => {
        it("Initialization", () => {
            expect(square).toBeTruthy();
        });

        // Expecting to throw an error, since negative side length is not allowed
        it("Negative side length", () => {
            expect(() => new Square(-5)).toThrowError();
        });
    });

    // Expecting correct area calculation
    describe("getArea", () => {
        it("Correct area", () => {
            expect(square.getArea()).toBeCloseTo(25);
        });
    });
});
