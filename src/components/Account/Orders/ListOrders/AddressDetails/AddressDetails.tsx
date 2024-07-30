import { useState, useEffect } from "react";
import styles from "./AddressDetails.module.scss";
import { addressCtrl } from "@/api";
import { Loading } from "@/components/Shared";
import { AddressI } from "@/utils";

export function AddressDetails(props: any) {
  const { addressId } = props;
  const [address, setAddress] = useState<AddressI>({
    addAddress: "",
    addCity: "",
    addId: "",
    addName: "",
    addPhone: "",
    addPostalCode: "",
    addState: "",
    addTitle: ""
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getById(addressId);
        setAddress(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [addressId]);

  if (!address) return <Loading text="Cargando dirección" />;

  return (
    <div className={styles.container}>
      <h4>Dirección de envio:</h4>

      <div className={styles.address}>
        <p className={styles.title}>{address.addTitle}</p>
        <p className={styles.addressInfo}>
          {address.addName}, {address.addAddress}, {address.addState},{" "}
          {address.addCity}, {address.addPostalCode}
        </p>
      </div>
    </div>
  );
}
