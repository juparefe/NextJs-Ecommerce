import { useState, useEffect } from "react";
import { Order } from "./Order";
import { orderCtrl } from "@/api";
import { Loading, NoResult } from "@/components/Shared";
import { useBasket } from "@/hooks";
import { Constants, CurrencyRateI, OrderI } from "@/utils";

export function ListOrders() {
  const [currencyRate, setCurrencyRate] = useState<CurrencyRateI>(Constants.DEFAULT_CURRENCY);
  const [orders, setOrders] = useState([]);
  const { getCurrencies } = useBasket();

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll();
        const currency = await getCurrencies(); // Espera a obtener las tasas de cambio
			  setCurrencyRate(currency); // Almacena las tasas en el estado
        setOrders(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders) {
    return <Loading text="Cargando pedidos" top={100} />;
  }

  return (
    <div>
      {orders.length === 0 && <NoResult text="No tienes pedidos realizados" />}

      {orders.map((order: OrderI) => (
        <Order key={order.orderId} order={order} currencyRate={currencyRate} />
      ))}
    </div>
  );
}
