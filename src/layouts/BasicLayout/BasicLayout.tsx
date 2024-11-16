import { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Container as ContainerSemantic } from 'semantic-ui-react';
import styles from './BasicLayout.module.scss';
import { Layout } from '@/components/Layout';
import { Search } from '@/components/Shared/Search';
import { useAuth } from '@/hooks';

export function BasicLayout(props: any) {
	const { children } = props;
	const { isAdmin, user } = useAuth();
	const [showCategories, setShowCategories] = useState(false);
	const urlAccount = (user && user.userEmail) ? '/account' : '/join/login';

	const handleResize = () => {
		setShowCategories(window.innerWidth > 991);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			<div className={styles.border}>
				{['sm'].map((expand) => (
					<Navbar key={String(expand)} expand="lg" className={styles.navbar}>
						<Container>
							<Navbar.Brand href="/" className={styles.logo}>
								<Layout.Logo />
							</Navbar.Brand>
							<Navbar.Toggle
								aria-controls={`offcanvasNavbar-expand-${expand}`}
								aria-expanded={expand === 'lg' ? 'true' : 'false'}
								className="ms-auto"
							/>
							<Navbar.Offcanvas
								id={`offcanvasNavbar-expand-${expand}`}
								aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
								placement="end"
							>
								<Offcanvas.Header closeButton>
									<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
										Gambit
									</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body>
									<Nav className="justify-content-end flex-grow-1 pe-3">
										<Search
											className={styles.search}
											placeholder="Busca lo que necesitas..."
										/>
										{isAdmin && <Nav.Link href={"/admin"}><Layout.AdminButton /></Nav.Link>}
										{!showCategories && <Layout.CategoriesMobileMenu />}
										<Nav.Link href={urlAccount}><Layout.Account /></Nav.Link>
										<Nav.Link href="/basket"><Layout.Basket /></Nav.Link>
									</Nav>
								</Offcanvas.Body>
							</Navbar.Offcanvas>
						</Container>
					</Navbar>
				))
				}
			</div>
			{showCategories && (
				<div className={styles.border}>
					<ContainerSemantic>
						<Layout.CategoriesMenu />
					</ContainerSemantic>
				</div>
			)}
			{children}
		</>
	);
}
