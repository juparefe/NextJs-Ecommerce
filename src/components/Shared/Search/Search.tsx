import { useRouter } from 'next/router';
import { Input } from 'semantic-ui-react';

export function Search(props: any) {
	const { placeholder = 'Buscar...', className, queryName = 'search' } = props;
	const router = useRouter();
	const inputValue = router.query[queryName] || '';

	const onChange = (_: any, data: any) => {
		if (data.value) {
			router.replace({ query: { ...router.query, [queryName]: data.value } });
		} else {
			cleanSearch();
		}
	};

	const cleanSearch = () => {
		const newQuery = router.query;
		delete newQuery[queryName];
		router.replace({ query: newQuery });
	};

	return (
		<Input
			placeholder={placeholder}
			icon={{
				link: true,
				name: inputValue ? 'close' : 'search',
				onClick: cleanSearch
			}}
			className={className}
			value={inputValue}
			onChange={onChange}
		/>
	);
}
