import { expect } from 'chai';
import 'mocha';
import { checkForUndefined } from './CheckForUndefined';

describe('when doing a checkForUndefined', () => {
    it('should throw if there is an undefined value', () => {
        const map = { a: undefined };
        return expect(() => checkForUndefined(map)).to.throw('CommandHelper error: a was undefined');
    });

    it('should NOT throw if there is a null value', () => {
        const map = { b: null };
        return expect(() => checkForUndefined(map)).to.not.throw;
    });

    it('should NOT throw if there is any value', () => {
        const map = { c: {} };
        return expect(() => checkForUndefined(map)).to.not.throw;
    });
});
