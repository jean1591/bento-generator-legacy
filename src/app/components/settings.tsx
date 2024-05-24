import {
  setBento,
  setColumnNumber,
  setRowNumber,
} from "../lib/store/features/bentoSettings/slice";

import { PiArrowClockwiseFill } from "react-icons/pi";
import { useDispatch } from "react-redux";

export const Settings = () => {
  const dispatch = useDispatch();

  return (
    <div className="mt-10 flex items-center justify-center gap-x-10">
      <div className="w-1/3">
        <p className="mb-2 text-sm font-normal text-polo-blue-700">Columns</p>

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
        <p className="mb-2 text-sm font-normal text-polo-blue-700">Rows</p>

        <input
          type="range"
          className="block w-full h-2 bg-polo-blue-200 border border-polo-blue-300 rounded-lg appearance-none"
          min="3"
          max="8"
          step="1"
          onChange={(e) => dispatch(setRowNumber(parseInt(e.target.value, 10)))}
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
  );
};
