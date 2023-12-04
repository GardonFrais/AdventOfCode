import { Scratchcard } from "./solve";

const fs = require('fs');
const solve = require('./solve');

test('solves 04/12/2023 puzzle part 1', () => {
  const fileContent: string = fs.readFileSync(`${__dirname}/input.spec.in`).toString();
  expect(solve.solve1(fileContent)).toBe(13);
});

test('solves 04/12/2023 puzzle part 2', () => {
  const fileContent: string = fs.readFileSync(`${__dirname}/input.spec.in`).toString();
  expect(solve.solve2(fileContent)).toBe(30);
});

test('parse to scratchcard', () => {
  const input: string = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53';
  const expectedOutput: Scratchcard = {
    cardId: 1,
    winningNumbers: [41, 48, 83, 86, 17],
    gameNumbers: [83, 86, 6, 31, 17, 9, 48, 53]
  };
  expect(solve.parseScratchcard(input)).toStrictEqual(expectedOutput);
});

test('calc card winning numbers', () => {
  const input: Scratchcard = {
    cardId: 1,
    winningNumbers: [41, 48, 83, 86, 17],
    gameNumbers: [83, 86, 6, 31, 17, 9, 48, 53]
  };
  expect(solve.calcScratchcardWinningNumbersCount(input)).toBe(4);
});

test('calc card ids to duplicate', () => {
  const input: Scratchcard = {
    cardId: 1,
    winningNumbers: [41, 48, 83, 86, 17],
    gameNumbers: [83, 86, 6, 31, 17, 9, 48, 53]
  }
  expect(solve.calcCardIdsToDuplicate(input)).toStrictEqual([2, 3, 4, 5])
});