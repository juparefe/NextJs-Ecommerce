import { authCtrl } from '@/api';

export async function authFetch(url: string, params?: any) {
	const token = await authCtrl.retrieveSession();
	console.log('token', token);

	if (!token) {
		console.log('No hay token');
	} else {
		const paramsTemp = {
			...params,
			headers: {
				...params?.headers,
				Authorization: token
			}
		};

		try {
			console.log('paramsTemp', paramsTemp);
			return await fetch(url, paramsTemp);
		} catch (error) {
			throw error;
		}
	}
}
