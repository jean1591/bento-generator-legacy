"use client";

import { Bento as BentoType, generateRandomBento } from "@/utils";
import { useEffect, useState } from "react";

import { Bento } from "./components/bento";
import { H1 } from "./designSystem/title/h1";
import { renderToStaticMarkup } from "react-dom/server";

export default function Home() {
  const [bento, setBento] = useState(generateRandomBento(8, 5));
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        <div>
          <H1 title="Bento Design Generator" />

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
