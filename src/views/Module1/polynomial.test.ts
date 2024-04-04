import {describe, it, expect} from 'vitest';
import {evaluatePolynomial} from "@/views/Module1/logic";

describe('evaluatePolynomial', () => {
    it('Evaluates a constant polynomial correctly', () => {
        const coefficients = [5];
        const x = 2;
        const expected = 5;
        const result = evaluatePolynomial(coefficients, x);
        expect(result).toBe(expected);
    });

    it('Evaluates a linear polynomial correctly', () => {
        const coefficients = [2, 3];
        const x = 2;
        const expected = 8;
        const result = evaluatePolynomial(coefficients, x);
        expect(result).toBe(expected);
    });

    it('Evaluates a quadratic polynomial correctly', () => {
        const coefficients = [1, 2, 1];
        const x = 3;
        const expected = 16;
        const result = evaluatePolynomial(coefficients, x);
        expect(result).toBe(expected);
    });

    it('Evaluates a cubic polynomial correctly', () => {
        const coefficients = [2, -3, 1, 4];
        const x = -2;
        const expected = -20;
        const result = evaluatePolynomial(coefficients, x);
        expect(result).toBe(expected);
    });

    it('Evaluates a polynomial with negative coefficients correctly', () => {
        const coefficients = [1, 1, 1, 1, 1];
        const x = 3;
        const expected = 121;
        const result = evaluatePolynomial(coefficients, x);
        expect(result).toBe(expected);
    });
});