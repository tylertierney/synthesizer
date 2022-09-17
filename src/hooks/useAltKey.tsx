import React, { useEffect, useState } from "react";

const useAltClick = () => {
  const [holdingAltKey, setHoldingAltKey] = useState(false);

  useEffect(() => {
    const pressAlt = (e: KeyboardEvent) => {
      if (e.key === "Alt") {
        setHoldingAltKey(true);
      }
    };

    const releaseAlt = (e: KeyboardEvent) => {
      if (e.key === "Alt") {
        setHoldingAltKey(false);
      }
    };

    window.addEventListener("keydown", pressAlt);
    window.addEventListener("keyup", releaseAlt);

    return () => {
      window.removeEventListener("keydown", pressAlt);
      window.removeEventListener("keyup", releaseAlt);
    };
  }, []);

  return holdingAltKey;
};

export default useAltClick;
