import { useState, useEffect } from "react";
// import { Order } from "./Order";
import { orderCtrl } from "@/api";
import { Loading, NoResult } from "@/components/Shared";
import { OrderDetailI } from "@/utils";

export function ListOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll();
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

      {orders.map((order: OrderDetailI) => (
        order.odPrice
      ))}
    </div>
  );
}
