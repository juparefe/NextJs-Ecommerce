import { ENV, authFetch } from "@/utils";

async function createOrder(data: any) {
  try {
    const url = `${ENV.API_URL}${ENV.ENDPOINTS.ORDER}`;
    const params = {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
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

async function getAllOrders() {
  try {
    const url = `${ENV.API_URL}${ENV.ENDPOINTS.ORDER}`;

    const response = await authFetch(url);
    if (!response) {
        throw new Error('No response received');
    }
    const result = await response.json();

    if (response.status !== 200) throw response;

    return result;
  } catch (error) {
    throw error;
  }
}

export const orderCtrl = {
  create: createOrder,
  getAll: getAllOrders
};
