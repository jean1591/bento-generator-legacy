import { Bento as BentoType, classNames } from "@/utils";

import { RootState } from "../lib/store/store";
import { faker } from "@faker-js/faker";
import { useSelector } from "react-redux";

export const Bento = ({ bento }: { bento: BentoType }) => {
  const columnNumber = useSelector(
    (state: RootState) => state.bentoSettings.columnNumber
  );

  return (
    <div
      className={classNames(
        columnNumber === 3 ? "grid-cols-3" : "",
        columnNumber === 4 ? "grid-cols-4" : "",
        columnNumber === 5 ? "grid-cols-5" : "",
        columnNumber === 6 ? "grid-cols-6" : "",
        columnNumber === 7 ? "grid-cols-7" : "",
        columnNumber === 8 ? "grid-cols-8" : "",
        "grid gap-2 mt-10 p-5 border border-polo-blue-200 shadow-lg rounded-lg"
      )}
    >
      {bento.map((row, rowIndex) =>
        row.map((size, columnIndex) => {
          if (size[0] !== 0 && size[1] !== 0) {
            return (
              <div
                key={[rowIndex, columnIndex].toString()}
                className={classNamesGenerator(size)}
              >
                <div
                  className={classNames(
                    Math.random() > 0.9 ? "text-polo-blue-900" : "",
                    "text-center"
                  )}
                >
                  <p className="text-2xl font-semibold">
                    {faker.number.int(50)}
                  </p>
                  <p className="text-xs font-medium">
                    {`${faker.commerce.productAdjective()} ${faker.company.buzzNoun()}`}
                  </p>
                </div>
              </div>
            );
          }
        })
      )}
    </div>
  );
};

const classNamesGenerator = (size: number[]) => {
  return classNames(
    // size[0] is column span
    size[0] === 3 ? "col-span-3" : "",
    size[0] === 2 ? "col-span-2" : "",
    // size[1] is row span
    size[1] === 3 ? "row-span-3" : "",
    size[1] === 2 ? "row-span-2" : "",
    "border border-polo-blue-300 bg-polo-blue-200 dark:border-polo-blue-900 dark:bg-polo-blue-700 rounded-lg min-h-20 flex items-center justify-center"
  );
};
