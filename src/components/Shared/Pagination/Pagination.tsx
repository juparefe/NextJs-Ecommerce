import { useRouter } from 'next/router';
import { PaginationProps, Pagination as PaginationSU } from 'semantic-ui-react';
import styles from './Pagination.module.scss';

export function Pagination(props: any) {
	const { currentPage, totalPages } = props;
	const router = useRouter();

	const onPageChange = (_: any, data: PaginationProps) => {
		const { activePage } = data;
		router.replace({ query: { ...router.query, page: activePage } });
	};

	return (
		<div className={styles.container}>
			<PaginationSU
				activePage={currentPage}
				ellipsisItem={null}
				firstItem={null}
				lastItem={null}
				onPageChange={onPageChange}
				totalPages={totalPages}
			/>
		</div>
	);
}
