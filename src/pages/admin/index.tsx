import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Tab } from 'semantic-ui-react';
import styles from './admin.module.scss';
import { Category, Product, User } from '@/components/Admin';
import { Search } from '@/components/Shared';
import { useAuth, useWindowSize } from '@/hooks';
import { BasicLayout } from '@/layouts';
import { WindowScreenE } from '@/utils';

export default function AdminPage() {
	const [reload, setReload] = useState(false);
	const { isAdmin, isSuperAdmin } = useAuth();
	const [textSize, setTextSize] = useState('small');
	const { windowScreen } = useWindowSize();
	const router = useRouter();

	const onReload = () => setReload((prevState) => !prevState);

	useEffect(() => {
        setTextSize([WindowScreenE.Mobile].includes(windowScreen) ?  'smaller' : 'small');
    }, [windowScreen]);

	if (!isAdmin) {
		router.push('/');
		return null;
	}

	const panes = [
		{
			menuItem: 'Productos',
			render: () => {
				return (
					<Tab.Pane className={styles.pane}>
						<div className={styles.actions}>
							<Search className={styles.search} queryName="searchAdmin" />
							<Product.AddProduct className={styles.addProduct} onReload={onReload} windowScreen={windowScreen} />
						</div>
						<Product.ListProducts reload={reload} onReload={onReload} windowScreen={windowScreen} />
					</Tab.Pane>
				);
			}
		},
		{
			menuItem: 'Categorias',
			render: () => {
				return (
					<Tab.Pane className={styles.pane}>
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
					<Tab.Pane className={styles.pane}>
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
				<Tab panes={panes} className={styles.tabs} menu={{ className: 'ui attached tabular menu', style: { fontSize: textSize } }}/>
			</Container>
		</BasicLayout>
	);
}
