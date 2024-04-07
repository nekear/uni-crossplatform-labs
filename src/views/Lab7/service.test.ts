import {describe, expect, it, vi} from 'vitest';
import {FunctionExpCalculatorService} from './service';

describe('FunctionExpCalculatorService', () => {
    const calculator = new FunctionExpCalculatorService();

    describe('tabulateFunction', () => {
        it('Should tabulate the function correctly', () => {
            const method = (x: number) => x * x;
            const values = calculator.tabulateFunction(1, 5, 1, method);
            expect(values).toEqual(new Map([[1, 1], [2, 4], [3, 9], [4, 16], [5, 25]]));
        });
    });

    describe('calculateExpSeries', () => {
        it('Should calculate the exponential function using series expansion', () => {
            expect(calculator.calculateExpSeries(0)).toBeCloseTo(1);
            expect(calculator.calculateExpSeries(1)).toBeCloseTo(Math.E);
            expect(calculator.calculateExpSeries(2)).toBeCloseTo(Math.exp(2));
        });
    });

    describe('calculateExpRecursive', () => {
        it('Should calculate the exponential function using recursion', () => {
            expect(calculator.calculateExpRecursive(0)).toBeCloseTo(1);
            expect(calculator.calculateExpRecursive(1)).toBeCloseTo(Math.E);
            expect(calculator.calculateExpRecursive(2)).toBeCloseTo(Math.exp(2));
        });
    });

    describe('logValue', () => {
        it('Should log the calculated value with the method name', () => {
            const spy = vi.spyOn(console, 'log');
            calculator.logValue('Test', 1, 2);
            expect(spy).toHaveBeenCalledWith('Test: f(1) = 2');
            spy.mockRestore();
        });
    });
});