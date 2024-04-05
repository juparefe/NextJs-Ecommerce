import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { Product } from './Product';
import { productCtrl } from '@/api';
import { Loading, NoResult, Pagination } from '@/components/Shared';
import { ProductI } from '@/utils';

const ITEMS_PER_PAGE = 10;

export function ListProducts(props: any) {
	const { reload, onReload } = props;
	const [products, setProducts] = useState<ProductI[]>([]);
	const [totalPages, setTotalPages] = useState<number | null>(null);
	const { query } = useRouter();
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

	if (!products) return <Loading text="Cargando productos" />;

	return (
		<div>
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>ID</Table.HeaderCell>
						<Table.HeaderCell>Image</Table.HeaderCell>
						<Table.HeaderCell>Nombre</Table.HeaderCell>
						<Table.HeaderCell>Precio</Table.HeaderCell>
						<Table.HeaderCell>Stock</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{products.length === 0 && (
						<Table.Cell colSpan="5">
							<NoResult text="No hay productos" />
						</Table.Cell>
					)}

					{products.map((product) => (
						<Table.Row key={product.prodId}>
							<Product product={product} onReload={onReload} />
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			<Pagination currentPage={page} totalPages={totalPages} />
		</div>
	);
}
