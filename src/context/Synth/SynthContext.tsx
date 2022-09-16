import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import * as Tone from "tone";
import { Synth, SynthOptions } from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";
import noteMap from "../../constants/noteMap";

const initialOptions: RecursivePartial<SynthOptions> = {
  envelope: { release: 3, attack: 0.1 },
  detune: 0,
};

const initialSynth = new Tone.PolySynth(Tone.FMSynth, initialOptions);
initialSynth.volume.value = -12;

interface IContext {
  options: RecursivePartial<SynthOptions>;
  setDetune: (val: number) => void;
}

const SynthContext = createContext<IContext>({} as IContext);

export const SynthProvider = ({ children }: { children: React.ReactNode }) => {
  const [synth, setSynth] = useState(initialSynth);

  const reducer = (
    options: IContext["options"],
    action: { type: string; payload: any }
  ) => {
    switch (action.type) {
      case "detune":
        const res = { ...options, detune: action.payload };
        console.log(res);
        return { ...options, detune: action.payload };
      default:
        return options;
    }
  };

  const [options, dispatch] = useReducer(reducer, initialOptions);

  useEffect(() => {
    if (!synth) return;
    const activateTone = async () => {
      await Tone.start();
    };

    window.addEventListener("click", activateTone);

    navigator
      .requestMIDIAccess()
      .then((access) => {
        console.log(access.inputs);
        access.inputs.forEach((entry) => {
          console.log(entry);
          entry.onmidimessage = (msg) => {
            const noteName = noteMap[msg.data[1]];
            if (msg.data[0] === 144) {
              synth.triggerAttack(noteName);
            } else {
              synth.triggerRelease(noteName);
            }
          };
        });
      })
      .catch((err) => console.log(err));

    return () => window.removeEventListener("click", activateTone);
  }, []);

  useEffect(() => {
    if (!synth) return;
    synth.set(options);
    synth.toDestination();
  }, [options]);

  const setDetune = (val: number) => {
    dispatch({ type: "detune", payload: val });
  };

  return (
    <SynthContext.Provider value={{ options, setDetune }}>
      {children}
    </SynthContext.Provider>
  );
};

const useSynth = () => useContext(SynthContext);
export default useSynth;
