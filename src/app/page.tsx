"use client";

import {
  setBento,
  setColumnNumber,
  setRowNumber,
} from "./lib/store/features/bentoSettings/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Bento } from "./components/bento";
import { Bento as BentoType } from "@/utils";
import { H1 } from "./designSystem/title/h1";
import { PiArrowClockwiseFill } from "react-icons/pi";
import { RootState } from "./lib/store/store";
import { renderToStaticMarkup } from "react-dom/server";

export default function Home() {
  const [isClient, setIsClient] = useState<boolean>(false);

  const dispatch = useDispatch();

  const bento = useSelector((state: RootState) => state.bentoSettings.bento);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        <div>
          <H1 title="Bento Generator" />

          <p className="text-center text-lg">
            Specify your desired number of columns and rows and generate bento
            design on the fly
          </p>

          {/* MOVE THIS TO SETTINGS COMPONENT */}
          <div className="mt-10 flex items-center justify-center gap-x-10">
            <div className="w-1/3">
              <p className="mb-2 text-sm font-normal text-polo-blue-700">
                Columns
              </p>

              <input
                type="range"
                className="block w-full h-2 bg-polo-blue-200 border border-polo-blue-300 rounded-lg appearance-none"
                min="3"
                max="8"
                step="1"
                onChange={(e) =>
                  dispatch(setColumnNumber(parseInt(e.target.value, 10)))
                }
              />
            </div>

            <div className="w-1/3">
              <p className="mb-2 text-sm font-normal text-polo-blue-700">
                Rows
              </p>

              <input
                type="range"
                className="block w-full h-2 bg-polo-blue-200 border border-polo-blue-300 rounded-lg appearance-none"
                min="3"
                max="8"
                step="1"
                onChange={(e) =>
                  dispatch(setRowNumber(parseInt(e.target.value, 10)))
                }
              />
            </div>

            <button
              className="flex items-center justify-center gap-x-5 px-5 py-2 text-lg border-2 rounded-full border-plum-500 text-polo-blue-100 bg-plum-500 shadow-md hover:border-plum-300 hover:text-plum-500 hover:bg-polo-blue-100 hover:shadow-xl transition ease-in-out duration-500"
              onClick={() => dispatch(setBento())}
            >
              <PiArrowClockwiseFill className="h-6 w-6" />
              Generate
            </button>
          </div>

          <div className="mt-10 p-5 border border-polo-blue-200 shadow-lg rounded-lg">
            <Bento bento={bento} />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

function componentToString(bento: BentoType) {
  return renderToStaticMarkup(<Bento bento={bento} />);
}
