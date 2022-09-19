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
            ? options.envelope?.attack
            : 0
        }
        setValue={setAttack}
        label="A"
        max={10}
        defaultValue={0.05}
        allowSync={true}
      />
      <Slider
        value={
          typeof options.envelope?.decay === "number"
            ? options.envelope?.decay
            : 0
        }
        setValue={setDecay}
        label="D"
        max={10}
        defaultValue={0.05}
        allowSync={true}
      />
      <Slider
        value={
          typeof options.envelope?.sustain === "number"
            ? options.envelope?.sustain
            : 0
        }
        setValue={setSustain}
        label="S"
        max={1}
        defaultValue={0.05}
        allowSync={false}
      />
      <Slider
        value={
          typeof options.envelope?.release === "number"
            ? options.envelope?.release
            : 0
        }
        setValue={setRelease}
        label="R"
        max={10}
        defaultValue={0.05}
        allowSync={true}
      />
    </div>
  );
};

export default Envelope;
