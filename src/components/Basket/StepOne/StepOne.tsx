import { Container } from "semantic-ui-react";
import { OrderSummary } from "../OrderSummary";
import { ListProducts } from "./ListProducts";
import styles from "./StepOne.module.scss";

export function StepOne(props: any) {
  const { products, currencyObject } = props;

  return (
    <Container className={styles.container}>
      <div className={styles.left}>
        <ListProducts
          products={products}
          currencyObject={currencyObject}
        />
      </div>
      <div className={styles.right}>
        <OrderSummary
          products={products}
          nextStep={2}
          btnText="Proceder con la dirección"
          currencyObject={currencyObject}
        />
      </div>
    </Container>
  );
}
