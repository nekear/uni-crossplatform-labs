import {test, describe, expect} from 'vitest'
import {RefinementService} from './refinements'

const refinementService = new RefinementService()

describe('RefinementService', () => {
    describe('refinePersonName', () => {
        test('should validate correct names', () => {
            const result = refinementService.refinePersonName().refine('John Doe')
            expect(result).toBe(true)
        })

        test('should invalidate incorrect names', () => {
            const result = refinementService.refinePersonName().refine('John123 Doe')
            expect(result).toBe(false)
        })
    })

    describe('refinePhoneNumber', () => {
        test('should validate correct phone numbers', () => {
            const result = refinementService.refinePhoneNumber().refine('(123) 456 7899')
            expect(result).toBe(true)
        })

        test('should invalidate incorrect phone numbers', () => {
            const result = refinementService.refinePhoneNumber().refine('dfasfasdf')
            expect(result).toBe(false)
        })
    })
})