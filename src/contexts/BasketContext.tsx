import { useState, useEffect, createContext } from "react";
import { basketCtrl } from "@/api";

export const BasketContext = createContext({} as BasketContextType);

interface BasketContextType {
	addBasket: (productId: string) => void;
    basket: null;
    changeQuantityItem: (productId: string, quantity: string) => void;
    deleteAllItems: () => void;
    deleteItem: (productId: string) => void;
    total: number;
}

// Creacion del componente proveedor del contexto para el carrito de compra
export function BasketProvider(props: any) {
  const { children } = props;
  const [basket, setBasket] = useState(null);
  const [total, setTotal] = useState(basketCtrl.count());

  useEffect(() => {
    const response = basketCtrl.getAll();
    setBasket(response);
  }, []);

  const refreshBasket = () => {
    setTotal(basketCtrl.count());
    setBasket(basketCtrl.getAll());
  };

  const addBasket = (productId: string) => {
    basketCtrl.add(productId);
    refreshBasket();
  };

  const changeQuantityItem = (productId: string, quantity: string) => {
    basketCtrl.changeQuantity(productId, quantity);
    refreshBasket();
  };

  const deleteItem = (productId: string) => {
    basketCtrl.deleteItem(productId);
    refreshBasket();
  };

  const deleteAllItems = () => {
    basketCtrl.deleteAll();
    refreshBasket();
  };

  const data: BasketContextType = {
    addBasket,
    basket,
    changeQuantityItem,
    deleteAllItems,
    deleteItem,
    total
  };

  return (
    <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
  );
}
