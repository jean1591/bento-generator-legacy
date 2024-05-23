import {
  BASE_BLOCK,
  Bento as BentoType,
  isLastColumn,
  isLastRow,
  isNextColumnAvailable,
  shouldSkipBlock,
} from ".";

const RANDOM_THRESHOLD_SPAN2 = 0.85;
const RANDOM_THRESHOLD_SPAN3 = 0.9;

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

      const randomNumber = Math.random();

      if (isLargerThan(randomNumber, RANDOM_THRESHOLD_SPAN3)) {
        // span-3
        if (canCreateColSpan3(bento, columnIndex, rowIndex)) {
          // Merge three blocks horizontaly
          bento[rowIndex][columnIndex] = [3, 1];
          bento[rowIndex][columnIndex + 1] = [0, 0];
          bento[rowIndex][columnIndex + 2] = [0, 0];
        } else if (canCreateRowSpan3(bento, columnIndex, rowIndex)) {
          // Merge three blocks verticaly
          bento[rowIndex][columnIndex] = [1, 3];
          bento[rowIndex + 1][columnIndex] = [0, 0];
          bento[rowIndex + 2][columnIndex] = [0, 0];
        }
      } else if (isLargerThan(randomNumber, RANDOM_THRESHOLD_SPAN2)) {
        // span-2
        if (
          !isLastColumn(columnIndex, row.length) &&
          isNextColumnAvailable(bento, rowIndex, columnIndex)
        ) {
          // Merge two blocks horizontaly
          bento[rowIndex][columnIndex] = [2, 1];
          bento[rowIndex][columnIndex + 1] = [0, 0];
        } else if (!isLastRow(rowIndex, bento.length)) {
          // Merge two blocks verticaly
          bento[rowIndex][columnIndex] = [1, 2];
          bento[rowIndex + 1][columnIndex] = [0, 0];
        }
      }
    }
  }

  return bento;
};

const isLargerThan = (randomNumber: number, threshold: number) =>
  randomNumber > threshold;

const canCreateColSpan3 = (
  bento: BentoType,
  columIndex: number,
  rowIndex: number
) => {
  return (
    columIndex < bento[rowIndex].length - 2 &&
    isBlockAvailable(bento, columIndex + 1, rowIndex) &&
    isBlockAvailable(bento, columIndex + 2, rowIndex)
  );
};

const canCreateRowSpan3 = (
  bento: BentoType,
  columIndex: number,
  rowIndex: number
) => {
  return (
    rowIndex < bento.length - 2 &&
    isBlockAvailable(bento, columIndex, rowIndex + 1) &&
    isBlockAvailable(bento, columIndex, rowIndex + 2)
  );
};

const isBlockAvailable = (
  bento: BentoType,
  columIndex: number,
  rowIndex: number
) => bento[rowIndex][columIndex] === BASE_BLOCK;
