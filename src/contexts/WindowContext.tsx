import { useState, useEffect, createContext } from "react";
import { WindowI, WindowScreenE } from "@/utils";

export const WindowContext = createContext({} as WindowContextType);

interface WindowContextType {
    windowSize: WindowI;
    windowScreen: WindowScreenE;
}

// Creacion del componente proveedor del contexto para el cambio de tamaño de pantalla
export function WindowProvider(props: any) {
    const { children } = props;
    const [windowSize, setWindowSize] = useState({
        height: typeof window !== "undefined" ? window.innerHeight : 0,
        width: typeof window !== "undefined" ? window.innerWidth : 0
    });
    const [windowScreen, setWindowScreen] = useState(WindowScreenE.Desktop);

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
      switch (true) {
        case window.innerWidth <=600:
          setWindowScreen(WindowScreenE.Mobile);
          break;
        case window.innerWidth <=900:
          setWindowScreen(WindowScreenE.Tablet);
          break;
        case window.innerWidth <=1200:
          setWindowScreen(WindowScreenE.Desktop);
          break;
        default:
          setWindowScreen(WindowScreenE.LargeDesktop);
          break;
      }
    };

    const data: WindowContextType = {
      windowScreen,
      windowSize
    };

    return (
      <WindowContext.Provider value={data}>{children}</WindowContext.Provider>
    );
}
