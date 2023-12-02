const fs = require('fs');

export type Draw = {
  red: number;
  green: number;
  blue: number;
}

export const solve1 = (data: string, redNumber: number, greenNumber: number, blueNumber: number): number => {
  const bagContent: Draw = {
    'red': redNumber,
    'green': greenNumber,
    'blue': blueNumber
  };
  return data.split('\n')
    .map((game: string): number => {
      const [gameId, gameValues] = parseGame(game);
      return isGamePossible(gameValues, bagContent) ? gameId : 0;
    }).reduce((acc, curr) => acc + curr, 0);
}

export const solve2 = (data: string): number => {
  return data.split('\n')
    .map(game => {
      const [, parsedGame] = parseGame(game);
      const minimalBag = calcMinimalBag(parsedGame);
      return minimalBag.red * minimalBag.green * minimalBag.blue;
    }).reduce((acc, curr) => acc + curr, 0);
}

export const calcMinimalBag = (game: Draw[]): Draw => {
  return game.reduce((acc, curr) => ({
    red: curr.red > acc.red ? curr.red : acc.red,
    green: curr.green > acc.green ? curr.green : acc.green,
    blue: curr.blue > acc.blue ? curr.blue : acc.blue
  }));
}

export const parseGame = (game: string): [number, Draw[]] => {
  const [gameId, gameValues] = game.split(':');
  const draws: string[] = gameValues.split(';').map(draw => draw.trim());
  return [Number(gameId.split(' ')[1]), draws.map(draw => parseDraw(draw))];
}

export const parseDraw = (draw: string): Draw => {
  const result = {
    red: 0,
    green: 0,
    blue: 0
  };

  const [color1, color2, color3] = draw.split(',').map(color => color.trim());
  const [color1value, color1key] = (color1?.split(' ') ?? []) as [string, keyof Draw | undefined];
  const [color2value, color2key] = (color2?.split(' ') ?? []) as [string, keyof Draw | undefined];
  const [color3value, color3key] = (color3?.split(' ') ?? []) as [string, keyof Draw | undefined];

  if (color1key !== undefined) {
    result[color1key] = Number(color1value);
  }

  if (color2key !== undefined) {
    result[color2key] = Number(color2value);
  }

  if (color3key !== undefined) {
    result[color3key] = Number(color3value);
  }

  return result;
}

export const isGamePossible = (game: Draw[], bagContent: Draw): boolean => {
  const minimalBag = calcMinimalBag(game);
  return minimalBag.red <= bagContent.red && minimalBag.green <= bagContent.green && minimalBag.blue <= bagContent.blue;
}

const loadFile = (filename: string): string => {
  return fs.readFileSync(`${__dirname}/${filename}`).toString();
}

console.log('input.in pt1 : ', solve1(loadFile('input.in'), 12, 13, 14));
console.log('input.in pt2 : ', solve2(loadFile('input.in')));
