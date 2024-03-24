import {Cylinder} from "@/views/Lab5/logic";
import {describe, expect, it, beforeEach} from "vitest";

describe("Cylinder", () => {
    let cylinder: Cylinder;

    beforeEach(() => {
        cylinder = new Cylinder(5, 10);
    });

    describe("Constructor", () => {
        it("Initialization", () => {
            expect(cylinder).toBeTruthy();
        });

        // Expecting to throw an error, since negative height is not allowed
        it("Negative height", () => {
            expect(() => new Cylinder(5, -10)).toThrowError();
        });

        // Expecting to throw an error, since negative radius is not allowed
        it("Negative radius", () => {
            expect(() => new Cylinder(-5, 10)).toThrowError();
        });
    });

    // Expecting correct area calculation
    describe("getArea", () => {
        it("Correct area", () => {
            expect(cylinder.getArea()).toBeCloseTo(471.238898);
        });
    });
});
