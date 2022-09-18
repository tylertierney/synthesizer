import { useState } from "react";
import useSynth from "../../context/Options/OptionsContext";
import Slider from "../Slider/Slider";

const Envelope = () => {
  const { options } = useSynth();
  const [attack, setAttack] = useState(options.envelope?.attack ?? 0);
  const [sustain, setSustain] = useState(options.envelope?.sustain);
  const [decay, setDecay] = useState(options.envelope?.decay);
  const [release, setRelease] = useState(options.envelope?.release);

  const handleAttack = (val: number) => {
    setAttack(val);
  };

  return <div>{/* <Slider value={attack} setValue={setAttack} /> */}</div>;
};

export default Envelope;
