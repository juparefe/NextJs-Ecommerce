import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import styles from "./Info.module.scss";
import { useAuth, useBasket } from "@/hooks";
import { fn } from "@/utils";

export function Info(props: any) {
  const { product } = props;
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState<boolean>(true);
  const { currencyObject } = useAuth();
  const { addBasket, basket } = useBasket();
  const router = useRouter();

  useEffect(() => {
    const prodStock = basket.find(item => product.prodId === item.id);

    if (!prodStock) {
      setAvailable(true);
    } else {
      setAvailable(product.prodStock > prodStock.quantity);
    }
  }, [addBasket]);

  const addBasketWrapper = () => {
    setLoading(true);
    addBasket(product.prodId);

    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 500);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.prodTitle}</h1>
      {(available) && <span className={styles.stock}>
        {`Quedan ${product.prodStock} unidad/es`}
      </span>}
      <span className={styles.price}>{fn.formatCurrency(Number(product.prodPrice), currencyObject)}</span>

      {(!available) && <span className={styles.stock}>
        {`Los sentimos, no quedan unidades disponibles`}
      </span>}

      {(available) && <Button
        primary
        className={styles.btnBuy}
        onClick={addBasketWrapper}
        loading={loading}
      >
        Añadir al carrito de compra
      </Button>}
    </div>
  );
}
