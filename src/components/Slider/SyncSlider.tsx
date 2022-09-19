import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Tone from "tone";
import useAltClick from "../../hooks/useAltKey";
import beats from "./beats";
import styles from "./Slider.module.css";

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

const SyncSlider = ({
  value,
  setValue,
  max,
  defaultValue,
  isDragging,
  setIsDragging,
}: IProps) => {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragValue, setDragValue] = useState(value);

  const holdingAltKey = useAltClick();

  useEffect(() => {
    const mouseup = () => {
      if (!isDragging) return;
      setDragValue(Math.min(~~dragValue * (beats.length / 9), 10));
      const noteName = beats[selectedBeatIndex].value;
      setValue(Tone.Time(noteName).toSeconds());
      setIsDragging(false);
    };

    const mousemove = (e: MouseEvent) => {
      if (!isDragging) return;
      const minimized = (dragStartY - e.pageY) * (max * 0.005);

      if (dragValue + minimized > max) {
        setDragValue(max);
        setDragStartY(e.pageY);
        return;
      }

      if (dragValue + minimized <= 0) {
        setDragValue(0);
        setDragStartY(e.pageY);
        return;
      }

      setDragValue(dragValue + minimized);
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

  let selectedBeatIndex = 0;
  let i = beats.length - 1;
  while (i >= 0) {
    if (
      dragValue < (beats.length - i) * (beats.length / 9) &&
      dragValue >= (beats.length - i - 1) * (beats.length / 9)
    ) {
      selectedBeatIndex = i;
    }
    i--;
  }

  // const getSelectedBeat = (dragValue: number, index: number) => {
  //   for (const { display } of beats) {
  //     if (
  //       dragValue < (beats.length - index) * (beats.length / 9) &&
  //       dragValue >= (beats.length - index - 1) * (beats.length / 9)
  //     ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  return (
    <div
      className={styles.sliderContainer}
      onClick={() => onClick()}
      onDoubleClick={() => onDoubleClick()}
      onMouseDown={(e) => mousedown(e)}
    >
      <div className={styles.beatsContainer}>
        {beats.map((beat, i) => (
          <span
            className={`${styles.beat} ${
              i === selectedBeatIndex && styles.highlightedBeat
            }`}
            key={i}
          >
            {beat.display}
          </span>
        ))}
      </div>
      <div
        ref={trackRef}
        className={styles.track}
        style={{ height: trackHeight + "px", width: trackWidth + "px" }}
      ></div>
      <div
        ref={thumbRef}
        className={styles.thumb}
        style={{
          height: thumbHeight + "px",
          width: trackWidth + 8 + "px",
          bottom: dragValue * 9 + "%",
        }}
      ></div>
      <h4 style={{ position: "fixed", bottom: "10px", color: "white" }}>
        {Tone.Time(value).toNotation()}
      </h4>
    </div>
  );
};

export default SyncSlider;
