import { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './Account.module.scss';
import { useAuth } from '@/hooks';

export function Account() {
	const { user } = useAuth();
	const [accountText, setAccountText] = useState('');

	const handleResize = () => {
		setAccountText((window.innerWidth > 991 && (user && user.userEmail)) ? `${user.userEmail.slice(0, 14)}...` : user.userEmail);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className={styles.account}>
			<Icon name="user" />
			{(user && user.userEmail) ? accountText : 'Entrar'}
		</div>
	);
}
