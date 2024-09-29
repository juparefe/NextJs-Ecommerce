import { useState } from 'react';
import { Confirm, Button } from 'semantic-ui-react';
import styles from "./ConfirmModal.module.scss";

export function ConfirmModal(props: any) {
	const { onConfirm, ...rest } = props;
	const [loading, setLoading] = useState(false);

	const onConfirmWrapper = () => {
		setLoading(true);
		onConfirm();
	};

	return (
		<Confirm
			className={styles.modal}
			size="mini"
			onConfirm={onConfirmWrapper}
			confirmButton={
				<Button primary loading={loading}>
					Ok
				</Button>
			}
			{...rest}
		/>
	);
}
