import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container, Icon, SemanticICONS } from 'semantic-ui-react';
import styles from './JoinLayout.module.scss';
import { data } from './JoinLayoutData';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks';

export function JoinLayout(props: any) {
	const { children } = props;
	const user = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push('/');
		}
	}, [router, user]);

	if (!user) return null;

	return (
		<Container className={styles.container}>
			<Layout.Logo />
			<div>
				<div className={styles.left}>
					{data.map((item, index) => (
						<div key={index}>
							<Icon name={item.icon as SemanticICONS} />
							<div>
								<h3>{item.title}</h3>
								<span>{item.description}</span>
							</div>
						</div>
					))}
				</div>
				<div className={styles.right}>{children}</div>
			</div>
		</Container>
	);
}
