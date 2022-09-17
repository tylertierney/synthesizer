import React, { createContext, useContext, useEffect, useState } from "react";
import * as Tone from "tone";

const ToneContext = createContext(null);

export const ToneProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const activateTone = async () => {
      await Tone.start();
    };

    window.addEventListener("click", activateTone);

    return () => window.removeEventListener("click", activateTone);
  }, []);

  return <ToneContext.Provider value={null}>{children}</ToneContext.Provider>;
};

const useTone = () => useContext(ToneContext);
export default useTone;
