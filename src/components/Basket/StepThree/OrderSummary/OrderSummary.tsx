import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import styles from "./OrderSummary.module.scss";
import { orderCtrl } from "@/api";
import { useBasket } from "@/hooks";
import { OrderDetailI, ProductI } from "@/utils";

export function OrderSummary(props: any) {
  const { products, address, nextDisabled = false, currencyRate } = props;
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetailI[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const { deleteAllItems } = useBasket();

  useEffect(() => {
    let totalTemp = 0;
    let orderDetailsTemp: OrderDetailI[] = [];

    products.forEach((product: ProductI) => {
      totalTemp += (Number(product.prodPrice) * currencyRate.currencyRate) * Number(product.quantity);
      orderDetailsTemp.push({
        odCurrency: currencyRate.selectedCurrency,
        odCurrencyLastSymbol: currencyRate.currencyLastSymbol,
        odCurrencySymbol: currencyRate.currencySymbol,
        odPrice: (Number(product.prodPrice) * currencyRate.currencyRate).toFixed(2),
        odProdId: product.prodId,
        odQuantity: Number(product.quantity)
      });
    });

    setTotal(totalTemp);
    setOrderDetails(orderDetailsTemp);
  }, [products]);

  const onPay = async () => {
    try {
      setLoading(true);
      orderDetails.forEach((orderDetail: OrderDetailI) => orderDetail.odPrice = Number(orderDetail.odPrice));
      const data = {
        orderAddId: address.addId,
        orderDate: new Date(),
        orderDetails: orderDetails,
        orderTotal: total
      };
      await orderCtrl.create(data);
      deleteAllItems();
      router.replace({ query: { ...router.query, step: 4 } });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (!total) return null;

  return (
    <div className={styles.container}>
      <h2>Resumen</h2>

      <div className={styles.prices}>
        <div>
          <span>Total</span>
          <span>{currencyRate.currencySymbol}{total.toFixed(2)}{currencyRate.currencyLastSymbol}</span>
        </div>
      </div>

      <Button
        primary
        fluid
        disabled={nextDisabled}
        onClick={onPay}
        loading={loading}
      >
        Pagar
      </Button>
    </div>
  );
}
