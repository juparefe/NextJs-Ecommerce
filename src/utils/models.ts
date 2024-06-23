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
