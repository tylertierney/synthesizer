import { useEffect, useState } from "react";
import CSS from "csstype";
import styles from "./Dial.module.css";
import useAltClick from "../../hooks/useAltKey";

interface IDial {
  name: string;
  range: number;
  value: number;
  setValue: (val: number) => void;
  WIDTH: number;
}

// const WIDTH = 80;
const DEGREES = 140;

const Dial = ({ name, range, value, setValue, WIDTH }: IDial) => {
  const [isClicked, setIsClicked] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const holdingAltKey = useAltClick();

  const CIRCUMFERENCE = Math.PI * WIDTH;

  useEffect(() => {
    const mouseup = (): void => {
      if (!isClicked) return;
      setIsClicked(false);
    };

    const mousemove = (e: MouseEvent): void => {
      if (!isClicked) return;

      const minimized = (dragStartY - e.pageY) * (range * 0.01);
      if (value + minimized > range) {
        setValue(range);
        setDragStartY(e.pageY);
        return;
      }

      if (value + minimized < -1 * range) {
        setValue(-1 * range);
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

  const getDashOffset = (value: number, range: number): number => {
    const proportion =
      (value / range) * ((DEGREES / 180) * (CIRCUMFERENCE / 2));
    return proportion + CIRCUMFERENCE;
  };

  const doubleClick = (): void => {
    setValue(0);
  };

  const onClick = (): void => {
    if (holdingAltKey) setValue(0);
  };

  return (
    <div className={`${styles.dialAndName} ${isClicked && styles.isClicked}`}>
      <div className={styles.nameContainer}>
        <span className={styles.name}>{name}</span>
        <span className={styles.value}>{~~value}</span>
      </div>
      <div
        className={styles.dialContainer}
        onMouseDown={(e) => mousedown(e)}
        onDoubleClick={() => doubleClick()}
        onClick={() => onClick()}
      >
        <div
          className={styles.dial}
          style={{
            rotate: getRotation(value, range),
            width: WIDTH + "px",
            height: WIDTH + "px",
          }}
        >
          <div className={styles.finger} style={{ height: "60%" }}></div>
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
            stroke="var(--blue)"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={"-" + getDashOffset(value, range)}
            transform={`rotate(-90 ${WIDTH / 2} ${WIDTH / 2})`}
            fill="none"
            strokeLinecap="butt"
            cx={WIDTH / 2}
            cy={WIDTH / 2}
            r={WIDTH / 2}
          ></circle>
        </svg>
      </div>
    </div>
  );
};

export default Dial;
