import { Scratchcard } from "./solve";

const fs = require('fs');
const solve = require('./solve');

test('solves 04/12/2023 puzzle example 1', () => {
  const fileContent: string = fs.readFileSync(`${__dirname}/input.spec.in`).toString();
  expect(solve.solve(fileContent)).toBe(13);
});

test('parse to scratchcard', () => {
  const input: string = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53';
  const expectedOutput: Scratchcard = {
    winningNumbers: [41, 48, 83, 86, 17],
    gameNumbers: [83, 86, 6, 31, 17, 9, 48, 53]
  };
  expect(solve.parseScratchcard(input)).toStrictEqual(expectedOutput);
});

test('calc card value', () => {
  const input: Scratchcard = {
    winningNumbers: [41, 48, 83, 86, 17],
    gameNumbers: [83, 86, 6, 31, 17, 9, 48, 53]
  };
  expect(solve.calcScratchcardValue(input)).toBe(8);
})