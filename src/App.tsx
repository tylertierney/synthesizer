// import { useEffect, useState } from "react";
import "./App.css";
// import Dial from "./components/Dial/Dial";
import useSynth from "./context/Synth/SynthContext";
import Dial from "./components/Dial/Dial2";

function App() {
  const { options, setDetune } = useSynth();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <Dial range={50} setValue={setDetune} value={options.detune ?? 0} />
        {/* <Dial range={240} setValue={setReverb} value={reverb} /> */}
      </div>
    </>
  );
}

export default App;
