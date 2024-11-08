import { useRouter } from 'next/router';
import { useState } from 'react';
import { Container, Tab } from 'semantic-ui-react';
import styles from './admin.module.scss';
import { Category, Product, User } from '@/components/Admin';
import { Search } from '@/components/Shared';
import { useAuth } from '@/hooks';
import { BasicLayout } from '@/layouts';

export default function AdminPage() {
	const [reload, setReload] = useState(false);
	const { isAdmin, isSuperAdmin } = useAuth();
	const router = useRouter();

	const onReload = () => setReload((prevState) => !prevState);

	if (!isAdmin) {
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
						<Product.ListProducts reload={reload} onReload={onReload} />
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
							<Category.AddCategory onReload={onReload} />
						</div>
						<Category.ListCategories reload={reload} onReload={onReload} />
					</Tab.Pane>
				);
			}
		},
		{
			menuItem: 'Usuarios',
			render: () => {
				return (
					<Tab.Pane>
						{ isSuperAdmin && (
							<div className={styles.actions}>
								<div />
								<User.ManageUsers onReload={onReload} />
							</div>
						)}
						<User.List reload={reload} onReload={onReload} />
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
