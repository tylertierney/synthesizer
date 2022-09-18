import { useState } from "react";
import useSynth from "../../context/Options/OptionsContext";
import Slider from "../Slider/Slider";
import styles from "./Envelope.module.css";

const Envelope = () => {
  const { options, setAttack, setDecay, setSustain, setRelease } = useSynth();

  return (
    <div className={styles.envelopeContainer}>
      <Slider
        value={
          typeof options.envelope?.attack === "number"
            ? options.envelope?.attack * 100
            : 0
        }
        setValue={setAttack}
        label="A"
      />
      <Slider
        value={
          typeof options.envelope?.decay === "number"
            ? options.envelope?.decay * 100
            : 0
        }
        setValue={setDecay}
        label="D"
      />
      <Slider
        value={
          typeof options.envelope?.sustain === "number"
            ? options.envelope?.sustain * 100
            : 0
        }
        setValue={setSustain}
        label="S"
      />
      <Slider
        value={
          typeof options.envelope?.release === "number"
            ? options.envelope?.release * 100
            : 0
        }
        setValue={setRelease}
        label="R"
      />
    </div>
  );
};

export default Envelope;
