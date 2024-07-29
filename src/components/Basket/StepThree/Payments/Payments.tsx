import classNames from "classnames";
import styles from "./Payments.module.scss";

export function Payments(props: any) {
  const { paymentSelected, setPaymentSelected } = props;
  const paymentsData = [
    {
      description: "Paga solo cuando recibas el producto",
      id: 1,
      name: "Contrareembolso"
    },
    {
      description: "Paga en recepcion y recibe tu producto",
      id: 2,
      name: "En recepcion"
    }
  ];

  return (
    <div className={styles.payments}>
      <h2>Metodos de pago</h2>

      {paymentsData.map((item) => (
        <div
          key={item.id}
          className={classNames(styles.payment, {
            [styles.selected]: item.id === paymentSelected?.id
          })}
          onClick={() => setPaymentSelected(item)}
        >
          <div>
            <p className={styles.name}>{item.name}:</p>
            <p className={styles.description}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
