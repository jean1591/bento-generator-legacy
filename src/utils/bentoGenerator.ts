import {
  BASE_BLOCK,
  Bento as BentoType,
  isLastColumn,
  isLastRow,
  isNextColumnAvailable,
  shouldSkipBlock,
} from ".";

const generateEmptyBento = (length: number, height: number): BentoType => {
  const bento: BentoType = [];

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    const row: number[][] = [];

    for (let columnIndex = 0; columnIndex < length; columnIndex++) {
      row.push(BASE_BLOCK);
    }

    bento.push(row);
  }

  return bento;
};

export const generateRandomBento = (
  length: number,
  height: number
): BentoType => {
  const bento = generateEmptyBento(length, height);

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    for (let columnIndex = 0; columnIndex < length; columnIndex++) {
      if (shouldSkipBlock(bento, rowIndex, columnIndex)) {
        continue;
      }

      const row = bento[rowIndex];

      if (
        Math.random() > 0.85 &&
        !isLastColumn(columnIndex, row.length) &&
        isNextColumnAvailable(bento, rowIndex, columnIndex)
      ) {
        // Merge two blocks horizontaly
        bento[rowIndex][columnIndex] = [2, 1];
        bento[rowIndex][columnIndex + 1] = [0, 0];
      } else if (Math.random() > 0.85 && !isLastRow(rowIndex, bento.length)) {
        // Merge two blocks verticaly
        bento[rowIndex][columnIndex] = [1, 2];
        bento[rowIndex + 1][columnIndex] = [0, 0];
      }
    }
  }

  return bento;
};
