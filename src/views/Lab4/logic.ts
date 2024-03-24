abstract class Shape {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract getArea(): number;
}

class Rectangle extends Shape {
    readonly width: number;
    readonly height: number;

    constructor(a: number, b: number) {
        if(a < 0 || b < 0) throw new Error("Negative values are not allowed");

        super("Rectangle");
        this.width = a;
        this.height = b;
    }

    getArea(): number {
        return this.width * this.height;
    }
}

class Square extends Shape {
    readonly side: number;

    constructor(side: number) {
        if(side < 0) throw new Error("Negative values are not allowed");

        super("Square");
        this.side = side;
    }

    getArea(): number {
        return this.side * this.side;
    }
}

export {Shape, Rectangle, Square};