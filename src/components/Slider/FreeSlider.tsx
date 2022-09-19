import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Time } from "tone/build/esm/core/type/Units";
import useAltClick from "../../hooks/useAltKey";
import styles from "./Slider.module.css";
import * as Tone from "tone";

const trackWidth = 14;
const trackHeight = 180;
const thumbHeight = 18;

interface IProps {
  value: number;
  setValue: (val: number) => void;
  max: number;
  defaultValue: number;
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
}

const FreeSlider = ({
  value,
  setValue,
  max,
  defaultValue,
  isDragging,
  setIsDragging,
}: IProps) => {
  const [dragStartY, setDragStartY] = useState(0);

  const holdingAltKey = useAltClick();

  useEffect(() => {
    const mouseup = () => {
      if (!isDragging) return;
      setIsDragging(false);
    };

    const mousemove = (e: MouseEvent) => {
      if (!isDragging) return;
      const minimized = (dragStartY - e.pageY) * (max * 0.005);

      if (value + minimized > max) {
        setValue(max);
        setDragStartY(e.pageY);
        return;
      }

      if (value + minimized <= 0) {
        setValue(0);
        setDragStartY(e.pageY);
        return;
      }

      setValue(value + minimized);
      setDragStartY(e.pageY);
    };

    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", mousemove);

    return () => {
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("mousemove", mousemove);
    };
  }, [isDragging, dragStartY]);

  const onDoubleClick = (): void => {
    setValue(defaultValue);
  };

  const onClick = (): void => {
    if (holdingAltKey) {
      setValue(defaultValue);
    }
  };

  const mousedown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartY(e.pageY);
  };

  return (
    <div
      className={styles.sliderContainer}
      onClick={() => onClick()}
      onDoubleClick={() => onDoubleClick()}
      onMouseDown={(e) => mousedown(e)}
    >
      <div
        className={styles.beatsContainer}
        style={{ justifyContent: "space-between" }}
      >
        <span className={styles.beat}>{max}s</span>
        <span className={styles.beat}>0s</span>
      </div>
      <div
        className={styles.track}
        style={{ height: trackHeight + "px", width: trackWidth + "px" }}
      ></div>
      <div
        className={styles.thumb}
        style={{
          height: thumbHeight + "px",
          width: trackWidth + 8 + "px",
          bottom: value * 9 + "%",
        }}
      ></div>
    </div>
  );
};

export default FreeSlider;
