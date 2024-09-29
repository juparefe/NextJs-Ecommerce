import { useState } from "react";
import { Button } from "semantic-ui-react";
import { AddressForm } from "../AddressForm";
import { Modal } from "@/components/Shared";

export function AddAddress(props: any) {
  const { onReload } = props;
  const [showModal, setShowModal] = useState(false);

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <Button primary onClick={onCloseOpenModal}>
        Nueva dirección
      </Button>

      <Modal.Basic
        show={showModal}
        onClose={onCloseOpenModal}
        title="Nueva dirección"
      >
        <AddressForm onClose={onCloseOpenModal} onReload={onReload} />
      </Modal.Basic>
    </>
  );
}
