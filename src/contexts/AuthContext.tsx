import React, { createContext, useState } from 'react';

// Creación del contexto
export const AuthContext = createContext({});

// Creacion del componente proveedor del contexto
export function AuthProvider(props: any) {
        const { children } = props;
        const [ user, setUser  ] = useState(null);

	const data = {
		user
	};

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
