import { useContext } from "react";
import { WindowContext } from "@/contexts";

// Hook personalizado para acceder al contexto: WindowContext
export const useWindowSize = () => useContext(WindowContext);
