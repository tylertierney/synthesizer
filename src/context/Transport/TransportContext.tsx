import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Tone from "tone";

interface IContext {
  tempo: number;
  setTempo: Dispatch<SetStateAction<number>>;
}

const TransportContext = createContext<IContext>({} as IContext);

export const TransportProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tempo, setTempo] = useState(Tone.Transport.bpm.value);

  const ctx = {
    tempo,
    setTempo,
  };

  return (
    <TransportContext.Provider value={ctx}>
      {children}
    </TransportContext.Provider>
  );
};

const useTransport = () => useContext(TransportContext);
export default useTransport;
