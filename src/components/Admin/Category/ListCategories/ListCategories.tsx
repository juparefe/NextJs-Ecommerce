import { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { categoryCtrl } from '@/api';
import { Loading } from '@/components/Shared';
import { Category } from '@/utils';

export function ListCategories(props: any) {
	const { reload, onReload } = props;
	const [categories, setCategories] = useState<Category[]>([]);

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
					<Table.HeaderCell>Title</Table.HeaderCell>
					<Table.HeaderCell>Slug</Table.HeaderCell>
					<Table.HeaderCell></Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{categories.length === 0 && (
					<Table.Cell colSpan="5">
						<span>No hay categorias</span>
					</Table.Cell>
				)}

				<p>Lista de categorias</p>
			</Table.Body>
		</Table>
	);
}
