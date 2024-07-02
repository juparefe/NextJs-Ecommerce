import { useContext } from "react";
import { BasketContext } from "@/contexts";

// Hook personalizado para acceder al contexto: BasketContext
export const useBasket = () => useContext(BasketContext);
