import { useState, useEffect } from "react";
import { Address } from "./Address";
import styles from "./ListAddresses.module.scss";
import { addressCtrl } from "@/api";
import { Loading, NoResult } from "@/components/Shared";
import { AddressI } from "@/utils";

export function ListAddresses(props: any) {
  const { reload, onReload } = props;
  const [addresses, setAddresses] = useState<AddressI[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll();
        setAddresses(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  if (!addresses || addresses.length === 0) {
    return <Loading text="Cargando direcciones" top={100} />;
  }

  return (
    <div className={styles.addresses}>
      { addresses.length === 0 && <NoResult text="Crea tu primera dirección" />}

      { addresses.map((address) => (
        <Address key={address.addId} address={address} onReload={onReload} />
      ))}
    </div>
  );
}
