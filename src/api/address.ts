import { ENV, authFetch } from "@/utils";

async function getAllAddresses() {
  try {
    const url = `${ENV.API_URL}${ENV.ENDPOINTS.ADDRESS}`;

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

async function createAddress(data: any) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}`;
    const params = {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    };

    const response = await authFetch(url, params);

    if (response && response.status !== 200) throw response;

    return true;
  } catch (error) {
    throw error;
  }
}

async function updateAddress(data: any, addressId: string) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
    const params = {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
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

async function deleteAddress(addressId: string) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
    const params = { method: "DELETE" };

    const response = await authFetch(url, params);

    if (response && response.status !== 200) throw response;

    return true;
  } catch (error) {
    throw error;
  }
}

async function getAddressById(addressId: string) {
  try {
    const filters = `addId=${addressId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}?${filters}`;

    const response = await authFetch(url);
    if (!response) {
        throw new Error('No response received');
    }

    const result = await response.json();

    if (response.status !== 200) throw result;

    return result[0] || null;
  } catch (error) {
    throw error;
  }
}

export const addressCtrl = {
  create: createAddress,
  delete: deleteAddress,
  getAll: getAllAddresses,
  getById: getAddressById,
  update: updateAddress
};
