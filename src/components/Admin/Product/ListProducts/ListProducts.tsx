import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import styles from "./../../index.module.scss";
import { Product } from './Product';
import { productCtrl } from '@/api';
import { Loading, NoResult, Pagination } from '@/components/Shared';
import { ProductI } from '@/utils';

const ITEMS_PER_PAGE = 10;

export function ListProducts(props: any) {
	const router = useRouter();
  	const { query } = router;
	const { reload, onReload } = props;
	const [products, setProducts] = useState<ProductI[] | null>(null);
	const [totalPages, setTotalPages] = useState<number | null>(null);
	const page = Number(query.page || 1);

	useEffect(() => {
		(async () => {
			try {
				setProducts([]);
				const searchText = query && query.searchAdmin ? query.searchAdmin : '';
				const response = await productCtrl.getAll(page, ITEMS_PER_PAGE, searchText);
				setProducts(response.data || []);
				setTotalPages(Math.ceil(response.totalItems / ITEMS_PER_PAGE));
			} catch (error) {
				console.error(error);
			}
		})();
	}, [reload, query.page, query.searchAdmin]);

	const handlePageChange = (newPage: number) => {
		router.replace({ query: { ...query, page: newPage } }, undefined, { shallow: true });
	};

	if (!products) return <Loading text="Cargando productos" />;

	return (
		<div className={styles.row}>
			<Table striped unstackable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>ID</Table.HeaderCell>
						<Table.HeaderCell>Imagen</Table.HeaderCell>
						<Table.HeaderCell>Nombre</Table.HeaderCell>
						<Table.HeaderCell>Precio</Table.HeaderCell>
						<Table.HeaderCell>Stock</Table.HeaderCell>
						<Table.HeaderCell>Acciones</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{products.length === 0 && (
						<Table.Row>
							<Table.Cell colSpan="5">
								<NoResult text="No hay productos" />
							</Table.Cell>
						</Table.Row>
					)}

					{products.map((product) => (
						<Table.Row key={product.prodId}>
							<Product product={product} onReload={onReload} />
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			{totalPages !== null && <Pagination currentPage={page} onPageChange={handlePageChange} totalPages={totalPages} />}
		</div>
	);
}
