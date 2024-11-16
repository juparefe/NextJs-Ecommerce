import { useEffect, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { ProductForm } from '../ProductForm';
import { Modal } from '@/components/Shared';
import { WindowScreenE } from '@/utils';

export function AddProduct(props: any) {
	const { className, onReload, windowScreen } = props;
	const [openModal, setOpenModal] = useState(false);
	const [showButtonText, setShowButtonText] = useState(true);

	const openCloseModal = () => setOpenModal((prevState) => !prevState);

	useEffect(() => {
        setShowButtonText([WindowScreenE.Mobile].includes(windowScreen) ? false : true);
    }, [windowScreen]);

	return (
		<>
			<Button icon primary onClick={openCloseModal} className={className}>
				<Icon name='add'/>
				{showButtonText && ("Nuevo producto")}
			</Button>

			<Modal.Basic show={openModal} onClose={openCloseModal} title="Nuevo producto">
				<ProductForm onClose={openCloseModal} onReload={onReload} />
			</Modal.Basic>
		</>
	);
}
