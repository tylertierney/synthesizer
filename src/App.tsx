import "./App.css";
import useSynth from "./context/Options/OptionsContext";
import Dial from "./components/Dial/Dial";
import useInstrument from "./context/Instrument/InstrumentContext";
import * as Tone from "tone";

function App() {
  const { options, setDetune, setVolume, setOscillator } = useSynth();
  const { setSynth } = useInstrument();

  const osc: OscillatorType[] = ["sine", "sawtooth"];

  return (
    <>
      <button onClick={() => setSynth(new Tone.PolySynth(Tone.FMSynth))}>
        FM
      </button>
      <button onClick={() => setSynth(new Tone.PolySynth(Tone.AMSynth))}>
        AM
      </button>
      <button onClick={() => setSynth(new Tone.PolySynth(Tone.Synth))}>
        regular
      </button>
      <select onChange={(e) => setOscillator(e.target.value as OscillatorType)}>
        {osc.map((type: OscillatorType, i) => (
          <option key={i} value={type}>
            {type}
          </option>
        ))}
      </select>
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
