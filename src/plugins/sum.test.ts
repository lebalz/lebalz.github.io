import sum from './sum';
import { describe, expect, it } from 'vitest'; // <-- **

describe('#sum', () => {
  it('returns 0 with no numbers input', () => {
    expect(sum()).toBe(0);
  });

  it('returns same number with one number input', () => {
    expect(sum(2)).toBe(2);
  });

  it('returns sum with nultiple numbers input', () => {
    expect(sum(1, 2, 3)).toBe(6);
  });
});