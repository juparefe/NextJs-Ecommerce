import Link from 'next/link';
import { Icon } from 'semantic-ui-react';
import styles from './Account.module.scss';
import { useAuth } from '@/hooks';

export function Account() {
	const { user } = useAuth();
	const url = (user && user.userEmail) ? '/account' : '/join/login';
	return (
		<Link href={url} className={styles.account}>
			<Icon name="user" />
			{(user && user.userEmail) ? `${user.userEmail.slice(0, 14)}...` : 'Entrar'}
		</Link>
	);
}
