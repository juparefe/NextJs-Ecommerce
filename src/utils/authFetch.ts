import { authCtrl } from '@/api';

export async function authFetch(url: string, params?: any) {
	const token = await authCtrl.retrieveSession();

	if (!token) {
		console.error('No hay token');
	} else {
		const paramsTemp = {
			...params,
			headers: {
				...params?.headers,
				Authorization: token
			}
		};

		try {
			return await fetch(url, paramsTemp);
		} catch (error) {
			throw error;
		}
	}
}
