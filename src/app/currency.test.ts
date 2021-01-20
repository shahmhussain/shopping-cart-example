import { convertNumberToCurrency } from "./currency"

describe('currency', () => {
    describe('convertNumberToCurrency', () =>{
        it('should convert number to two decimal places', () => {
          expect(convertNumberToCurrency(101)).toBe("£101.00")
        })
    })
})