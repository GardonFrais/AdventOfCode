import { EnginePart } from "./solve";

const solve = require('./solve');
const fs = require('fs');

test('solves 03/12/2023 puzzle example 1', () => {
  const fileContent: string = fs.readFileSync(`${__dirname}/input.spec.in`).toString();
  expect(solve.solve(fileContent)).toBe(4361);
});

test('parse data to matrix', () => {
  const input: string[] = [
    '467..114..',
    '...*......',
    '..35..633.'
  ];
  const expectedOutput: string[][] = [
    ['4', '6', '7', '.', '.', '1', '1', '4', '.', '.'],
    ['.', '.', '.', '*', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '3', '5', '.', '.', '6', '3', '3', '.']
  ];
  expect(solve.parseToMatrix(input)).toStrictEqual(expectedOutput);
});

test('number is part of engine', () => {
  const input: EnginePart = {
    number: 32,
    surroundingChars: ['.', '*']
  };
  expect(solve.isEnginePart(input)).toBe(true);
});

test('number isnt part of engine', () => {
  const input: EnginePart = {
    number: 32,
    surroundingChars: ['.']
  };
  expect(solve.isEnginePart(input)).toBe(false);
});

test('extract engine parts', () => {
  const input: string[][] = [
    ['.', '.', '.', '.'],
    ['.', '.', '+', '.'],
    ['*', '3', '2', '.'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.']
  ];
  const expectedOutput: EnginePart[] = [{
    number: 32,
    surroundingChars: ['.', '+', '*']
  }];

  const result = solve.extractEngineParts(input);
  expect(result).toStrictEqual(expectedOutput);
});

test('extact corner engine parts', () => {
  const input: string[][] = [
    ['3', '2', '.', '.'],
    ['.', '.', '+', '.'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.']
  ];
  const expectedOutput: EnginePart[] = [{
    number: 32,
    surroundingChars: ['.', '+']
  }];

  const result = solve.extractEngineParts(input);
  expect(result).toStrictEqual(expectedOutput);
});

test('extract engine part', () => {
  const input: string[][] = [
    ['.', '.', '.', '.'],
    ['.', '.', '+', '.'],
    ['*', '3', '2', '.'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.']
  ];
  const expectedOutput: EnginePart = {
    number: 32,
    surroundingChars: ['.', '+', '*']
  };

  const result = solve.extractEnginePart(input, 1, 2);
  expect(result[0]).toBe(2);
  expect(result[1]).toStrictEqual(expectedOutput);
});