import React, { useEffect, useRef, useState } from "react";
import { Time } from "tone/build/esm/core/type/Units";
import useOptions from "../../context/Options/OptionsContext";
import useAltClick from "../../hooks/useAltKey";
import FreeSlider from "./FreeSlider";
import styles from "./Slider.module.css";
import SyncSlider from "./SyncSlider";
import * as Tone from "tone";
import { TimeBaseClass } from "tone/build/esm/core/type/TimeBase";

const trackWidth = 14;
const trackHeight = 180;
const thumbHeight = 18;

interface IProps {
  value: number;
  setValue: (val: number) => void;
  label: string;
  max: number;
  defaultValue: number;
}

const Slider = ({ value, setValue, label, max, defaultValue }: IProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [sync, setSync] = useState(false);
  const { options } = useOptions();

  const inputValue = Number.parseFloat(String(value));

  const handleInputChange = (e: React.ChangeEvent) => {
    const val = parseFloat((e.target as HTMLInputElement).value);
    if (isNaN(val)) return;
    if (val > max || val < 0) return;
    setValue(val);
  };

  const getSliderType = (value: number): React.ReactNode => {
    if (!sync) {
      return (
        <FreeSlider
          value={value}
          setValue={setValue}
          defaultValue={defaultValue}
          max={10}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
      );
    } else {
      return (
        <SyncSlider
          value={value}
          setValue={setValue}
          defaultValue={defaultValue}
          max={10}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
      );
    }
  };

  return (
    <div
      className={`${styles.sliderAndName} ${isDragging && styles.isDragging}`}
    >
      <div className={styles.valueContainer}>
        <input
          type="number"
          className={styles.value}
          value={inputValue}
          max={10}
          min={0}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      {getSliderType(value)}

      <button
        className={`${styles.syncBtn} ${sync && styles.active}`}
        onClick={() => {
          setSync((prev) => !prev);
        }}
      >
        Sync
      </button>
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default Slider;
