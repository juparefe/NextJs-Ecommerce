import { Container } from "semantic-ui-react";
import { Resume } from "../Resume";
import { ListProducts } from "./ListProducts";
import styles from "./StepOne.module.scss";

export function StepOne(props: any) {
  const { products } = props;

  return (
    <Container className={styles.container}>
      <div className={styles.left}>
        <ListProducts products={products} />
      </div>
      <div className={styles.right}>
        <Resume
          products={products}
          nextStep={2}
          btnText="Proceder con la dirección"
        />
      </div>
    </Container>
  );
}
