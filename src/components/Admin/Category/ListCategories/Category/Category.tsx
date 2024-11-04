import { useEffect, useState } from "react";
import { Icon, Image, Table } from "semantic-ui-react";
import { CategoryForm } from "../../CategoryForm";
import { CategoryImageForm } from "../../CategoryImageForm";
import styles from "./Category.module.scss";
import { categoryCtrl } from "@/api";
import { Modal } from "@/components/Shared";
import { CategoryI, Constants } from "@/utils";
import { fn } from '@/utils/functions';

export function Category(props: { category: CategoryI; onReload: any }) {
  const { category, onReload } = props;
  const [image, setImage] = useState(Constants.NOT_FOUND_IMAGE);
  const [openModal, setOpenModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalContent, setModalContent] = useState(<p></p>);

  useEffect(() => {
		const imageUrl = fn.getUrlImage(category.categPath);
		fn.checkIfImageExists(imageUrl, (exists: boolean) => {
			if (exists) setImage(imageUrl);
		});
	}, [category]);

  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await categoryCtrl.delete(category.categId);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
		setOpenModal(false);
		setModalContent(<p></p>);
	};

  const openEditCategory = () => {
		setModalContent(<CategoryForm onClose={closeModal} onReload={onReload} category={category} />);
		setOpenModal(true);
	};

  const openEditImageCategory = () => {
		setModalContent(<CategoryImageForm onClose={closeModal} onReload={onReload} categPath={category.categPath} />);
		setOpenModal(true);
	};

  return (
    <>
      <Table.Cell textAlign="center">{category.categId}</Table.Cell>
      <Table.Cell textAlign="center">
				<Image className={styles.image} src={image} alt={category.categName} />
			</Table.Cell>
      <Table.Cell>{category.categName}</Table.Cell>
      <Table.Cell>{category.categPath}</Table.Cell>
      <Table.Cell className={styles.actions} textAlign="center">
        <Icon name="pencil" link onClick={openEditCategory} />
        <Icon name="image" link onClick={openEditImageCategory} />
        <Icon name="trash" link onClick={onOpenCloseConfirm} />
      </Table.Cell>

      <Modal.Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`¿Estas seguro de eliminar la categoría (${category.categName})?`}
      />

      <Modal.Basic show={openModal} onClose={closeModal} title={`Editar (${category.categName})`}>
				{modalContent}
			</Modal.Basic>
    </>
  );
}
