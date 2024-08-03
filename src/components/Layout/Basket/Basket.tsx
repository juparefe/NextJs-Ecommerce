import { Icon, Label } from 'semantic-ui-react';
import styles from './Basket.module.scss';
import { useBasket } from "@/hooks";

export function Basket() {
	const { total } = useBasket();

	return (
		<div className={styles.basket}>
			<Icon name="cart" />
			{total > 0 && (
				<Label color="teal" circular>
					{total}
				</Label>
			)}
			Mi cesta
		</div>
	);
}
