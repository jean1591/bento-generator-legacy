import { BASE_BLOCK, Bento } from "./interface/bento";

export const isLastColumn = (columnIndex: number, rowLength: number) =>
  columnIndex === rowLength - 1;

export const isLastRow = (rowIndex: number, bentoLength: number) =>
  rowIndex === bentoLength - 1;

export const shouldSkipBlock = (
  bento: Bento,
  rowIndex: number,
  columnIndex: number
) =>
  bento[rowIndex][columnIndex][0] === 0 &&
  bento[rowIndex][columnIndex][1] === 0;

export const isNextColumnAvailable = (
  bento: Bento,
  rowIndex: number,
  columnIndex: number
) => bento[rowIndex][columnIndex + 1] === BASE_BLOCK;
