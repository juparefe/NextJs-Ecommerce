import { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { ProductForm } from '../ProductForm';
import { Modal } from '@/components/Shared';
import { useWindowSize } from '@/hooks';
import { WindowScreenE } from '@/utils';

export function AddProduct(props: any) {
	const { onReload } = props;
	const [openModal, setOpenModal] = useState(false);
	const [buttonText, setButtonText] = useState('Nuevo producto');
	const { windowScreen } = useWindowSize();

	const openCloseModal = () => setOpenModal((prevState) => !prevState);

	useEffect(() => {
        setButtonText([WindowScreenE.Mobile, WindowScreenE.Tablet].includes(windowScreen) ? 'Añadir' : 'Nuevo producto');
    }, [windowScreen]);

	return (
		<>
			<Button primary onClick={openCloseModal}>
				{buttonText}
			</Button>

			<Modal.Basic show={openModal} onClose={openCloseModal} title="Nuevo producto">
				<ProductForm onClose={openCloseModal} onReload={onReload} />
			</Modal.Basic>
		</>
	);
}
