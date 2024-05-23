import { Bento as BentoType, classNames } from "@/utils";

export const Bento = ({ bento }: { bento: BentoType }) => {
  return (
    <div className="grid grid-cols-8 gap-2">
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

const classNamesGenerator = (size: number[]) => {
  return classNames(
    // size[0] is column span
    size[0] === 3 ? "col-span-3" : "",
    size[0] === 2 ? "col-span-2" : "",
    // size[1] is row span
    size[1] === 3 ? "row-span-3" : "",
    size[1] === 2 ? "row-span-2" : "",
    "border border-polo-blue-300 bg-polo-blue-200 rounded-lg min-h-20"
  );
};
