import { useEffect, useState } from 'react';
import { Pagination as PaginationSU, PaginationProps } from 'semantic-ui-react';
import styles from './Pagination.module.scss';

export function Pagination(props: any) {
	const { currentPage, onPageChange, forcePageChange = false, totalPages } = props;
  	const [activePage, setActivePage] = useState(currentPage);

	useEffect(() => {
		if (forcePageChange) {
		  setActivePage(1);
		  onPageChange(1);
		}
	}, [forcePageChange, onPageChange]);

	useEffect(() => {
		setActivePage(currentPage); // Sincronizar con la página actual
	}, [currentPage]);

	const handlePageChange = (_: any, data: PaginationProps) => {
		const { activePage } = data;
		setActivePage(Number(activePage));
		onPageChange(Number(activePage));
	};

	return (
		<div className={styles.container}>
			<PaginationSU
				activePage={activePage}
				totalPages={totalPages}
				ellipsisItem={null}
				firstItem={null}
				lastItem={null}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}
