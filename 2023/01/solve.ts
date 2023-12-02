const fs = require('fs');

enum FirstLast {
  First = 1,
  Last = -1
}

export const DIGITS: Record<string, string> = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9'
}

const FULL_TEXT: Record<string, string> = {
  'zero': '0',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
};

export const FULL_TEXT_AND_DIGITS: Record<string, string> = {
  ...DIGITS,
  ...FULL_TEXT
};

export const solve = (data: string, searchedValues: Record<string, string>): number => {
  return data.split('\n')
    .map(line => Number((findFirst(line, searchedValues) ?? '0') + (findLast(line, searchedValues) ?? '0')))
    .reduce((acc, curr) => acc + curr, 0);
}

export const findFirst = (data: string, searchedValues: Record<string, string>): string | undefined => {
  return findDigit(data, searchedValues, FirstLast.First);
}

export const findLast = (data: string, searchedValues: Record<string, string>): string | undefined => {
  return findDigit(data, searchedValues, FirstLast.Last);
}

const findDigit = (data: string, searchedValues: Record<string, string>, firstLast: FirstLast): string | undefined => {
  const start = firstLast === FirstLast.First ? 0 : data.length - 1;
  const end = firstLast === FirstLast.First ? data.length : -1;

  for (let i = start; i !== end; i += firstLast.valueOf()) {
    for (const searchedValue in searchedValues) {
      if (data.slice(i, i + searchedValue.length) === searchedValue) {
        return searchedValues[searchedValue];
      }
    }
  }
  return undefined;
}

const loadFile = (filename: string): string => {
  return fs.readFileSync(`${__dirname}/${filename}`).toString();
}

console.log('input.in result 1 : ', solve(loadFile('input.in'), DIGITS));
console.log('input.in result 2 : ', solve(loadFile('input.in'), FULL_TEXT_AND_DIGITS));