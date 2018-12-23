import { strictEqual, deepStrictEqual, throws, ok } from 'assert'
import { toIndexArray, randomInt, genWeightedArray } from '../src/App'

// Tests all of the exposed functions from App.js
describe('App', () => {
  // Tests the toIndexArray function
  describe('toIndexArray', () => {
    it('should return a zero length array if given a zero length array', () => {
      strictEqual(toIndexArray([]).length, 0);
    });
    it('should return an indexed array given an array of length one or greater', () => {
      deepStrictEqual(toIndexArray([10, 20, 30]), [0, 1, 2]);
    });
  });
  // Tests the randomInt function
  describe('randomInt', () => {
    it('should throw an error if the min is greater than the max', () => {
      throws(() => randomInt(100, 1), Error, 'min must be less than max');
    });
    it('should return the min value if the min and max values are the same', () => {
      strictEqual(randomInt(1, 1), 1);
    });
    it('should generate a valid value between min and max', () => {
      ok(randomInt(1, 100));
    });
  });
  // Tests the genWeightedArray function
  describe('genWeightedArray', () => {
    it('should throw an error if the lengths of the two arrays are not the same', () => {
      throws(() => genWeightedArray([1, 2, 3], [0.1, 0.2]), Error, 'lengths of list and weight arrays must be the same');
    });
    it('should return an array of length equal to the summation of multiplying each element:weight pairing and multiplying by 100', () => {
      const list = [1, 2];
      const weights = [0.25, 0.3];
      const array = genWeightedArray(list, weights);
      strictEqual(array.length, 55);
    });
  });
});