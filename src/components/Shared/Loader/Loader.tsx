import { Loader } from 'semantic-ui-react';
import { Separator } from '../Separator';
import styles from './Loader.module.scss';

export function Loading(props: any) {
	const { text = 'Cargando', top = 0 } = props;

	return (
		<>
			<Separator height={top} />
			<Loader active inline="centered" className={styles.loading}>
				{text}
			</Loader>
		</>
	);
}
