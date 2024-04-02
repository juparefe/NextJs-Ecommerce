import { useState, useEffect } from 'react';
import { Icon, Image, Table } from 'semantic-ui-react';
import styles from './Product.module.scss';
import { productCtrl } from '@/api';
import { ProductI } from '@/utils';
import { fn } from '@/utils/functions';

const NOT_FOUND_IMAGE = '/images/not-found.jpg';

export function Product(props: { product: ProductI }) {
	const { product } = props;
    const [image, setImage] = useState(NOT_FOUND_IMAGE);

    useEffect(() => {
        const imageUrl = fn.getUrlImage(product.prodId);
        fn.checkIfImageExists(imageUrl, (exists: boolean) => {
          if (exists) setImage(imageUrl);
        });
      }, [product]);

	return (
		<>
			<Table.Cell>{product.prodId}</Table.Cell>
			<Table.Cell>
				<Image className={styles.image} src={image} alt={product.prodTitle} />
			</Table.Cell>
			<Table.Cell>{product.prodTitle}</Table.Cell>
			<Table.Cell>{product.prodPrice}€</Table.Cell>
			<Table.Cell>{product.prodStock} Unidades</Table.Cell>
			<Table.Cell className={styles.actions}>
				<Icon name="pencil" />
				<Icon name="image" />
				<Icon name="trash" />
			</Table.Cell>
		</>
	);
}
