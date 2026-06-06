import { formatCurrency } from "../scripts/utils/money.js";

//name the test suite

describe('test suite: formatCurrency', () => {
    it('converts cents to dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00')   ;
    });

    it('rounds up to the nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
    
    it('rounds down to the nearest cent', () => {
        expect(formatCurrency(1350.3)).toEqual('13.50');
    });
});