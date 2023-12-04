const fs = require('fs');

export type Scratchcard = {
  winningNumbers: number[];
  gameNumbers: number[];
}

export const solve = (data: string): number => {
  return data.split('\n')
    .map(line => calcScratchcardValue(parseScratchcard(line)))
    .reduce((acc, curr) => acc + curr, 0);
}

export const calcScratchcardValue = (scratchcard: Scratchcard): number => {
  const validNumbers: number = scratchcard.gameNumbers.filter(gameNumber => scratchcard.winningNumbers.includes(gameNumber)).length - 1;
  return validNumbers >= 0 ? 2 ** validNumbers : 0;
}

export const parseScratchcard = (game: string): Scratchcard => {
  const [gameId, gameValues] = game.split(':');
  const [winningString, gameString] = gameValues.split('|');

  const winningNumbers = parseStringToArrayNumber(winningString, ' ');
  const gameNumbers = parseStringToArrayNumber(gameString, ' ');

  return {
    winningNumbers, gameNumbers
  }
}

const parseStringToArrayNumber = (string: string, separator: string): number[] => {
  return string.trim().split(separator)
    .map(value => parseInt(value.trim()))
    .filter(value => !isNaN(value));
}

const loadFile = (filename: string): string => {
  return fs.readFileSync(`${__dirname}/${filename}`).toString();
}

console.log('input.in : ', solve(loadFile('input.in')));
