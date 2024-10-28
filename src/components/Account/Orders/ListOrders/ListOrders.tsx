import { useState, useEffect } from "react";
import { Order } from "./Order";
import { orderCtrl } from "@/api";
import { Loading, NoResult } from "@/components/Shared";
import { OrderI } from "@/utils";

export function ListOrders() {
  const [orders, setOrders] = useState<OrderI[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll();
        setOrders(response || []);
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
        <Order key={order.orderId} order={order} />
      ))}
    </div>
  );
}
