"use client";

import { Bento, Settings } from "./components";
import { useEffect, useState } from "react";

import { H1 } from "./designSystem";
import { RootState } from "./lib/store/store";
import { useSelector } from "react-redux";
import { DarkMode } from "./components/darkMode";
import { Toast } from "./components/toast";

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
          <DarkMode />
          <Toast />

          <H1 title="Bento Generator" />

          <p className="text-center text-lg">
            Set parameters and generate your bento on the fly
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
