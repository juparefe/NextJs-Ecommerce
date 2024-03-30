import Link from 'next/link';
import { Icon, Label } from 'semantic-ui-react';
import styles from './Basket.module.scss';

// TODO: Implement the total items in the basket
const total = 6;

export function Basket() {
	return (
		<Link href={'/basket'} className={styles.basket}>
			<Icon name="cart" />
			{total > 0 && (
				<Label color="teal" circular>
					{total}
				</Label>
			)}
			Mi cesta
		</Link>
	);
}
