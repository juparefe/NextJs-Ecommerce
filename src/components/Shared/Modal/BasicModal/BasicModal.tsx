import { Modal } from 'semantic-ui-react';
import styles from "./BasicModal.module.scss";

export function BasicModal(props: any) {
	const { children, onClose, show, title } = props;

	return (
		<Modal
			centered={true}
			className={styles.modal}
			closeIcon={true}
			onClose={onClose}
			open={show}
			size="small">
			<Modal.Header>{title}</Modal.Header>
			<Modal.Content>{children}</Modal.Content>
		</Modal>
	);
}
