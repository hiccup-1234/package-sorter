const sort = require('./sort');

describe('sort', () => {
  it('returns STANDARD for non-bulky and non-heavy packages', () => {
    expect(sort(10, 10, 10, 5)).toBe('STANDARD');
    expect(sort(100, 100, 99, 19.99)).toBe('STANDARD');
  });

  it('returns SPECIAL for bulky but not heavy packages', () => {
    expect(sort(200, 10, 10, 5)).toBe('SPECIAL'); // width >= 150
    expect(sort(10, 200, 10, 5)).toBe('SPECIAL'); // height >= 150
    expect(sort(10, 10, 200, 5)).toBe('SPECIAL'); // length >= 150
    expect(sort(100, 100, 100, 5)).toBe('SPECIAL'); // volume = 1,000,000
  });

  it('returns SPECIAL for heavy but not bulky packages', () => {
    expect(sort(10, 10, 10, 20)).toBe('SPECIAL');
    expect(sort(149, 149, 149, 25)).toBe('REJECTED');
  });

  it('returns REJECTED for packages that are both bulky and heavy', () => {
    expect(sort(200, 200, 200, 25)).toBe('REJECTED'); // all dimensions large, mass large
    expect(sort(200, 10, 10, 25)).toBe('REJECTED'); // width >= 150, mass >= 20
    expect(sort(10, 200, 10, 20)).toBe('REJECTED'); // height >= 150, mass >= 20
    expect(sort(10, 10, 200, 20)).toBe('REJECTED'); // length >= 150, mass >= 20
    expect(sort(100, 100, 100, 20)).toBe('REJECTED'); // volume = 1,000,000, mass >= 20
  });

  it('handles edge cases at the exact thresholds', () => {
    expect(sort(150, 10, 10, 19.99)).toBe('SPECIAL'); // width at threshold
    expect(sort(10, 150, 10, 19.99)).toBe('SPECIAL'); // height at threshold
    expect(sort(10, 10, 150, 19.99)).toBe('SPECIAL'); // length at threshold
    expect(sort(100, 100, 100, 19.99)).toBe('SPECIAL'); // volume at threshold
    expect(sort(10, 10, 10, 20)).toBe('SPECIAL'); // mass at threshold
    expect(sort(150, 10, 10, 20)).toBe('REJECTED'); // both at threshold
  });
}); 