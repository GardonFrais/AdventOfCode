const fs = require('fs');

export const solve = (data: string, redNumber: number, greenNumber: number, blueNumber: number): number => {
  const bagContent: Record<string, number> = {
    'red': redNumber,
    'green': greenNumber,
    'blue': blueNumber
  };
  return data.split('\n')
    .map((line: string): number => isGamePossible(line, bagContent) ? extractGameNumber(line) : 0)
    .reduce((acc, curr) => acc + curr, 0);
}

export const isGamePossible = (data: string, bagContent: Record<string, number>): boolean => {
  console.log(data);
  return data.split(':')[1]
    .split(';')
    .map((draw: string) => isDrawPossible(draw.trim(), bagContent))
    .reduce((acc, curr) => acc && curr, true);
}

export const isDrawPossible = (data: string, bagContent: Record<string, number>): boolean => {
  const colors = data.split(',');
  return colors.map((color: string) => color.trim().split(' '))
    .filter((color: string[]) => bagContent[color[1]] >= Number(color[0]))
    .length === colors.length;
}

export const extractGameNumber = (data: string): number => {
  return Number(data.split(' ')[1].slice(0, -1));
}

const loadFile = (filename: string): string => {
  return fs.readFileSync(`${__dirname}/${filename}`).toString();
}

console.log('input.in : ', solve(loadFile('input.in'), 12, 13, 14));
