import classNames from "classnames";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import styles from "./Addresses.module.scss";
import { addressCtrl } from "@/api";
import { Loading, NoResult } from "@/components/Shared";
import { useAuth } from "@/hooks";
import { AddressI } from "@/utils";

export function Addresses(props: any) {
  const { address, setAddress } = props;
  const [addresses, setAddresses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll();
        setAddresses(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user]);

  return (
    <div className={styles.addresses}>
      <h2>Dirección de envio</h2>

      {!addresses && <Loading text="Cargando direcciones" />}

      {addresses && addresses.length === 0 && (
        <div className={styles.noAddresses}>
          <NoResult text="No tienes ninguna dirección creada" />
          <Button as={Link} href="/account" primary>
            Crear dirección
          </Button>
        </div>
      )}

      {addresses.map((item: AddressI) => (
        <div
          key={item.addId}
          onClick={() => setAddress(item)}
          className={classNames(styles.address, {
            [styles.selected]: item.addId === address?.addId
          })}
        >
          <div>
            <p className={styles.title}>{item.addTitle}</p>
            <p className={styles.addressInfo}>
              {item.addName}, {item.addAddress}, {item.addState}, {item.addCity}
              , {item.addPostalCode}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
