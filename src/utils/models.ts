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

export interface ProductI {
	prodId: string;
	prodTitle: string;
	prodPrice: string;
	prodStock: string;
}

export interface UserI {
	userUUID: string;
	categPath: string;
	categName: string;
}
