import { useState } from "react";
import { Button } from "semantic-ui-react";
import { ManageUsersForm } from "../ManageUsersForm";
import { Modal } from "@/components/Shared";

export function ManageUsers(props: any) {
  const { onReload } = props;
  const [openModal, setOpenModal] = useState(false);

  const openCloseModal = () => setOpenModal((prevState) => !prevState);

  return (
    <>
      <Button primary onClick={openCloseModal}>
        Administrar usuarios
      </Button>

      <Modal.Basic
        show={openModal}
        onClose={openCloseModal}
        title="Administrar usuarios "
      >
        <ManageUsersForm onClose={openCloseModal} onReload={onReload} />
      </Modal.Basic>
    </>
  );
}
