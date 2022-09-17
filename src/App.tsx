import "./App.css";
import useSynth from "./context/Options/OptionsContext";
import Dial from "./components/Dial/Dial";
import useInstrument from "./context/Instrument/InstrumentContext";
import * as Tone from "tone";
import useAltClick from "./hooks/useAltClick";
import { useRef } from "react";

function App() {
  const test = useRef<HTMLButtonElement>(null);
  useAltClick(test);
  const { options, setDetune, setVolume } = useSynth();
  const { setSynth } = useInstrument();

  return (
    <>
      <button
        ref={test}
        onClick={() => setSynth(new Tone.PolySynth(Tone.FMSynth))}
      >
        FM
      </button>
      <button onClick={() => setSynth(new Tone.PolySynth(Tone.AMSynth))}>
        AM
      </button>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <Dial
          name={"Detune"}
          range={100}
          setValue={setDetune}
          value={options.detune ?? 0}
        />
        <input
          type="range"
          value={options.volume}
          max={10}
          min={-50}
          onChange={(e) => setVolume(parseInt(e.target.value, 10))}
        />
      </div>
    </>
  );
}

export default App;
