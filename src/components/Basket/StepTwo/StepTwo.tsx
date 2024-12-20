import { Container } from "semantic-ui-react";
import { OrderSummary } from "../OrderSummary";
import { Addresses } from "./Addresses";
import styles from "./StepTwo.module.scss";

export function StepTwo(props: any) {
  const { products, address, setAddress, nextDisabled, currencyObject } = props;

  return (
    <Container className={styles.container}>
      <div className={styles.left}>
        <Addresses address={address} setAddress={setAddress} />
      </div>
      <div className={styles.right}>
        <OrderSummary
          products={products}
          nextStep={3}
          btnText="Proceder con el pago"
          nextDisabled={nextDisabled}
          currencyObject={currencyObject}
        />
      </div>
    </Container>
  );
}
