import { useState } from "react";
import { Button } from "semantic-ui-react";
import { CategoryForm } from "../CategoryForm";
import { Modal } from "@/components/Shared";

export function AddCategory(props: any) {
  const { onReload } = props;
  const [openModal, setOpenModal] = useState(false);

  const openCloseModal = () => setOpenModal((prevState) => !prevState);

  return (
    <>
      <Button primary onClick={openCloseModal}>
        Nueva categoría
      </Button>

      <Modal.Basic
        show={openModal}
        onClose={openCloseModal}
        title="Nueva categoría"
      >
        <CategoryForm onClose={openCloseModal} onReload={onReload} />
      </Modal.Basic>
    </>
  );
}
