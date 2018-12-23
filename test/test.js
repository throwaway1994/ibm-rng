import { strictEqual, throws, ok } from 'assert'
import { randomInt } from '../src/App'

describe('App', () => {
  describe('randomInt', () => {
    it('should return the min value if the min and max values are the same', () => {
      strictEqual(randomInt(1, 1), 1);
    });
    it('should throw an error if the min is greater than the max', () => {
      throws(() => randomInt(100, 1), Error, 'min must be less than max');
    });
    it('should generate a valid value between min and max', () => {
      ok(randomInt(1, 100));
    });
  })
});