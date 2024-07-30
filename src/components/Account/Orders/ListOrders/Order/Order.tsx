import { DateTime } from "luxon";
import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
// import { AddressDetails } from "../AddressDetails";
// import { ProductsDetails } from "../ProductsDetails";
import styles from "./Order.module.scss";
import { Modal } from "@/components/Shared";

export function Order(props: any) {
  const { order } = props;
  const [showModal, setShowModal] = useState(false);

  const createdAt = new Date(order.orderDate).toISOString();

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <div className={styles.container}>
        <div>
          <p>Numero de pedido: {order.orderId}</p>
          <span>
            {DateTime.fromISO(createdAt, { locale: "es" }).toFormat(
              "dd/MM/yyyy"
            )}
          </span>
        </div>

        <Button icon onClick={onOpenCloseModal}>
          <Icon name="eye" />
        </Button>
      </div>

      <Modal.Basic
        show={showModal}
        onClose={onOpenCloseModal}
        title="Detalles del pedido"
      >
        <p>Product details</p>
        <p>Adrres details</p>

        <p className={styles.totalOrder}>{order.orderTotal}€</p>
      </Modal.Basic>
    </>
  );
}
