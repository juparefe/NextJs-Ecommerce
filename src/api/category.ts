import { ENV, authFetch } from '@/utils';

async function getAllCategories() {
	try {
		const url = `${ENV.API_URL}${ENV.ENDPOINTS.CATEGORY}`;

		const response = await fetch(url);
		if (!response) {
			throw new Error('No response received');
		}
		const result = await response.json();

		if (response.status !== 200) throw result;

		return result;
	} catch (error) {
		throw error;
	}
}

async function getTopCategories() {
	try {
		const url = `${ENV.API_URL}${ENV.ENDPOINTS.TOP_CATEGORIES}`;

		const response = await fetch(url);
		if (!response) {
			throw new Error('No response received');
		}
		const result = await response.json();

		if (response.status !== 200) throw result;

		return result;
	} catch (error) {
		throw error;
	}
}

async function createCategory(data: any) {
	try {
		const url = `${ENV.API_URL}${ENV.ENDPOINTS.CATEGORY}`;
		const params = {
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		};

		const response = await authFetch(url, params);
		if (!response) {
			throw new Error('No response received');
		}

		if (response.status !== 200) throw response;

		return true;
	} catch (error) {
		throw error;
	}
}

async function updateCategory(data: any, categoryId: string) {
	try {
		const url = `${ENV.API_URL}${ENV.ENDPOINTS.CATEGORY}/${categoryId}`;
		const params = {
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'PUT'
		};

		const response = await authFetch(url, params);
		if (!response) {
			throw new Error('No response received');
		}

		if (response.status !== 200) throw response;

		return true;
	} catch (error) {
		throw error;
	}
}

async function updateImage(categPath: string, image: any) {
	try {
		const url = `${ENV.API_IMG_URL}/gambit-img-bucket/${categPath}.jpg`;
		const params = {
			body: image,
			headers: {
				'Content-Type': 'image/jpeg'
			},
			method: 'PUT'
		};

		const response = await authFetch(url, params);
		if (response && response.status !== 200) throw response;

		return true;
	} catch (error) {
		throw error;
	}
}

async function deleteCategory(categoryId: string) {
	try {
		const url = `${ENV.API_URL}${ENV.ENDPOINTS.CATEGORY}/${categoryId}`;
		const params = { method: 'DELETE' };

		const response = await authFetch(url, params);
		if (!response) {
			throw new Error('No response received');
		}

		if (response.status !== 200) throw response;

		return true;
	} catch (error) {
		throw error;
	}
}

export const categoryCtrl = {
	create: createCategory,
	delete: deleteCategory,
	getAll: getAllCategories,
	getTop: getTopCategories,
	update: updateCategory,
	updateImage
};
