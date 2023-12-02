const fs = require('fs');
const solve = require('./solve');

const BAG_CONTENT: Record<string, number> = {
  'red' : 12,
  'green': 13,
  'blue': 14
}

test('solves 02/12/2023 puzzle example 1', () => {
  const fileContent = fs.readFileSync(`${__dirname}/input.pt1.spec.in`).toString();
  expect(solve.solve(fileContent, 12, 13, 14)).toBe(8);
});

test('game is possible', () => {
  const input = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
  expect(solve.isGamePossible(input, BAG_CONTENT)).toBe(true);
});

test('game is impossible', () => {
  const input = 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red';
  expect(solve.isGamePossible(input, BAG_CONTENT)).toBe(false);
});

test('is draw possible', () => {
  const input = '8 green, 6 blue, 2 red';
  expect(solve.isDrawPossible(input, BAG_CONTENT)).toBe(true);
});

test('is draw possible with 2 colors', () => {
  const input = '8 green, 2 red';
  expect(solve.isDrawPossible(input, BAG_CONTENT)).toBe(true);
});

test('is draw impossible', () => {
  const input = '8 green, 6 blue, 20 red';
  expect(solve.isDrawPossible(input, BAG_CONTENT)).toBe(false);
});

test('is draw impossible with 2 colors', () => {
  const input = '8 green, 20 red';
  expect(solve.isDrawPossible(input, BAG_CONTENT)).toBe(false);
});

test('extract game number single digit', () => {
  const input = 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red';
  expect(solve.extractGameNumber(input)).toBe(3);
});

test('extract game number multiple digits digit', () => {
  const input = 'Game 13: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red';
  expect(solve.extractGameNumber(input)).toBe(13);
});