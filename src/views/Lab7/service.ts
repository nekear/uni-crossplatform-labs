export class FunctionExpCalculatorService {
    public tabulateFunction(start: number, end: number, step: number, method: (x: number) => number): Map<number, number> {
        const values = new Map<number, number>();
        for (let x = start; x <= end; x += step) {
            values.set(x, method(x));
        }
        return values;
    }

    public calculateExpSeries(x: number, terms = 10): number {
        let sum = 1;
        let term = 1;
        for (let i = 1; i <= terms; i++) {
            term *= x / i;
            sum += term;
        }
        return sum;
    }

    public calculateExpRecursive(x: number, terms = 10, sum = 1, i = 1): number {
        if (i > terms) {
            return sum;
        }
        const term = (x / i) * this.calculateExpRecursive(x, terms, 1, i + 1);
        sum += term;
        return sum;
    }

    public logValue(method: string, x: number, value: number): void {
        console.log(`${method}: f(${x}) = ${value}`);
    }
}
