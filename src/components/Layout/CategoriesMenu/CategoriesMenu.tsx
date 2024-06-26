import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './CategoriesMenu.module.scss';
import { categoryCtrl } from '@/api/category';
import { CategoryI } from '@/utils/models';

export function CategoriesMenu() {
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
		<div className={styles.container}>
			{categories &&
				categories.map((category: CategoryI) => (
					<Link key={category.categId} href={`/categories/${category.categPath}`}>
						{category.categName}
					</Link>
				))}
			{/* {data.map((item, index) => (
				<div key={index}>
					<Icon name={item.icon as SemanticICONS} />
					<div>
						<h3>{item.title}</h3>
						<span>{item.description}</span>
					</div>
				</div>
			))} */}
		</div>
	);
}
