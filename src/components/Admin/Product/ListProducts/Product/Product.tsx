import { useState, useEffect } from 'react';
import { Button, ButtonGroup, Icon, Image, Table } from 'semantic-ui-react';
import { ProductDiscountForm } from '../../ProductDiscountForm';
import { ProductForm } from '../../ProductForm';
import { ProductImageForm } from '../../ProductImageForm';
import styles from './Product.module.scss';
import { productCtrl } from '@/api';
import { Modal } from '@/components/Shared';
import { Constants, ProductI } from '@/utils';
import { fn } from '@/utils/functions';

export function Product(props: { product: ProductI; onReload: any }) {
	const { product, onReload } = props;
	const [image, setImage] = useState(Constants.NOT_FOUND_IMAGE);
	const [modalConfirmContent, setModalConfirmContent] = useState('');
	const [modalContent, setModalContent] = useState(<p></p>);
	const [onConfirm, setOnConfirm] = useState<(() => Promise<void>) | null>(null);
	const [openModal, setOpenModal] = useState(false);
	const [productPrice, setProductPrice] = useState('$ 0');
	const [productDiscount, setProductDiscount] = useState('-');
	const [showConfirm, setShowConfirm] = useState(false);

	useEffect(() => {
		const imageUrl = fn.getUrlImage(product.prodId);
		fn.checkIfImageExists(imageUrl, (exists: boolean) => {
			if (exists) setImage(imageUrl);
		});
        setProductPrice(fn.formatCurrency(Number(product.prodPrice), Constants.DEFAULT_CURRENCY));
		if (Number(product.prodDiscount) > 0) {
			setProductDiscount(String(product.prodDiscount+'%'));
		} else {
			setProductDiscount('-');
		}
	}, [product]);

	const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

	const onDelete = async () => {
		try {
			await productCtrl.delete(product.prodId);
			onReload();
			onOpenCloseConfirm();
		} catch (error) {
			console.error("Error deleting product: ", error);
		}
	};

	const onDeleteDiscount = async () => {
		try {
			await productCtrl.updateDiscount(product.prodId, JSON.stringify({ ProdDiscount: 0 }));
			onReload();
			onOpenCloseConfirm();
		} catch (error) {
			console.error("Error deleting product's discount: ", error);
		}
	};

	const closeModal = () => {
		setOpenModal(false);
		setModalContent(<p></p>);
	};

	const openAddEditProductDiscount = () => {
		setModalContent(<ProductDiscountForm onClose={closeModal} onReload={onReload} product={product} />);
		setOpenModal(true);
	};

	const openConfirmDeleteProduct = () => {
		setModalConfirmContent(`¿Estas seguro de eliminar el producto: (${product.prodTitle})?`);
		setOnConfirm(() => onDelete);
		onOpenCloseConfirm();
	};

	const openConfirmDeleteDiscount = () => {
		if (product.prodDiscount === "-") {
			return;
		}
		setModalConfirmContent(`¿Estas seguro de eliminar el descuento de (${product.prodDiscount}%) al producto: (${product.prodTitle})?`);
		setOnConfirm(() => onDeleteDiscount);
		onOpenCloseConfirm();
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
			<Table.Cell textAlign='center'>{product.prodId}</Table.Cell>
			<Table.Cell textAlign='center'>
				<Image className={styles.image} src={image} alt={product.prodTitle} />
			</Table.Cell>
			<Table.Cell className={styles.cell}>{product.prodTitle}</Table.Cell>
			<Table.Cell>{productPrice}</Table.Cell>
			<Table.Cell textAlign='center'>{product.prodStock} Unidades</Table.Cell>
			<Table.Cell textAlign='center'>
				<ButtonGroup basic compact size='mini'>
					<Button basic color='teal' onClick={openAddEditProductDiscount}><Icon color='teal' name='add user'/></Button>
					<Button color='teal'>{productDiscount}</Button>
					<Button basic color='red' onClick={openConfirmDeleteDiscount}><Icon color='red' name='user delete'/></Button>
				</ButtonGroup>
            </Table.Cell>
			<Table.Cell className={styles.actions} textAlign='center'>
				<Icon name="pencil" link onClick={openEditProduct} />
				<Icon name="image" link onClick={openEditImageProduct} />
				<Icon name="trash" link onClick={openConfirmDeleteProduct} />
			</Table.Cell>

			<Modal.Confirm
				open={showConfirm}
				onCancel={onOpenCloseConfirm}
				onConfirm={onConfirm}
				content={modalConfirmContent}
			/>

			<Modal.Basic
				show={openModal}
				onClose={closeModal}
				title={`Editar (${product.prodTitle})`}
			>
				{modalContent}
			</Modal.Basic>
		</>
	);
}
