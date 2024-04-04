export function evaluatePolynomial(coefficients: number[], x: number): number {
    const n = coefficients.length;

    function evaluate(index: number): number {
        if (index === 0) {
            return coefficients[0];
        } else {
            return coefficients[index] * Math.pow(x, index) + evaluate(index - 1);
        }
    }

    return evaluate(n - 1);
}
