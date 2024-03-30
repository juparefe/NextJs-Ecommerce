import Link from 'next/link';
import { Icon } from 'semantic-ui-react';
import styles from './AdminButton.module.scss';

export function AdminButton() {
	return (
		<Link href="/admin" className={styles.adminButton}>
			<Icon name="configure" />
			Admin
		</Link>
	);
}
