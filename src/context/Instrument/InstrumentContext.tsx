import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Tone from "tone";
import useMidi from "../Midi/MidiContext";
import noteMap from "../../constants/noteMap";
import { Monophonic } from "tone/build/esm/instrument/Monophonic";
import { DuoSynth, PolySynthOptions, SynthOptions } from "tone";

// const s = new Tone.PolySynth(Tone.Synth);

const initialSynth = new Tone.PolySynth(Tone.FMSynth);
// initialSynth.volume.value = -12;

interface IContext {
  synth: Tone.PolySynth<Tone.FMSynth | Tone.AMSynth | Tone.Synth>;
  // synth: Tone.PolySynth;
  setSynth: Dispatch<
    SetStateAction<Tone.PolySynth<Tone.FMSynth | Tone.AMSynth | Tone.Synth>>
  >;
  // setSynth: Dispatch<SetStateAction<Tone.PolySynth>>
}

const InstrumentContext = createContext<IContext>({
  synth: initialSynth,
  setSynth: () => null,
});

export const InstrumentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const inputs = useMidi();
  const [synth, setSynth] = useState(initialSynth);

  useEffect(() => {
    if (inputs) {
      inputs.forEach((entry) => {
        entry.onmidimessage = (msg) => {
          const noteName = noteMap[msg.data[1]];
          if (msg.data[0] === 144) {
            synth.triggerAttack(noteName);
          } else {
            synth.triggerRelease(noteName);
          }
        };
      });
    }
  }, [inputs, synth]);

  return (
    <InstrumentContext.Provider value={{ synth, setSynth }}>
      {children}
    </InstrumentContext.Provider>
  );
};

const useInstrument = () => useContext(InstrumentContext);
export default useInstrument;
