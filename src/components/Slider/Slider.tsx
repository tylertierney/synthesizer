import { Dispatch, SetStateAction } from "react";
import * as Tone from "tone";
import { TimeObject } from "tone/build/esm/core/type/Units";
import styles from "./Slider.module.css";

interface IProps {
  value: number;
  setValue: (val: number) => void;
}

const Slider = ({ value, setValue }: IProps) => {
  return (
    <input
      type="range"
      value={value}
      onChange={(e) => setValue(parseInt(e.target.value, 10))}
    />
  );
};

export default Slider;
