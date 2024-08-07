export interface AddressI {
	addAddress: string;
	addCity: string;
	addId: string;
	addName: string;
	addPhone: string;
	addPostalCode: string;
	addState: string;
	addTitle: string;
}

export interface CategoryI {
	categId: string;
	categPath: string;
	categName: string;
	categTotalSold: number;
	categImage: string;
}

export interface LSBasketI {
	id: string,
	quantity: number
}

export interface OrderI {
	orderDate: string;
	orderId: number;
	orderTotal: number;
}

export interface OrderDetailI {
	odPrice: string;
	odProdId: string;
	odQuantity: number;
}

export interface ProductI {
	prodId: string;
	prodTitle: string;
	prodPrice: string;
	prodStock: string;
	quantity?: number;
}

export interface UserI {
	userUUID: string;
	categPath: string;
	categName: string;
}

export interface WindowI {
	width: number;
  	height: number;
}
