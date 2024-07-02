import { ENV } from "@/utils";

function getAll() {
  const response = localStorage.getItem(ENV.BASKET);

  if (!response) {
    return [];
  } else {
    return JSON.parse(response);
  }
}

function add(productId: string) {
  const products = getAll();
  const objIndex = products.findIndex((product: any) => product.id === productId);

  if (objIndex < 0) {
    products.push({ id: productId, quantity: 1 });
  } else {
    const product = products[objIndex];
    products[objIndex].quantity = product.quantity + 1;
  }

  localStorage.setItem(ENV.BASKET, JSON.stringify(products));
}

function count() {
  const response = getAll();
  let countTemp = 0;

  response.forEach((item: any) => {
    countTemp += item.quantity;
  });

  return countTemp;
}

function changeQuantity(productId: string, quantity: string) {
  const products = getAll();
  const objIndex = products.findIndex((product: any) => product.id === productId);

  products[objIndex].quantity = quantity;

  localStorage.setItem(ENV.BASKET, JSON.stringify(products));
}

function deleteItem(productId: string) {
  const products = getAll();
  const updateProducts = products.filter((product: any) => product.id !== productId);

  localStorage.setItem(ENV.BASKET, JSON.stringify(updateProducts));
}

function deleteAll() {
  localStorage.removeItem(ENV.BASKET);
}

export const basketCtrl = {
  add,
  changeQuantity,
  count,
  deleteAll,
  deleteItem,
  getAll
};
