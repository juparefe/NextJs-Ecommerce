import { DateTime } from "luxon";
import { useState, useEffect, createContext } from "react";
import { basketCtrl, currencyCtrl } from "@/api";
import { Constants, CurrencyCode, CurrencyI, CurrencyRateI, LSBasketI, RatesI } from "@/utils";

export const BasketContext = createContext({} as BasketContextType);

interface BasketContextType {
	  addBasket: (productId: string) => void;
    basket: LSBasketI[];
    changeQuantityItem: (productId: string, quantity: string) => void;
    deleteAllItems: () => void;
    deleteItem: (productId: string) => void;
    getCurrencies: any;
    total: number;
}

// Creacion del componente proveedor del contexto para el carrito de compra
export function BasketProvider(props: any) {
  const { children } = props;
  const [basket, setBasket] = useState([{ id: '0', quantity: 0 }]);
  const [total, setTotal] = useState(basketCtrl.count());

  useEffect(() => {
    const response = basketCtrl.getAll();
    setBasket(response);
  }, []);

  // Se ejecuta cada que hay una actualizacion en los productos del carrito de compra
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

  const getCurrencies = async () => {
    const newCurrencyString = localStorage.getItem('currency');
    const newCurrencyJson: CurrencyI = newCurrencyString ? JSON.parse(newCurrencyString) : Constants.DEFAULT_CURRENCY;
    const { currencyLastSymbol, currencySymbol, selectedCurrency } = newCurrencyJson;
    const newCurrencyRatesString: string | null = localStorage.getItem('ratesCOP');
    let currency: CurrencyRateI = {
      currencyLastSymbol,
      currencyRate: 1,
      currencySymbol,
      selectedCurrency
    };
    if (newCurrencyRatesString) {
      const newCurrencyRatesJson: RatesI = JSON.parse(newCurrencyRatesString);
      // Convertir timeLastUpdate a un objeto DateTime de Luxon
      let timeLastUpdateDate = DateTime.fromRFC2822(newCurrencyRatesJson.timeLastUpdate).toUTC();
      // Obtener la fecha actual con Luxon
      const currentDate = DateTime.now();
      // Verificar si timeLastUpdate es hoy y si no llamar a ExchangeRate API
      if(timeLastUpdateDate.hasSame(currentDate, 'day')) {
        return {
          ...currency,
          currencyRate: newCurrencyRatesJson[selectedCurrency.toLowerCase() as CurrencyCode]
        };
      } else {
        const currenciesFromService = await currencyCtrl.getAll();
        return {
          ...currency,
          currencyRate: currenciesFromService[selectedCurrency.toLowerCase() as CurrencyCode]
        };
      };
    } else {
      const currenciesFromService = await currencyCtrl.getAll();
      return {
        ...currency,
        currencyRate: currenciesFromService[selectedCurrency.toLowerCase() as CurrencyCode]
      };
    }
  };

  const data: BasketContextType = {
    addBasket,
    basket,
    changeQuantityItem,
    deleteAllItems,
    deleteItem,
    getCurrencies,
    total
  };

  return (
    <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
  );
}
