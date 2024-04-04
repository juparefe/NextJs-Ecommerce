import { useState, useEffect } from 'react';
import { Icon, Image, Table } from 'semantic-ui-react';
import { ProductForm } from '../../ProductForm';
import { ProductImageForm } from '../../ProductImageForm';
import styles from './Product.module.scss';
import { productCtrl } from '@/api';
import { Modal } from '@/components/Shared';
import { ProductI } from '@/utils';
import { fn } from '@/utils/functions';

const NOT_FOUND_IMAGE = '/images/not-found.jpg';

export function Product(props: { product: ProductI; onReload: any }) {
	const { product, onReload } = props;
	const [image, setImage] = useState(NOT_FOUND_IMAGE);
	const [showConfirm, setShowConfirm] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [modalContent, setModalContent] = useState(<p></p>);

	useEffect(() => {
		const imageUrl = fn.getUrlImage(product.prodId);
		fn.checkIfImageExists(imageUrl, (exists: boolean) => {
			if (exists) setImage(imageUrl);
		});
	}, [product]);

	const closeModal = () => {
		setOpenModal(false);
		setModalContent(<p></p>);
	};

	const openEditProduct = () => {
		setModalContent(<ProductForm onClose={closeModal} onReload={onReload} product={product} />);
		setOpenModal(true);
	};

	const openEditImageProduct = () => {
		setModalContent(<ProductImageForm onClose={closeModal} onReload={onReload} productId={product.prodId} />);
		setOpenModal(true);
	};

	return (
		<>
			<Table.Cell>{product.prodId}</Table.Cell>
			<Table.Cell>
				<Image className={styles.image} src={image} alt={product.prodTitle} />
			</Table.Cell>
			<Table.Cell>{product.prodTitle}</Table.Cell>
			<Table.Cell>{product.prodPrice}€</Table.Cell>
			<Table.Cell>{product.prodStock} Unidades</Table.Cell>
			<Table.Cell className={styles.actions}>
				<Icon name="pencil" onClick={openEditProduct} />
				<Icon name="image" link onClick={openEditImageProduct} />
				<Icon name="trash" />
			</Table.Cell>

			<Modal.Basic show={openModal} onClose={closeModal} title={`Editar (${product.prodTitle})`}>
				{modalContent}
			</Modal.Basic>
		</>
	);
}
