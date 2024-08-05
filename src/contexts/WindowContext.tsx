import { useState, useEffect, createContext } from "react";
import { WindowI } from "@/utils";

export const WindowContext = createContext({} as WindowContextType);

interface WindowContextType {
    windowSize: WindowI;
}

// Creacion del componente proveedor del contexto para el cambio de tamaño de pantalla
export function WindowProvider(props: any) {
    const { children } = props;
    const [windowSize, setWindowSize] = useState({
        height: typeof window !== "undefined" ? window.innerHeight : 0,
        width: typeof window !== "undefined" ? window.innerWidth : 0
    });

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

     // Se ejecuta cada que hay una actualizacion en el tamaño de pantalla
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      });
    };

    const data: WindowContextType = {
      windowSize
    };

    return (
      <WindowContext.Provider value={data}>{children}</WindowContext.Provider>
    );
}
