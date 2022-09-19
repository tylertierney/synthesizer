import { useEffect, useState } from "react";
import { pianoKeys, keyNames } from "../../constants/pianoKeys";
import styles from "./Piano.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useInstrument from "../../context/Instrument/InstrumentContext";

const Piano = () => {
  const [octaveIndex, setOctaveIndex] = useState(3);
  const { synth } = useInstrument();
  const [depressedKeys, setDepressedKeys] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      const idx = keyNames.indexOf(e.key);
      if (idx >= 0) {
        setDepressedKeys((prev) => {
          const copy = new Set(prev);
          copy.add(idx);
          return copy;
        });
        const noteName = pianoKeys[12 * octaveIndex + idx].noteName;
        if (e.repeat) return;
        synth.triggerAttack(noteName);
      }
    };

    const keyup = (e: KeyboardEvent) => {
      const idx = keyNames.indexOf(e.key);
      if (idx >= 0) {
        setDepressedKeys((prev) => {
          const copy = new Set(prev);
          copy.delete(idx);
          return copy;
        });
        depressedKeys.delete(idx);
        const noteName = pianoKeys[12 * octaveIndex + idx].noteName;
        synth.triggerRelease(noteName);
      }
    };

    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);

    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
    };
  }, [octaveIndex]);

  const selectedOctaves = pianoKeys.slice(
    octaveIndex * 12,
    29 + octaveIndex * 12
  );

  const mousedown = (i: number) => {
    setIsDragging(true);
    const noteName = pianoKeys[12 * octaveIndex + i].noteName;
    synth.triggerAttack(noteName);
  };

  const mousemove = (i: number) => {
    if (!isDragging) return;
    const noteName = pianoKeys[12 * octaveIndex + i].noteName;
    synth.triggerAttackRelease(noteName, "4n");
  };

  const mouseup = (i: number) => {
    setIsDragging(false);
    const noteName = pianoKeys[12 * octaveIndex + i].noteName;
    synth.triggerRelease(noteName);
  };

  return (
    <div className={styles.pianoContainer}>
      <button
        className={styles.arrowBtn}
        style={{ visibility: octaveIndex > 0 ? "visible" : "hidden" }}
        onClick={() => setOctaveIndex((prev: number) => Math.max(prev - 1, 0))}
      >
        <IoIosArrowBack />
      </button>
      {selectedOctaves.map(({ noteName }, i) => {
        const keyName = keyNames[i % keyNames.length];
        return (
          <div className={styles.keyContainer} key={i}>
            <div
              onMouseDown={() => mousedown(i)}
              onMouseUp={() => mouseup(i)}
              onMouseMove={() => mousemove(i)}
              className={`${
                noteName.includes("#") ? styles.sharp : styles.natural
              } ${depressedKeys.has(i) && styles.depressed}`}
            >
              <span className={`${styles.noteName}`}>{noteName}</span>
              <span className={`${styles.keyName}`}>{keyName}</span>
            </div>
          </div>
        );
      })}

      <button
        className={styles.arrowBtn}
        style={{ visibility: octaveIndex >= 5 ? "hidden" : "visible" }}
        onClick={() => {
          setOctaveIndex((prev: number) => Math.min(prev + 1, 6));
        }}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Piano;
