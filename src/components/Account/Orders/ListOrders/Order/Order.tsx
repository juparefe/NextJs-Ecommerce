import { DateTime } from "luxon";
import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { AddressDetails } from "../AddressDetails";
import { ProductsDetails } from "../ProductDetails";
import styles from "./Order.module.scss";
import { Modal } from "@/components/Shared";

export function Order(props: any) {
  const { order, currencyRate } = props;
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
        <ProductsDetails productsOrder={order.OrderDetails} currencyRate={currencyRate}/>
        <AddressDetails addressId={order.orderAddId} />

        <p className={styles.totalOrder}>
          {currencyRate.currencySymbol}
          {(order.orderTotal * currencyRate.currencyRate).toFixed(2)}
          {currencyRate.currencyLastSymbol}
        </p>
      </Modal.Basic>
    </>
  );
}
