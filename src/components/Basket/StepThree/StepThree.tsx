import { useState } from "react";
import { Container } from "semantic-ui-react";
import { OrderSummary } from "./OrderSummary";
import { Payments } from "./Payments";
import styles from "./StepThree.module.scss";

export function StepThree(props: any) {
  const { products, address } = props;
  const [paymentSelected, setPaymentSelected] = useState(null);

  return (
    <Container className={styles.container}>
      <div className={styles.left}>
        <Payments
          paymentSelected={paymentSelected}
          setPaymentSelected={setPaymentSelected}
        />
      </div>
      <div className={styles.right}>
        <OrderSummary
          products={products}
          address={address}
          nextDisabled={!paymentSelected}
        />
      </div>
    </Container>
  );
}
