const fs = require('fs');
const solve = require('./solve');

test('solves 01/12/2023 puzzle example 1', () => {
  const fileContent = fs.readFileSync(`${__dirname}/input.pt1.spec.in`).toString();
  expect(solve.solve(fileContent, solve.DIGITS)).toBe(142);
});

test('solves 01/12/2023 puzzle example 2', () => {
  const fileContent = fs.readFileSync(`${__dirname}/input.pt2.spec.in`).toString();
  expect(solve.solve(fileContent, solve.FULL_TEXT_AND_DIGITS)).toBe(281);
});

test('finds first digit in string (digit)', () => {
  const input = 'two1nine';
  expect(solve.findFirst(input, solve.DIGITS)).toBe('1');
});

test('finds first digit in string (full text)', () => {
  const input = 'two1nine';
  expect(solve.findFirst(input, solve.FULL_TEXT_AND_DIGITS)).toBe('2');
});

test('finds no first digit', () => {
  const input = 'trebuchet';
  expect(solve.findFirst(input, solve.FULL_TEXT_AND_DIGITS)).toBe(undefined);
});

test('finds last digit in string (digit)', () => {
  const input = 'two1nine';
  expect(solve.findLast(input, solve.DIGITS)).toBe('1');
});

test('finds last digit in string (full text)', () => {
  const input = 'two1nine';
  expect(solve.findLast(input, solve.FULL_TEXT_AND_DIGITS)).toBe('9');
});

test('finds no last digit', () => {
  const input = 'trebuchet';
  expect(solve.findLast(input, solve.FULL_TEXT_AND_DIGITS)).toBe(undefined);
});