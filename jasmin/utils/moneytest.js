import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
    it('hh', () => {
        expect(formatCurrency(2095)).toEqual(('20.95'));
    });

    it('kh', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});