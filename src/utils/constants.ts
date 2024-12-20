export const ENV = {
	API_IMG_URL: 'https://iwbolpi9l4.execute-api.us-east-1.amazonaws.com/Production',
	API_URL: 'https://vfflkbriye.execute-api.us-east-1.amazonaws.com/gambit/gambit',
	BASKET: 'basket',
	ENDPOINTS: {
		ADDRESS: '/address',
		CATEGORY: '/category',
		CURRENCY: '/currency',
		DISCOUNT: '/discount',
		ORDER: '/order',
		ORDERS: '/orders',
		PRODUCT: '/product',
		STOCK: '/stock',
		TOP_CATEGORIES: '/topcategories',
		USERS: '/users',
		USER_ME: '/user/me'
	},
	IMG_URL: 'https://gambit-img-bucket.s3.amazonaws.com',
	TOKEN: 'token'
};

export const Constants = {
	CURRENCIES: [
		{ key: 1, symbol: "USD", text: "Dolar (USD)", value: "USD" },
		{ key: 2, symbol: "€", text: "Euro (EUR)", value: "EUR" },
		{ key: 3, symbol: "$", text: "Peso Colombiano (COP)", value: "COP" }
	],
	DEFAULT_CURRENCY: {
		currencyLastSymbol: '',
		currencyRate: 1,
		currencySymbol: '$',
		selectedCurrency: 'COP'
	},
	NOT_FOUND_IMAGE: '/images/not-found.jpg',
	STEPS: [
		{ number: 1, title: "Cesta" },
		{ number: 2, title: "Dirección de envío" },
		{ number: 3, title: "Método de pago" },
		{ number: 4, title: "Confirmación" }
	]
};
