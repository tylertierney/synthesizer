import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CSS from "csstype";
import styles from "./Dial.module.css";

interface IDial {
  range: number;
  value: number;
  setValue: (val: number) => void;
}

const WIDTH = 80;
const DEGREES = 140;
const CIRCUMFERENCE = Math.PI * WIDTH;

const Dial = ({ range, value, setValue }: IDial) => {
  const [isClicked, setIsClicked] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);

  useEffect(() => {
    const mouseup = (): void => {
      if (!isClicked) return;
      setIsClicked(false);
    };

    const mousemove = (e: MouseEvent): void => {
      if (!isClicked) return;

      // setValue((prev) => {
      //   const minimized = (dragStartY - e.pageY) * (range * 0.01);
      //   if (prev + minimized > range) return range;
      //   if (prev + minimized < -1 * range) return -1 * range;
      //   return prev + minimized;
      // });

      const minimized = (dragStartY - e.pageY) * (range * 0.01);
      if (value + minimized > range) {
        setValue(range);
        return;
      }

      if (value + minimized < -1 * range) {
        setValue(-1 * range);
        return;
      }
      setValue(value + minimized);
      // return prev + minimized;

      setDragStartY(e.pageY);
    };

    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", mousemove);

    return () => {
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("mousemove", mousemove);
    };
  }, [isClicked, dragStartY, setValue, range]);

  const mousedown = (e: React.MouseEvent): void => {
    setIsClicked(true);
    setDragStartY(e.pageY);
  };

  const getRotation = (
    value: number,
    range: number
  ): CSS.Properties["rotate"] => {
    const proportion = (value / range) * DEGREES;
    if (proportion > DEGREES) return DEGREES + "deg";
    if (proportion < -1 * DEGREES) return "-" + DEGREES + "deg";
    return proportion + "deg";
  };

  const getDashOffset = (value: number, range: number) => {
    const proportion =
      (value / range) * ((DEGREES / 180) * (CIRCUMFERENCE / 2));
    return proportion + CIRCUMFERENCE;
  };

  const doubleClick = (): void => {
    setValue(0);
  };

  return (
    <>
      <div
        className={styles.dialContainer}
        onMouseDown={(e) => mousedown(e)}
        onDoubleClick={() => doubleClick()}
      >
        <div
          className={styles.dial}
          style={{
            rotate: getRotation(value, range),
            width: WIDTH + "px",
            height: WIDTH + "px",
          }}
        >
          <div className={styles.finger}></div>
        </div>
        <svg
          width={WIDTH}
          height={WIDTH}
          viewBox={`0 0 ${WIDTH} ${WIDTH}`}
          role="slider"
          style={{
            overflow: "visible",
            outline: "none",
            touchAction: "manipulation",
            position: "absolute",
            zIndex: -2,
          }}
        >
          <circle
            strokeWidth={10}
            stroke="#3D99FF"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={"-" + getDashOffset(value, range)}
            transform="rotate(-90 40 40)"
            fill="none"
            strokeLinecap="square"
            cx="40"
            cy="40"
            r="40"
          ></circle>
        </svg>
      </div>
    </>
  );
};

export default Dial;
