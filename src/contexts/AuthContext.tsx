import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';
import { authCtrl, userCtrl } from '@/api';

// Creación del contexto
export const AuthContext = createContext({} as AuthContextType);

interface AuthContextType {
	isAdmin: boolean;
	login: () => Promise<void>;
	logout: () => void;
	updateUser: (key: string, value: any) => void;
	user: any;
}

// Creacion del componente proveedor del contexto
export function AuthProvider(props: any) {
	const { children } = props;
	const [user, setUser] = useState({});
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				await login();
				console.log("Login user", user);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		})();
	}, []);

	const login = async () => {
		try {
			const response = await userCtrl.me();
			setUser(response);
			setIsAdmin(response.userStatus === 0);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const logout = () => {
		setUser({});
		authCtrl.logout();
		router.push('/');
	};

	const updateUser = (key: string, value: any) => {
		setUser({
			...user,
			[key]: value
		});
	};

	const data: AuthContextType = {
		isAdmin,
		login,
		logout,
		updateUser,
		user
	};

	if (loading) return null;

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
