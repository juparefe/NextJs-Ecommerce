import { ENV, authFetch } from '@/utils';

async function getAllProducts(page = 1, pageSize = 10, search: string | string[] = '') {
	try {
		const paginationFilter = `page=${page}&pageSize=${pageSize}`;
		const searchFilter = `search=${search}`;
		const filters = `${paginationFilter}&${searchFilter}`;

		const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCT}?${filters}`;

		const response = await fetch(url);
		const result = await response.json();

		if (response.status !== 200) throw result;

		return result;
	} catch (error) {
		throw error;
	}
}

async function createProduct(data: any) {
	try {
		const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCT}`;
		const params = {
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		};

		const response = await authFetch(url, params);

		if (response && response.status !== 200) throw response;

		return true;
	} catch (error) {
		throw error;
	}
}

async function updateProduct(data: any, productId: string) {
	try {
		const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCT}/${productId}`;
		const params = {
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
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

async function updateImage(productId: string, image: any) {
	try {
		const url = `${ENV.API_IMG_URL}/gambit-img-bucket/${productId}.jpg`;
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

async function deleteProduct(productId: string) {
	try {
		const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCT}/${productId}`;
		const params = { method: 'DELETE' };

		const response = await authFetch(url, params);

		if (response && response.status !== 200) throw response;

		return true;
	} catch (error) {
		throw error;
	}
}

async function getProductsByCategorySlug(slug: string, page = 1, pageSize = 10) {
	try {
		const categoryFilter = `slugCateg=${slug}`;
		const paginationFilter = `page=${page}&pageSize=${pageSize}`;
		const filters = `${categoryFilter}&${paginationFilter}`;

		const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCT}?${filters}`;

		const response = await fetch(url);
		const result = await response.json();

		if (response.status !== 200) throw result;

		return result;
	} catch (error) {
		throw error;
	}
}

async function getProductBySlug(slug: string) {
	try {
		const filters = `slug=${slug}`;
		const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCT}?${filters}`;

		const response = await fetch(url);
		const result = await response.json();

		if (response.status !== 200) throw result;

		return result.data[0] || null;
	} catch (error) {
		throw error;
	}
}

async function getProductById(productId: number) {
	try {
		const filters = `prodId=${productId}`;
		const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCT}?${filters}`;

		const response = await fetch(url);
		const result = await response.json();

		if (response.status !== 200) throw result;

		return result.data[0] || null;
	} catch (error) {
		throw error;
	}
}

export const productCtrl = {
	create: createProduct,
	delete: deleteProduct,
	getAll: getAllProducts,
	getByCategorySlug: getProductsByCategorySlug,
	getById: getProductById,
	getBySlug: getProductBySlug,
	update: updateProduct,
	updateImage
};
