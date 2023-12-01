const fs = require('fs');
const solve = require('./solve');

test('solves 01/12/2023 puzzle example', () => {
  const fileContent = fs.readFileSync(`${__dirname}/input.spec.in`).toString();
  expect(solve.solve(fileContent)).toBe(142);
});

test('finds first and last digit in string', () => {
  const input = 'a1b2c3d4e5f';
  expect(solve.concatFirstAndLastDigit(input)).toBe(15);
});

test('finds first and last digit in string if there is only 1 digit', () => {
  const input = 'treb7uchet';
  expect(solve.concatFirstAndLastDigit(input)).toBe(77);
});

test('finds first and last digit in string if there is only no digit', () => {
  const input = 'trebuchet';
  expect(solve.concatFirstAndLastDigit(input)).toBe(0);
});