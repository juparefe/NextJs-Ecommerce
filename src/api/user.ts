import { ENV, authFetch } from '@/utils';

async function me() {
	try {
		const url = `${ENV.API_URL}${ENV.ENDPOINTS.USER_ME}`;
		const response = await authFetch(url);
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

async function getAll(page = 1) {
	try {
		const filters = `page=${page}`;
		const url = `${ENV.API_URL}${ENV.ENDPOINTS.USERS}?${filters}`;

		const response = await authFetch(url);
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

async function updateAvatar(userId: string, image: any) {
	try {
	  const url = `${ENV.API_IMG_URL}/${userId}.jpg`;
	  const params = {
		body: image,
		headers: {
			"Content-Type": "image/jpeg"
		  },
		method: "PUT"
	  };

	  const response = await authFetch(url, params);

	  if (response && response.status !== 200) throw response;

	  return true;
	} catch (error) {
	  throw error;
	}
  }

export const userCtrl = {
	getAll,
	me,
	updateAvatar
};
