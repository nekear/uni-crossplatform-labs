import {Shape} from "@/views/Lab4/logic";

class Cylinder extends Shape {
    readonly radius: number;
    readonly height: number;

    constructor(radius: number, height: number) {
        if(radius < 0 || height < 0) throw new Error("Negative values are not allowed");

        super("Cylinder");
        this.radius = radius;
        this.height = height;
    }

    getArea(): number {
        return 2 * Math.PI * this.radius * (this.radius + this.height);
    }
}

export {Cylinder};