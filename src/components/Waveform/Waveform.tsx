import Sketch from "react-p5";
import p5Types from "p5";
import * as Tone from "tone";

interface IProps {
  width: number;
  height: number;
}

const wave = new Tone.Waveform();
Tone.Destination.connect(wave);

const Waveform = ({ width, height }: IProps) => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background("#2c293e");
    p5.stroke("#1bd5ff");
    const buffer = wave.getValue();

    let start = 0;
    for (let i = 1; i < buffer.length; i++) {
      if (buffer[i - 1] < 0 && buffer[i] >= 0) {
        start = i;
        break;
      }
    }

    let end = start + buffer.length / 2;

    for (let i = start; i < end; i++) {
      let x1 = p5.map(i - 1, start, end, 0, p5.width);
      let y1 = p5.map(buffer[i - 1] * 2.5, -1, 1, 0, p5.height);

      let x2 = p5.map(i, start, end, 0, p5.width);
      let y2 = p5.map(buffer[i] * 2.5, -1, 1, 0, p5.height);

      p5.line(x1, y1, x2, y2);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Waveform;
