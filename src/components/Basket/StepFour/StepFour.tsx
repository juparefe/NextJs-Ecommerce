import Link from "next/link";
import { Container, Button, Icon } from "semantic-ui-react";
import styles from "./StepFour.module.scss";
export function StepFour() {
  return (
    <Container className={styles.container}>
      <Icon name="check circle outline" />
      <h2>!Compra exitosa!</h2>

      <Button as={Link} href="/account?tab=order" primary>
        Ver pedido
      </Button>
    </Container>
  );
}
