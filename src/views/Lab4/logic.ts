abstract class Quadrangle {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract getArea(): number;
}

class Rectangle extends Quadrangle {
    readonly width: number;
    readonly height: number;

    constructor(a: number, b: number) {
        super("Rectangle");
        this.width = a;
        this.height = b;
    }

    getArea(): number {
        return this.width * this.height;
    }
}

class Square extends Quadrangle {
    readonly side: number;

    constructor(side: number) {
        super("Square");
        this.side = side;
    }

    getArea(): number {
        return this.side * this.side;
    }
}

export {Quadrangle, Rectangle, Square};