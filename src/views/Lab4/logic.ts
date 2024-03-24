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
        super("Square");
        this.side = side;
    }

    getArea(): number {
        return this.side * this.side;
    }
}

export {Shape, Rectangle, Square};