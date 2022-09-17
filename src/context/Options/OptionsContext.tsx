import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { SynthOptions } from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";
import noteMap from "../../constants/noteMap";
import useInstrument from "../Instrument/InstrumentContext";
import useMidi from "../Midi/MidiContext";

const initialOptions: RecursivePartial<SynthOptions> = {
  envelope: {
    release: 3,
  },
  detune: 0,
  volume: -10,
  oscillator: {
    type: "sine",
  },
};

interface IContext {
  options: RecursivePartial<SynthOptions>;
  fineTuning: number;
  coarseTuning: number;
  setFineTuning: (val: number) => void;
  setCoarseTuning: (val: number) => void;
  setVolume: (val: number) => void;
  setOscillator: (type: OscillatorType) => void;
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
      case "oscillator":
        return { ...options, oscillator: { type: action.payload } };
      default:
        return options;
    }
  };

  const [options, dispatch] = useReducer(reducer, initialOptions);
  const [fineTuning, setFineTuning] = useState(options.detune ?? 0);
  const [coarseTuning, setCoarseTuning] = useState(
    options.detune ? options.detune % 100 : 0
  );

  useEffect(() => {
    if (!synth) return;
    synth.set(options);
    synth.toDestination();
  }, [options, synth]);

  const setDetune = (fine: number, coarse: number) => {
    dispatch({ type: "detune", payload: fine + coarse * 100 });
  };

  const setVolume = (val: number) => {
    dispatch({ type: "volume", payload: val });
  };

  const setOscillator = (type: OscillatorType) => {
    dispatch({ type: "oscillator", payload: type });
  };

  useEffect(() => {
    setDetune(fineTuning, coarseTuning);
  }, [fineTuning, coarseTuning]);

  return (
    <OptionsContext.Provider
      value={{
        options,
        fineTuning,
        coarseTuning,
        setFineTuning,
        setCoarseTuning,
        setVolume,
        setOscillator,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};

const useOptions = () => useContext(OptionsContext);
export default useOptions;
