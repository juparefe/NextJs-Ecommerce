import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Modal } from '@/components/Shared';

export function AddProduct(props: any) {
	const { onReload } = props;
	const [openModal, setOpenModal] = useState(false);

	const openCloseModal = () => setOpenModal((prevState) => !prevState);

	return (
		<>
			<Button primary onClick={openCloseModal}>
				Nuevo producto
			</Button>

			<Modal.Basic show={openModal} onClose={openCloseModal} title="Nuevo producto">
				<h2>Contenido Modal</h2>
			</Modal.Basic>
		</>
	);
}
