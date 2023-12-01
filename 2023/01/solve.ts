const fs = require('fs');

const DIGITS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const solve = (data: string): number => {
  return data.split('\n')
    .map(line => concatFirstAndLastDigit(line))
    .reduce((acc, curr) => acc + curr, 0);
}

export const concatFirstAndLastDigit = (data: string): number => {
  const filteredData: string[] = [...data].filter(char => DIGITS.includes(Number(char)));
  return Number(filteredData[0] + filteredData[filteredData.length - 1]) || 0;
}

const solveFile = (filename: string): number => {
  const fileContent: string = fs.readFileSync(`${__dirname}/${filename}`).toString();
  return solve(fileContent);
}

console.log('input.in result : ', solveFile('input.in'));