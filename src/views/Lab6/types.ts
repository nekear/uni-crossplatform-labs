abstract class Person {
    protected name: string;
    protected age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public abstract introduce(): string;
}

interface Worker {
    work(): string;
}

class Employee extends Person implements Worker {
    protected company: string;
    protected salary: number;

    constructor(name: string, age: number, company: string, salary: number) {
        super(name, age);
        this.company = company;
        this.salary = salary;
    }

    public introduce(): string {
        return `My name is ${this.name}, and I am ${this.age} years old.\n` +
            `I work at ${this.company} and earn $${this.salary} per year.`;
    }

    public work(): string {
        return `I am working as an employee at ${this.company}.`;
    }
}

class Engineer extends Employee {
    private specialization: string;

    constructor(name: string, age: number, company: string, salary: number, specialization: string) {
        super(name, age, company, salary);
        this.specialization = specialization;
    }

    public introduce(): string {
        return super.introduce() + `\nI am an engineer specialized in ${this.specialization}.`;
    }

    public work(): string {
        return `I am working as an engineer at ${this.company}, focusing on ${this.specialization}.`;
    }

    public design(): string {
        return `I am designing a new system related to ${this.specialization}.`;
    }
}

export {Person, Employee, Engineer};
export type {Worker}