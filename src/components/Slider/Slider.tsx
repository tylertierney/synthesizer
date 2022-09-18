import { Dispatch, SetStateAction } from "react";
import * as Tone from "tone";
import { TimeObject } from "tone/build/esm/core/type/Units";
import useAltClick from "../../hooks/useAltKey";
import styles from "./Slider.module.css";

interface IProps {
  value: number;
  setValue: (val: number) => void;
  label: string;
}

const Slider = ({ value, setValue, label }: IProps) => {
  const holdingAltKey = useAltClick();

  const onDoubleClick = (): void => {
    setValue(0);
  };

  const onClick = (): void => {
    if (holdingAltKey) {
      console.log(value);
      setValue(0);
    }
  };

  return (
    <div className={styles.sliderAndName} onClick={() => onClick()}>
      <div className={styles.sliderContainer} onClick={() => onClick}>
        <input
          className={styles.sliderInputHTML}
          type="range"
          value={value}
          min={0}
          max={100}
          onChange={(e) => {
            setValue(parseInt(e.target.value, 10) / 100);
          }}
        />
      </div>
      <span>{label}</span>
    </div>
  );
};

export default Slider;
