import styles from "./Display.module.css";
import * as Tone from "tone";
import useTransport from "../../context/Transport/TransportContext";

const Display = () => {
  const { tempo, setTempo } = useTransport();

  return (
    <div className={styles.display}>
      <input
        type="number"
        onChange={(e) => {
          const res = parseInt(e.target.value, 10);
          Tone.Transport.bpm.value = res;
          setTempo(res);
        }}
        className={styles.bpm}
        value={tempo}
      />
      <label className={styles.label}>Tempo</label>
    </div>
  );
};

export default Display;
