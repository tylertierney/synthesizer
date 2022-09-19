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
      />
    </div>
  );
};

export default Envelope;
