import React, { createContext, useContext, useEffect, useState } from "react";
import noteMap from "../../constants/noteMap";
import * as Tone from "tone";

const MidiContext = createContext(null);

export const MidiProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputs, setInputs] = useState<WebMidi.MIDIInputMap>();
  const [controller, setController] = useState(null);

  // useEffect(() => {
  //   navigator
  //     .requestMIDIAccess()
  //     .then((access) => {
  //       setInputs(access.inputs);
  //       // access.inputs.forEach((entry) => {
  //       //   entry.onmidimessage = (msg) => {
  //       //     const noteName = noteMap[msg.data[1]];
  //       //     if (msg.data[0] === 144) {
  //       //       synth.triggerAttack(noteName);
  //       //     } else {
  //       //       synth.triggerRelease(noteName);
  //       //     }
  //       //   };
  //       // });
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <MidiContext.Provider value={controller}>{children}</MidiContext.Provider>
  );
};

const useMidi = () => useContext(MidiContext);
export default useMidi;
