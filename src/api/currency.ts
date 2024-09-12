import { authFetch, ENV, ExchangeRateApiI } from '@/utils';

async function getCurrenciesRates() {
	try {
		const urlGet = `${ENV.API_URL}${ENV.ENDPOINTS.CURRENCY}?base_currency=COP`;

		const response = await authFetch(urlGet);
		if (!response) {
			throw new Error('No response received from Gambit API');
		}

		if (response.status == 200) {
			const result = await response.json();
			localStorage.setItem('ratesCOP', JSON.stringify(result));
			return result;
		} else {
			const apiKey = process.env.NEXT_PUBLIC_ApiKeyExchangeRate;
			const apiUrl = "https://v6.exchangerate-api.com/v6/" + apiKey + "/latest/COP";
			const response = await fetch(apiUrl);
			if (!response) {
				throw new Error('No response received from ExchangeRate API');
			}
			const exchangeRateApiBody: ExchangeRateApiI = await response.json();
			let result = {
				cop: exchangeRateApiBody.conversion_rates.COP,
				eur: exchangeRateApiBody.conversion_rates.EUR,
				timeLastUpdate: exchangeRateApiBody.time_last_update_utc,
				usd: exchangeRateApiBody.conversion_rates.USD
			};
			localStorage.setItem('ratesCOP', JSON.stringify(result));
			const urlPost = `${ENV.API_URL}${ENV.ENDPOINTS.CURRENCY}`;
			const params = {
				body: JSON.stringify(result),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'PUT'
			};
			const responseSave = await authFetch(urlPost, params);
			if (!responseSave) {
				throw new Error('No response received from Gambit API');
			}
			return result;
		};
	} catch (error) {
		throw error;
	}
}

async function getCurrencyRate(targetCurrency: string) {
	try {
		const urlGet = `${ENV.API_URL}${ENV.ENDPOINTS.CURRENCY}?base_currency=COP&target_currency=${targetCurrency}`;

		const response = await authFetch(urlGet);
		if (!response) {
			throw new Error('No response received from Gambit API');
		}

		if (response.status !== 200) {
			const apiKey = process.env.NEXT_PUBLIC_ApiKeyExchangeRate;
			const apiUrl = "https://v6.exchangerate-api.com/v6/" + apiKey + "/latest/COP";
			const response = await fetch(apiUrl);
			if (!response) {
				throw new Error('No response received from ExchangeRate API');
			}
			const exchangeRateApiBody: ExchangeRateApiI = await response.json();
			let result = {
				cop: exchangeRateApiBody.conversion_rates.COP,
				eur: exchangeRateApiBody.conversion_rates.EUR,
				timeLastUpdate: exchangeRateApiBody.time_last_update_utc,
				usd: exchangeRateApiBody.conversion_rates.USD
			};
			localStorage.setItem('ratesCOP', JSON.stringify(result));
			const urlPost = `${ENV.API_URL}${ENV.ENDPOINTS.CURRENCY}`;
			const params = {
				body: JSON.stringify(result),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'PUT'
			};
			const responseSave = await authFetch(urlPost, params);
			if (!responseSave) {
				throw new Error('No response received from Gambit API');
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
	get: getCurrencyRate,
	getAll: getCurrenciesRates
};
