import { DateTime } from "luxon";
import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';
import { authCtrl, currencyCtrl, userCtrl } from '@/api';
import { Constants, CurrencyCode, CurrencyI, CurrencyRateI, RatesI } from "@/utils";

// Creación del contexto
export const AuthContext = createContext({} as AuthContextType);

interface AuthContextType {
	currencyObject: any;
	getCurrencies: any;
	isSuperAdmin: boolean;
	isAdmin: boolean;
	login: () => Promise<void>;
	logout: () => void;
	updateUser: (key: string, value: any) => void;
	user: any;
}

// Creacion del componente proveedor del contexto para autenticacion
export function AuthProvider(props: any) {
	const { children } = props;
	const [currencyObject, setCurrencyObject] = useState(Constants.DEFAULT_CURRENCY);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isSuperAdmin, setIsSuperAdmin] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				await login();
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		})();
	}, []);

	const getCurrencies = async () => {
		const newCurrencyString = localStorage.getItem('currency');
		const newCurrencyJson: CurrencyI = newCurrencyString ? JSON.parse(newCurrencyString) : Constants.DEFAULT_CURRENCY;
		const { currencyLastSymbol, currencySymbol, selectedCurrency } = newCurrencyJson;
		const newCurrencyRatesString: string | null = localStorage.getItem('ratesCOP');
		let currencyRate = 1;
		let currency: CurrencyRateI = {
		  currencyLastSymbol,
		  currencyRate,
		  currencySymbol,
		  selectedCurrency
		};
		if (newCurrencyRatesString) {
		  console.log("Entro al if y si hay string currency");
		  const newCurrencyRatesJson: RatesI = JSON.parse(newCurrencyRatesString);
		  // Convertir timeLastUpdate a un objeto DateTime de Luxon
		  let timeLastUpdateDate = DateTime.fromRFC2822(newCurrencyRatesJson.timeLastUpdate).toUTC();
		  // Obtener la fecha actual con Luxon
		  const currentDate = DateTime.now();
		  // Verificar si timeLastUpdate es hoy y si no llamar a ExchangeRate API
		  if(timeLastUpdateDate.hasSame(currentDate, 'day')) {
			console.log("Entro al if y si tienen el mismo dia ", timeLastUpdateDate, " y ", currentDate);
			currencyRate = newCurrencyRatesJson[selectedCurrency.toLowerCase() as CurrencyCode];
		  } else {
			const currenciesFromService = await currencyCtrl.getAll();
			console.log("Entro al else y no tienen el mismo dia ", timeLastUpdateDate, " y ", currentDate);
			currencyRate = currenciesFromService[selectedCurrency.toLowerCase() as CurrencyCode];
		  };
		} else {
			console.log("Entro al else y no hay string currency");
		  const currenciesFromService = await currencyCtrl.getAll();
		  currencyRate = currenciesFromService[selectedCurrency.toLowerCase() as CurrencyCode];
		}
		currency = {
			...currency,
			currencyRate
		};
		setCurrencyObject(currency);
		return currency;
	};

	const login = async () => {
		try {
			const response = await userCtrl.me();
			setUser(response);
			await getCurrencies();
			setIsAdmin([1,2].includes(response.userStatus));
			setIsSuperAdmin([1].includes(response.userStatus));
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const logout = () => {
		setUser({});
		authCtrl.logout();
		setIsAdmin(false);
		setIsSuperAdmin(false);
		router.push('/');
	};

	const updateUser = (key: string, value: any) => {
		setUser({
			...user,
			[key]: value
		});
	};

	const data: AuthContextType = {
		currencyObject,
		getCurrencies,
		isAdmin,
		isSuperAdmin,
		login,
		logout,
		updateUser,
		user
	};

	if (loading) return null;

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
