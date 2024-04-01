import {describe, it, expect} from 'vitest';
import {Employee, Engineer} from './types';

describe('Employee', () => {
    it('should create an instance of Employee', () => {
        const employee = new Employee('John Doe', 30, 'ACME Inc.', 50000);
        expect(employee).toBeInstanceOf(Employee);
    });

    it('should return the correct introduction string', () => {
        const employee = new Employee('John Doe', 30, 'ACME Inc.', 50000);
        const expectedIntro = 'My name is John Doe, and I am 30 years old.\n' +
            'I work at ACME Inc. and earn $50000 per year.';
        expect(employee.introduce()).toBe(expectedIntro);
    });

    it('should return the correct work string', () => {
        const employee = new Employee('John Doe', 30, 'ACME Inc.', 50000);
        const expectedWork = 'I am working as an employee at ACME Inc..';
        expect(employee.work()).toBe(expectedWork);
    });
});

describe('Engineer', () => {
    it('should create an instance of Engineer', () => {
        const engineer = new Engineer('Jane Smith', 35, 'Tech Corp.', 80000, 'Software');
        expect(engineer).toBeInstanceOf(Engineer);
    });

    it('should return the correct introduction string', () => {
        const engineer = new Engineer('Jane Smith', 35, 'Tech Corp.', 80000, 'Software');
        const expectedIntro = 'My name is Jane Smith, and I am 35 years old.\n' +
            'I work at Tech Corp. and earn $80000 per year.\n' +
            'I am an engineer specialized in Software.';
        expect(engineer.introduce()).toBe(expectedIntro);
    });

    it('should return the correct work string', () => {
        const engineer = new Engineer('Jane Smith', 35, 'Tech Corp.', 80000, 'Software');
        const expectedWork = 'I am working as an engineer at Tech Corp., focusing on Software.';
        expect(engineer.work()).toBe(expectedWork);
    });

    it('should return the correct design string', () => {
        const engineer = new Engineer('Jane Smith', 35, 'Tech Corp.', 80000, 'Software');
        const expectedDesign = 'I am designing a new system related to Software.';
        expect(engineer.design()).toBe(expectedDesign);
    });
});