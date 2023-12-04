const fs = require('fs');

export type EnginePart = {
  number: number;
  surroundingChars: string[];
}

const DIGITS: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const EXCLUDES_CHARS: string[] = [...DIGITS, '.'];

export const solve = (data: string): number => {
   return extractEngineParts(parseToMatrix(data.split('\n')))
    .filter(enginePart => isEnginePart(enginePart))
    .map(enginePart => enginePart.number)
    .reduce((acc, curr) => acc + curr, 0);
}

export const parseToMatrix = (data: string[]): string[][] => {
  return data.map(line => line.split(''));
}

export const extractEngineParts = (matrix: string[][]): EnginePart[] => {
  let result: EnginePart[] = [];
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix[y].length; x += 1) {
      if (DIGITS.includes(matrix[y][x])) {
        const [updatedX, enginePart] = extractEnginePart(matrix, x, y);
        result.push(enginePart);
        x = updatedX;
      }
    }
  }
  return result;
}

export const extractEnginePart = (matrix: string[][], x: number, y: number): [number, EnginePart] => {
  let stringNumber: string = matrix[y][x];
  let updatedX: number = x;
  let surroundingChars: string[] = [];

  if (matrix[y - 1] && matrix[y - 1][x - 1] && !surroundingChars.includes(matrix[y - 1][x - 1])) surroundingChars.push(matrix[y - 1][x - 1]);
  if (matrix[y - 1] && matrix[y - 1][x] && !surroundingChars.includes(matrix[y - 1][x])) surroundingChars.push(matrix[y - 1][x]);
  if (matrix[y - 1] && matrix[y - 1][x + 1] && !surroundingChars.includes(matrix[y - 1][x + 1])) surroundingChars.push(matrix[y - 1][x + 1]);
  if (matrix[y] && matrix[y][x - 1] && !surroundingChars.includes(matrix[y][x - 1])) surroundingChars.push(matrix[y][x - 1]);
  if (matrix[y + 1] && matrix[y + 1][x - 1] && !surroundingChars.includes(matrix[y + 1][x - 1])) surroundingChars.push(matrix[y + 1][x - 1]);
  if (matrix[y + 1] && matrix[y + 1][x] && !surroundingChars.includes(matrix[y + 1][x])) surroundingChars.push(matrix[y + 1][x]);
  if (matrix[y + 1] && matrix[y + 1][x + 1] && !surroundingChars.includes(matrix[y + 1][x + 1])) surroundingChars.push(matrix[y + 1][x + 1]);

  while (updatedX + 1 < matrix[y].length && DIGITS.includes(matrix[y][updatedX + 1])) {
    stringNumber = stringNumber + matrix[y][updatedX += 1];
    if (matrix[y - 1] && matrix[y - 1][updatedX + 1] && !surroundingChars.includes(matrix[y - 1][updatedX + 1])) surroundingChars.push(matrix[y - 1][updatedX + 1]);
    if (matrix[y + 1] && matrix[y + 1][updatedX + 1] && !surroundingChars.includes(matrix[y + 1][updatedX + 1])) surroundingChars.push(matrix[y + 1][updatedX + 1]);
  }
  if (matrix[y] && matrix[y][updatedX + 1] && !surroundingChars.includes(matrix[y][updatedX + 1])) surroundingChars.push(matrix[y][updatedX + 1]);

  return [updatedX, { number: parseInt(stringNumber), surroundingChars }]
}

export const isEnginePart = (enginePart: EnginePart): boolean => {
  return enginePart.surroundingChars.map(surrondingChar =>  !EXCLUDES_CHARS.includes(surrondingChar))
    .reduce((acc, curr) => acc || curr, false);
}

const loadFile = (filename: string): string => {
  return fs.readFileSync(`${__dirname}/${filename}`).toString();
}

console.log('input.in : ', solve(loadFile('input.in')));