import { useState } from "react";
import { Button } from "semantic-ui-react";
import styles from "./Info.module.scss";
import { useBasket } from "@/hooks";

export function Info(props: any) {
  const { product } = props;
  const [loading, setLoading] = useState(false);
  const { addBasket } = useBasket();

  const addBasketWrapper = () => {
    setLoading(true);
    addBasket(product.prodId);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.prodTitle}</h1>
      <span className={styles.stock}>
        {`Quedan ${product.prodStock} unidade/s`}
      </span>
      <span className={styles.price}>{product.prodPrice}€</span>

      <Button
        primary
        className={styles.btnBuy}
        onClick={addBasketWrapper}
        loading={loading}
      >
        Añadir al carrito de compra
      </Button>
    </div>
  );
}
