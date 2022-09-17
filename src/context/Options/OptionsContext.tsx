import React, { createContext, useContext, useEffect, useReducer } from "react";
import { SynthOptions } from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";
import noteMap from "../../constants/noteMap";
import useInstrument from "../Instrument/InstrumentContext";
import useMidi from "../Midi/MidiContext";

const initialOptions: RecursivePartial<SynthOptions> = {
  envelope: { release: 3, attack: 0.1 },
  detune: 0,
  volume: -10,
};

interface IContext {
  options: RecursivePartial<SynthOptions>;
  setDetune: (val: number) => void;
  setVolume: (val: number) => void;
}

const OptionsContext = createContext<IContext>({} as IContext);

export const OptionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { synth } = useInstrument();

  const reducer = (
    options: IContext["options"],
    action: { type: string; payload: any }
  ) => {
    switch (action.type) {
      case "detune":
        return { ...options, detune: action.payload };
      case "volume":
        return { ...options, volume: action.payload };
      default:
        return options;
    }
  };

  const [options, dispatch] = useReducer(reducer, initialOptions);

  useEffect(() => {
    if (!synth) return;
    synth.set(options);
    synth.toDestination();
  }, [options, synth]);

  const setDetune = (val: number) => {
    dispatch({ type: "detune", payload: val });
  };

  const setVolume = (val: number) => {
    dispatch({ type: "volume", payload: val });
  };

  return (
    <OptionsContext.Provider value={{ options, setDetune, setVolume }}>
      {children}
    </OptionsContext.Provider>
  );
};

const useOptions = () => useContext(OptionsContext);
export default useOptions;
