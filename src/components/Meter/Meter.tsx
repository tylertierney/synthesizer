import Sketch from "react-p5";
import p5Types from "p5";
import * as Tone from "tone";
import useInstrument from "../../context/Instrument/InstrumentContext";
import React, { useEffect, useState } from "react";
import styles from "./Meter.module.css";
import useSynth from "../../context/Options/OptionsContext";
import useAltClick from "../../hooks/useAltKey";

const meter = new Tone.Meter();
const WIDTH = 200;

const Meter = () => {
  const [peak, setPeak] = useState(0);
  const { synth } = useInstrument();
  const { options, setVolume } = useSynth();
  const holdingAltKey = useAltClick();

  useEffect(() => {
    meter.normalRange = true;
    synth.connect(meter);
  }, [synth]);

  // size of the rect representing volume
  let meterSize = 0;
  // the max level registered
  let maxVol = 0;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(WIDTH, 30).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background("#2c293e");

    // contrary to online documentation, this returns values way above 1.0 in Safari
    // (with or without the smoothing parameter)

    let volume = meter.getValue();

    // set width of rect representing volume equal to:
    // the current volume * width OR previous width -1 (whichever is larger)
    if (typeof volume !== "number") return;
    meterSize = p5.max(volume * p5.width, meterSize - 1);

    const color = getColor(volume);
    p5.fill(color);
    p5.stroke(color);

    if (meterSize > 1) {
      p5.rect(0, 0, meterSize, 50);
    }

    // output numerical value of highest reading
    setPeak(() => {
      if (typeof volume !== "number") return maxVol;
      return p5.max(maxVol, volume);
    });
    maxVol = peak;
    // p5.text(maxVol, 10, 10);
  };

  const getColor = (value: number) => {
    //value from 0 to 1
    let hue = (1 - value) * 120;
    if (hue > 120) hue = 120;
    const res = hue.toString(10);
    return ["hsl(", ~~res, ",100%,50%)"].join("");
  };

  const onClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (holdingAltKey) setVolume(-10);
  };

  return (
    <>
      <div
        className={styles.meterContainer}
        onClick={(e) => onClick(e)}
        style={{ width: WIDTH + "px" }}
      >
        <input
          className={styles.meterInputHTML}
          type="range"
          max={4}
          min={-50}
          value={options.volume}
          onChange={(e) => setVolume(parseInt(e.target.value, 10))}
          onClick={(e) => {
            console.log("input clicked");
            e.preventDefault();
          }}
        />
        <Sketch setup={setup} draw={draw} />
      </div>
      {/* <p>{peak.toFixed(2)}</p> */}
    </>
  );
};

export default Meter;
