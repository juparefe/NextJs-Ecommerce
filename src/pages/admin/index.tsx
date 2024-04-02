import { useRouter } from 'next/router';
import { useState } from 'react';
import { Container, Tab } from 'semantic-ui-react';
import styles from './admin.module.scss';
import { Product } from '@/components/Admin/Product';
import { Search } from '@/components/Shared';
import { useAuth } from '@/hooks';
import { BasicLayout } from '@/layouts';

export default function AdminPage() {
	const [reload, setReload] = useState(false);
	const { isAdmin } = useAuth();
	const router = useRouter();

	const onReload = () => setReload((prevState) => !prevState);

	if (isAdmin) {
		router.push('/');
		return null;
	}

	const panes = [
		{
			menuItem: 'Productos',
			render: () => {
				return (
					<Tab.Pane>
						<div className={styles.actions}>
							<Search queryName="searchAdmin" />
							<Product.AddProduct onReload={onReload} />
						</div>
						<Product.ListProducts />
					</Tab.Pane>
				);
			}
		},
		{
			menuItem: 'Categorias',
			render: () => {
				return (
					<Tab.Pane>
						<div className={styles.actions}>
							<div />
							<span>Add category</span>
						</div>
						<h2>Categorias</h2>
					</Tab.Pane>
				);
			}
		},
		{
			menuItem: 'Usuarios',
			render: () => {
				return (
					<Tab.Pane>
						<h2>Usuarios</h2>
					</Tab.Pane>
				);
			}
		}
	];
	return (
		<BasicLayout>
			<Container>
				<Tab panes={panes} className={styles.tabs} />
			</Container>
		</BasicLayout>
	);
}
