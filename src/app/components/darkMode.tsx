import { PiMoon, PiSunHorizon } from "react-icons/pi";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "@/utils";

export const DarkMode = () => {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [enabled]);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? "bg-polo-blue-500" : "bg-polo-blue-100",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-polo-blue-300 focus:ring-offset-2"
      )}
    >
      <span
        className={classNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-polo-blue-100 shadow ring-0 transition duration-200 ease-in-out"
        )}
      >
        <span
          className={classNames(
            enabled
              ? "opacity-0 duration-100 ease-out"
              : "opacity-100 duration-200 ease-in",
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity text-polo-blue-500"
          )}
          aria-hidden="true"
        >
          <PiMoon/>
        </span>
        <span
          className={classNames(
            enabled
              ? "opacity-100 duration-200 ease-in"
              : "opacity-0 duration-100 ease-out",
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity text-polo-blue-500"
          )}
          aria-hidden="true"
        >
          <PiSunHorizon/>
        </span>
      </span>
    </Switch>
  );
};
