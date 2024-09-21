import { useState, useEffect } from 'react';
import { Icon, Image, Table } from 'semantic-ui-react';
import { ProductForm } from '../../ProductForm';
import { ProductImageForm } from '../../ProductImageForm';
import styles from './Product.module.scss';
import { productCtrl } from '@/api';
import { Modal } from '@/components/Shared';
import { useBasket } from '@/hooks';
import { Constants, CurrencyRateI, ProductI } from '@/utils';
import { fn } from '@/utils/functions';

export function Product(props: { product: ProductI; onReload: any }) {
	const { product, onReload } = props;
	const [currencyRate, setCurrencyRate] = useState<CurrencyRateI>(Constants.DEFAULT_CURRENCY);
	const [image, setImage] = useState(Constants.NOT_FOUND_IMAGE);
	const [modalContent, setModalContent] = useState(<p></p>);
	const [openModal, setOpenModal] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const { getCurrencies } = useBasket();

	useEffect(() => {
		// Obtener las tasas de cambio de las monedas al montar el componente
		(async () => {
		  try {
			const currency = await getCurrencies(); // Espera a obtener las tasas de cambio
			setCurrencyRate(currency); // Almacena las tasas en el estado
		  } catch (error) {
			console.error("Error obteniendo las tasas de cambio", error);
		  }
		})();
	}, []);

	useEffect(() => {
		const imageUrl = fn.getUrlImage(product.prodId);
		fn.checkIfImageExists(imageUrl, (exists: boolean) => {
			if (exists) setImage(imageUrl);
		});
        const productPrice = Number(product.prodPrice) * currencyRate.currencyRate;
        product.prodPrice = productPrice.toFixed(2);
	}, [product]);

	const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

	const onDelete = async () => {
		try {
			await productCtrl.delete(product.prodId);
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
			<Table.Cell>{currencyRate.currencySymbol}{product.prodPrice}{currencyRate.currencyLastSymbol}</Table.Cell>
			<Table.Cell>{product.prodStock} Unidades</Table.Cell>
			<Table.Cell className={styles.actions}>
				<Icon name="pencil" link onClick={openEditProduct} />
				<Icon name="image" link onClick={openEditImageProduct} />
				<Icon name="trash" link onClick={onOpenCloseConfirm} />
			</Table.Cell>

			<Modal.Confirm
				open={showConfirm}
				onCancel={onOpenCloseConfirm}
				onConfirm={onDelete}
				content={`¿Estas seguro de eliminar el producto: (${product.prodTitle})?`}
			/>

			<Modal.Basic show={openModal} onClose={closeModal} title={`Editar (${product.prodTitle})`}>
				{modalContent}
			</Modal.Basic>
		</>
	);
}
