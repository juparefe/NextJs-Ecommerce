import { Icon } from 'semantic-ui-react';
import styles from './AdminButton.module.scss';

export function AdminButton() {
	return (
		<div className={styles.adminButton}>
			<Icon name="configure" />
			Admin
		</div>
	);
}
