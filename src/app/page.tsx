"use client";

import { useEffect, useState } from "react";

import { H1 } from "./designSystem/title/h1";
import { classNames } from "@/utils/classNames";
import { renderToStaticMarkup } from "react-dom/server";

type Bento = number[][][];
const BASE_BLOCK = [1, 1];

export default function Home() {
  const [bento, setBento] = useState(generateRandomBento(5, 4));
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        <div>
          <H1 title="Bento Design Generator" />

          {/* <Bento bento={bento} /> */}
          <div className="mt-24 grid grid-cols-2 gap-x-10">
            <Bento bento={bento} />
            <code>{componentToString(bento)}</code>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

/* const bento: Bento = [
  [[1, 1], [2, 1], EMPTY_BLOCK, [2, 1], EMPTY_BLOCK],
  [[2, 1], EMPTY_BLOCK, [2, 2], EMPTY_BLOCK, [1, 1]],
  [[1, 2], [1, 1], EMPTY_BLOCK, EMPTY_BLOCK, [1, 2]],
  [EMPTY_BLOCK, [2, 1], EMPTY_BLOCK, [1, 1], EMPTY_BLOCK],
]; */

const classNamesGenerator = (size: number[]) => {
  return classNames(
    size[0] === 2 ? "col-span-2" : "",
    size[1] === 1 ? "" : "row-span-2",
    "border border-polo-blue-300 bg-polo-blue-200 rounded-lg"
  );
};

const generateEmptyBento = (length: number, height: number): Bento => {
  const bento: Bento = [];

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    const row: number[][] = [];

    for (let columnIndex = 0; columnIndex < length; columnIndex++) {
      row.push(BASE_BLOCK);
    }

    bento.push(row);
  }

  return bento;
};

const generateRandomBento = (length: number, height: number): Bento => {
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

const isLastColumn = (columnIndex: number, rowLength: number) =>
  columnIndex === rowLength - 1;
const isLastRow = (rowIndex: number, bentoLength: number) =>
  rowIndex === bentoLength - 1;
const shouldSkipBlock = (bento: Bento, rowIndex: number, columnIndex: number) =>
  bento[rowIndex][columnIndex][0] === 0 &&
  bento[rowIndex][columnIndex][1] === 0;
const isNextColumnAvailable = (
  bento: Bento,
  rowIndex: number,
  columnIndex: number
) => bento[rowIndex][columnIndex + 1] === BASE_BLOCK;

const Bento = ({ bento }: { bento: Bento }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {bento.map((row, rowIndex) =>
        row.map((size, columnIndex) => {
          if (size[0] !== 0 && size[1] !== 0) {
            return (
              <div
                key={[rowIndex, columnIndex].toString()}
                className={classNamesGenerator(size)}
              />
            );
          }
        })
      )}
    </div>
  );
};

function componentToString(bento: Bento) {
  return renderToStaticMarkup(<Bento bento={bento} />);
}

/*
<div className="mt-32 grid grid-cols-2 gap-x-5">
  <div className="grid grid-cols-5 gap-2">
    <div className="h-28 border border-polo-blue-300 bg-polo-blue-200 rounded-lg" />
    <div className="h-28 col-span-2 border border-polo-blue-300 bg-polo-blue-200 rounded-lg" />
    <div className="h-28 col-span-2 border border-polo-blue-300 bg-polo-blue-200 rounded-lg" />
    <div className="h-28 col-span-2 border border-polo-blue-300 bg-polo-blue-200 rounded-lg" />
    <div className="col-span-2 row-span-2 border border-polo-blue-300 bg-polo-blue-200 rounded-lg" />
    <div className="h-28 border border-polo-blue-300 bg-polo-blue-200 rounded-lg" />
    <div className="row-span-2 border border-polo-blue-300 bg-polo-blue-200 rounded-lg" />
    <div className="h-28 border border-polo-blue-300 bg-polo-blue-200 rounded-lg" />
    <div className="row-span-2 border border-polo-blue-300 bg-polo-blue-200 rounded-lg" />
    <div className="h-28 col-span-2 border border-polo-blue-300 bg-polo-blue-200 rounded-lg" />
    <div className="h-28 border border-polo-blue-300 bg-polo-blue-200 rounded-lg" />
  </div>
</div>
*/
