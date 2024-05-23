"use client";

import { Bento as BentoType, generateRandomBento } from "@/utils";
import { useEffect, useState } from "react";

import { Bento } from "./components/bento";
import { H1 } from "./designSystem/title/h1";
import { renderToStaticMarkup } from "react-dom/server";

export default function Home() {
  const [bento, setBento] = useState(generateRandomBento(6, 5));
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        <div>
          <H1 title="Bento Design Generator" />

          <div className="mt-12 flex items-center justify-center">
            <button
              className="px-5 py-2 text-lg border-2 rounded-full border-plum-500 text-polo-blue-100 bg-plum-500 shadow-md hover:border-plum-300 hover:text-plum-500 hover:bg-polo-blue-100 hover:shadow-xl transition ease-in-out duration-500"
              onClick={() => setBento(generateRandomBento(6, 5))}
            >
              Regenerate
            </button>
          </div>

          <div className="mt-12 p-5 border border-polo-blue-200 shadow-lg rounded-lg">
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
