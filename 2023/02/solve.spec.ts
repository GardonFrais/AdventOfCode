import { Draw } from "./solve";

const fs = require('fs');
const solve = require('./solve');

const BAG_CONTENT: Draw = {
  'red' : 12,
  'green': 13,
  'blue': 14
}

test('solves 02/12/2023 puzzle example 1', () => {
  const fileContent = fs.readFileSync(`${__dirname}/input.spec.in`).toString();
  expect(solve.solve1(fileContent, 12, 13, 14)).toBe(8);
});

test('solves 02/12/2023 puzzle example 2', () => {
  const fileContent = fs.readFileSync(`${__dirname}/input.spec.in`).toString();
  expect(solve.solve2(fileContent)).toBe(2286);
});

test('parse draw', () => {
  const input = ' 1 red, 2 green, 6 blue ';
  expect(solve.parseDraw(input).red).toBe(1);
  expect(solve.parseDraw(input).green).toBe(2);
  expect(solve.parseDraw(input).blue).toBe(6);
});

test('parse partial draw', () => {
  const input = ' 1 red, 6 blue ';
  expect(solve.parseDraw(input).red).toBe(1);
  expect(solve.parseDraw(input).green).toBe(0);
  expect(solve.parseDraw(input).blue).toBe(6);
});

test('parse game', () => {
  const input = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
  expect(solve.parseGame(input)[0]).toBe(1);
  expect(solve.parseGame(input)[1].length).toBe(3);
  expect(solve.parseGame(input)[1][0].red).toBe(4);
  expect(solve.parseGame(input)[1][0].green).toBe(0);
  expect(solve.parseGame(input)[1][0].blue).toBe(3);
  expect(solve.parseGame(input)[1][1].red).toBe(1);
  expect(solve.parseGame(input)[1][1].green).toBe(2);
  expect(solve.parseGame(input)[1][1].blue).toBe(6);
  expect(solve.parseGame(input)[1][2].red).toBe(0);
  expect(solve.parseGame(input)[1][2].green).toBe(2);
  expect(solve.parseGame(input)[1][2].blue).toBe(0);
})

test('game is possible', () => {
  const input: Draw[] =  [
    { red: 4, green: 0, blue: 3 },
    { red: 1, green: 2, blue: 6 },
    { red: 0, green: 2, blue: 0 }
  ];
  expect(solve.isGamePossible(input, BAG_CONTENT)).toBe(true);
});

test('game is impossible', () => {
  const input: Draw[] = [
    { red: 20, green: 8, blue: 6 },
    { red: 4, green: 13, blue: 5 },
    { red: 1, green: 5, blue: 0 }
  ];'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red';
  expect(solve.isGamePossible(input, BAG_CONTENT)).toBe(false);
});

test('calc minimal colors to valid game', () => {
  const input: Draw[] = [
    { red: 4, green: 0, blue: 3 },
    { red: 1, green: 2, blue: 6 },
    { red: 0, green: 2, blue: 0 }
  ];
  expect(solve.calcMinimalBag(input).red).toBe(4);
  expect(solve.calcMinimalBag(input).green).toBe(2);
  expect(solve.calcMinimalBag(input).blue).toBe(6);
})