import "./App.css";
import useSynth from "./context/Options/OptionsContext";
import Dial from "./components/Dial/Dial";
import useInstrument from "./context/Instrument/InstrumentContext";
import * as Tone from "tone";
// import { useEffect, useState } from "react";
import Waveform from "./components/Waveform/Waveform";
import { useEffect } from "react";
import Meter from "./components/Meter/Meter";
import Envelope from "./components/Envelope/Envelope";

const meter = new Tone.Meter();

function App() {
  const {
    options,
    fineTuning,
    coarseTuning,
    setFineTuning,
    setCoarseTuning,
    setVolume,
    setOscillator,
  } = useSynth();
  const { synth, setSynth } = useInstrument();
  const osc: OscillatorType[] = ["sine", "sawtooth"];

  useEffect(() => {
    synth.connect(meter);
  }, [synth]);

  return (
    <>
      <Meter />
      <Waveform width={500} height={50} />
      <button
        onClick={() => {
          synth.connect(meter);
        }}
      >
        test
      </button>
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
          name={"Fine"}
          range={100}
          setValue={setFineTuning}
          value={fineTuning}
          WIDTH={60}
        />
        <Dial
          name={"Coarse"}
          range={36}
          setValue={setCoarseTuning}
          value={coarseTuning}
          WIDTH={60}
        />
        {/* <input
          type="range"
          value={options.volume}
          max={10}
          min={-50}
          onChange={(e) => setVolume(parseInt(e.target.value, 10))}
        /> */}
        <Envelope />
      </div>
    </>
  );
}

export default App;
