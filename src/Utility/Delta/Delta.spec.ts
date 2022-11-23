import {
    expect,
} from 'chai';
import 'mocha';
import {
    Delta,
} from './Delta';

describe('Delta', () => {
    describe('Object', () => {
        it('should return {} for two objects that have the same key value pair (number)', () => {
            const a = {
                'apples': 2,
                'bananas': 3,
            };
            const b = {
                'apples': 2,
                'bananas': 3,
            };
            expect(Delta.object(a, b)).to.deep.equal({});
        });

        it('should return {} for two objects that have the same key value pair (boolean)', () => {
            const a = {
                'apples': true,
                'bananas': true,
            };
            const b = {
                'apples': true,
                'bananas': true,
            };
            expect(Delta.object(a, b)).to.deep.equal({});
        });

        it('should return {} for two objects that have the same key value pair (string)', () => {
            const a = {
                'apples': 'a',
                'bananas': 'b',
            };
            const b = {
                'apples': 'a',
                'bananas': 'b',
            };
            expect(Delta.object(a, b)).to.deep.equal({});
        });

        it('should return {} for two objects that have the same key value pair (array)', () => {
            const a = {
                'apples': ['a', 'p', 'p'],
                'bananas': ['b', 'a', 'n'],
            };
            const b = {
                'apples': ['a', 'p', 'p'],
                'bananas': ['b', 'a', 'n'],
            };
            expect(Delta.object(a, b)).to.deep.equal({});
        });

        it('should return {} for two objects that have the same key value pair (null)', () => {
            const a = {
                'apples': null,
                'bananas': null,
            };
            const b = {
                'apples': null,
                'bananas': null,
            };
            expect(Delta.object(a, b)).to.deep.equal({});
        });

        it('should return {} for two objects that have the same key value pair (undefined)', () => {
            const a = {
                'apples': undefined,
                'bananas': undefined,
            };
            const b = {
                'apples': undefined,
                'bananas': undefined,
            };
            expect(Delta.object(a, b)).to.deep.equal({});
        });

        it('considers null and undefined to be different, since all values differ, it essentially returns object B', () => {
            const a = {
                'apples': null,
                'bananas': undefined,
            };
            const b = {
                'apples': undefined,
                'bananas': null,
            };
            expect(Delta.object(a, b)).to.deep.equal(b);
        });

        it('return an object with only the single key value pair that changes; the returned value is found in object B (number)', () => {
            const a = {
                'apples': 2,
                'bananas': 3,
            };
            const b = {
                'apples': 3,
                'bananas': 3,
            };
            expect(Delta.object(a, b)).to.deep.equal({
                'apples': 3,
            });
        });

        it('return an object with only the single key value pair that changes; the returned value is found in object B (boolean)', () => {
            const a = {
                'apples': true,
                'bananas': true,
            };
            const b = {
                'apples': false,
                'bananas': true,
            };
            expect(Delta.object(a, b)).to.deep.equal({
                'apples': false,
            });
        });

        it('return an object with only the single key value pair that changes; the returned value is found in object B (string)', () => {
            const a = {
                'apples': 'a',
                'bananas': 'b',
            };
            const b = {
                'apples': 'c',
                'bananas': 'b',
            };
            expect(Delta.object(a, b)).to.deep.equal({
                'apples': 'c',
            });
        });

        it('return an object with only the single key value pair that changes; the returned value is found in object B (array)', () => {
            const a = {
                'apples': ['a', 'p', 'p'],
                'bananas': ['b', 'a', 'n'],
            };
            const b = {
                'apples': ['l', 'e', 's'],
                'bananas': ['b', 'a', 'n'],
            };
            expect(Delta.object(a, b)).to.deep.equal({
                'apples': ['l', 'e', 's'],
            });
        });

        it(`return an object with an array that; the returned value is found in object B (arrays with different length)`,
            () => {
                const a = {
                    'apples': ['a', 'p', 'p'],
                    'bananas': ['b', 'a', 'n'],
                };
                const b = {
                    'apples': ['a', 'p', 'p', 'X'],
                    'bananas': ['b', 'a', 'n'],
                };
                expect(Delta.object(a, b)).to.deep.equal({
                    'apples': ['a', 'p', 'p', 'X'],
                });
            });

        it(`the order of the objects being delta'd determines the key value pair that is returned`,
        () => {
                const a = {
                    'apples': 2,
                    'bananas': 3,
                };
                const b = {
                    'apples': 3,
                    'bananas': 3,
                };
                expect(Delta.object(b, a)).to.deep.equal({
                    'apples': 2,
                });
            });

    });
});
