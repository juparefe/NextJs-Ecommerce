import { useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { categoryCtrl } from '@/api/category';
import { CategoryI } from '@/utils/models';

export function CategoriesMobileMenu() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await categoryCtrl.getAll();
				setCategories(response);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<NavDropdown title={'Categorias'}>
			{categories &&
				categories.map((category: CategoryI) => (
					<NavDropdown.Item key={category.categId} href={`/categories/${category.categPath}`}>{category.categName}</NavDropdown.Item>
				))}
		</NavDropdown>
	);
}
