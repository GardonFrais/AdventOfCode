const fs = require('fs');

export type Scratchcard = {
  cardId: number;
  winningNumbers: number[];
  gameNumbers: number[];
}

type ScratchcardResolution = {
  scratchcard: Scratchcard,
  numberOfOccurences: number
}

export const solve1 = (data: string): number => {
  return data.split('\n')
    .map(line => calcScratchcardWinningNumbersCount(parseScratchcard(line)))
    .reduce((acc, curr) => (acc + (curr > 0 ? 2 ** (curr - 1) : 0)), 0);
}

export const solve2 = (data: string): number => {
  let scratchcardResolutions: ScratchcardResolution[] = data.split('\n')
    .map(line => ({ scratchcard: parseScratchcard(line), numberOfOccurences: 1 }));

  for (const scratchcardResolution of scratchcardResolutions) {
    const cardIdsToDuplicate: number[] = calcCardIdsToDuplicate(scratchcardResolution.scratchcard);
    for (const currId of cardIdsToDuplicate) {
      scratchcardResolutions[currId - 1].numberOfOccurences += scratchcardResolution.numberOfOccurences;
    };
  };

  return scratchcardResolutions.map(scratchcardResolution => scratchcardResolution.numberOfOccurences)
    .reduce((acc, curr) => acc + curr, 0);
}

export const calcCardIdsToDuplicate = (scratchcard: Scratchcard): number[] => {
  return [...Array(calcScratchcardWinningNumbersCount(scratchcard)).keys()].map(cardId => cardId + scratchcard.cardId + 1)
}

export const calcScratchcardWinningNumbersCount = (scratchcard: Scratchcard): number => {
  const validNumbers: number = scratchcard.gameNumbers.filter(gameNumber => scratchcard.winningNumbers.includes(gameNumber)).length;
  return validNumbers ?? 0;
}

export const parseScratchcard = (game: string): Scratchcard => {
  const [gameId, gameValues] = game.split(':');
  const [winningString, gameString] = gameValues.split('|');

  return {
    cardId: parseStringToArrayNumber(gameId, ' ')[0],
    winningNumbers: parseStringToArrayNumber(winningString, ' '), 
    gameNumbers: parseStringToArrayNumber(gameString, ' ')
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

console.log('part1 : ', solve1(loadFile('input.in')));
console.log('part2 : ', solve2(loadFile('input.in')));
