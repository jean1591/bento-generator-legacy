"use client";

import { Bento, Settings } from "./components";
import { useEffect, useState } from "react";

import { Bento as BentoType } from "@/utils";
import { H1 } from "./designSystem";
import { RootState } from "./lib/store/store";
import { renderToStaticMarkup } from "react-dom/server";
import { useSelector } from "react-redux";

export default function Home() {
  const [isClient, setIsClient] = useState<boolean>(false);

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
            Parameter and generate your bento on the fly
          </p>

          <Settings />
          <Bento bento={bento} />
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
