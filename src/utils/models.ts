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

export interface CurrencyI {
	currencyLastSymbol: string,
	currencySymbol: string,
	selectedCurrency: string
}

export type CurrencyCode = 'cop' | 'usd' | 'eur';

export interface CurrencyRateI {
	currencyLastSymbol: string,
	currencyRate: number
	currencySymbol: string,
	selectedCurrency: string
}

export interface ExchangeRateApiI {
    result:                string;
    documentation:         string;
    terms_of_use:          string;
    time_last_update_unix: number;
    time_last_update_utc:  string;
    time_next_update_unix: number;
    time_next_update_utc:  string;
    base_code:             string;
    conversion_rates:      { [key: string]: number };
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
	odCurrency: string,
    odCurrencyLastSymbol: string,
    odCurrencySymbol: string,
	odPrice: string | number;
	odProdId: string;
	odQuantity: number;
}

export interface ProductI {
	prodCurrency?: string;
	prodCurrencyLastSymbol?: string;
	prodCurrencySymbol?: string;
	prodDiscount: string;
	prodId: string;
	prodPrice: string;
	prodStock: string;
	prodTitle: string;
	quantity?: number;
}

export interface RatesI {
	cop: number;
	eur: number;
	timeLastUpdate: any;
	usd: number;
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
