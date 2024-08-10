import { authFetch, ENV, ExchangeRateApiI } from '@/utils';

async function getCurrencyRate(baseCurrency: string, targetCurrency: string) {
	try {
		const url = `${ENV.API_URL}${ENV.ENDPOINTS.CURRENCY}?base_currency=${baseCurrency}&target_currency=${targetCurrency}`;

		const response = await authFetch(url);
        console.log("Response gambit api",response);
		if (!response) {
			throw new Error('No response received from Gambit API');
		}

		if (response.status !== 200) {
			const apiKey = process.env.ApiKeyExchangeRate;
			const apiUrl = "https://v6.exchangerate-api.com/v6/" + apiKey + "/latest/" + baseCurrency;
			const response = await fetch(apiUrl);
			console.log("Response ExchangeRateApi", response);
			if (!response) {
				throw new Error('No response received from ExchangeRate API');
			}
			const exchangeRateApiBody: ExchangeRateApiI = await response.json();
			let result = {
				COP: exchangeRateApiBody.conversion_rates.COP,
				EUR: exchangeRateApiBody.conversion_rates.EUR,
				USD: exchangeRateApiBody.conversion_rates.USD
			};
			switch (baseCurrency) {
				case "EUR":
					localStorage.setItem('ratesEUR', JSON.stringify(result));
					break;
				case "USD":
					localStorage.setItem('ratesUSD', JSON.stringify(result));
					break;
				default:
					localStorage.setItem('ratesCOP', JSON.stringify(result));
					break;
			}
			return result;
		};
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export const currencyCtrl = {
	get: getCurrencyRate
};
