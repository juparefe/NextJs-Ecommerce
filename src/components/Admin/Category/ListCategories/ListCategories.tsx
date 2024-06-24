import { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { Category } from './Category';
import { categoryCtrl } from '@/api';
import { Loading, NoResult } from '@/components/Shared';
import { CategoryI } from '@/utils';

export function ListCategories(props: any) {
	const { reload, onReload } = props;
	const [categories, setCategories] = useState<CategoryI[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await categoryCtrl.getAll();
				setCategories(response);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [reload]);

	if (!categories) return <Loading text="Cargando categorias" />;

	return (
		<Table striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>ID</Table.HeaderCell>
					<Table.HeaderCell>Imagen</Table.HeaderCell>
					<Table.HeaderCell>Titulo</Table.HeaderCell>
					<Table.HeaderCell>Slug</Table.HeaderCell>
					<Table.HeaderCell>Acciones</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{categories.length === 0 && (
					<Table.Row>
						<Table.Cell colSpan="5">
							<NoResult text="No hay categorias" />
						</Table.Cell>
					</Table.Row>
				)}

				{categories.map((category) => (
					<Table.Row key={category.categId}>
						<Category category={category} onReload={onReload} />
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}
