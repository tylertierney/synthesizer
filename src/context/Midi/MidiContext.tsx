import React, { createContext, useContext, useEffect, useState } from "react";

const MidiContext = createContext<WebMidi.MIDIInputMap | null>(null);

export const MidiProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputs, setInputs] = useState<WebMidi.MIDIInputMap | null>(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    navigator
      .requestMIDIAccess()
      .then((access) => {
        setInputs(access.inputs);
      })
      .catch((err) => console.log(err));
  }, []);

  return <MidiContext.Provider value={inputs}>{children}</MidiContext.Provider>;
};

const useMidi = () => useContext(MidiContext);
export default useMidi;
