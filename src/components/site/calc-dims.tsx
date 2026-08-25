import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CalcDims = {
  largura: number;
  comprimento: number;
  inclinacao: number;
  aguas: "1" | "2" | "3" | "4";
};

type Ctx = {
  dims: CalcDims | null;
  setDims: (d: CalcDims) => void;
};

const CalcDimsContext = createContext<Ctx>({ dims: null, setDims: () => {} });

export function CalcDimsProvider({ children }: { children: ReactNode }) {
  const [dims, setDims] = useState<CalcDims | null>(null);
  const value = useMemo(() => ({ dims, setDims }), [dims]);
  return <CalcDimsContext.Provider value={value}>{children}</CalcDimsContext.Provider>;
}

export function useCalcDims() {
  return useContext(CalcDimsContext);
}
