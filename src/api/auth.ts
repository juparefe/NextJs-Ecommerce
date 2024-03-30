// Api diseñada para comunicarse con todos los servicios externos relacionados con la autenticación de usuarios
import { Auth } from '@aws-amplify/auth';

async function confirmation(email: string, code: string) {
	try {
		await Auth.confirmSignUp(email, code);
		return true;
	} catch (error) {
		throw error;
	}
}

async function login(email: string, password: string) {
	try {
		await Auth.signIn({
			password,
			username: email
		});
		const session = await Auth.currentAuthenticatedUser({
			bypassCache: false
		});
		console.log('session', session);
		return session;
	} catch (error) {
		throw error;
	}
}

async function logout() {
	try {
		await Auth.signOut();
	} catch (error) {
		throw error;
	}
}

async function register(email: string, password: string) {
	try {
		const response = await Auth.signUp({
			password,
			username: email
		});
		return response;
	} catch (error) {
		throw error;
	}
}

async function resendCode(email: string) {
	try {
		await Auth.resendSignUp(email);
	} catch (error) {
		throw error;
	}
}

async function retrieveSession() {
	try {
		const session = await Auth.currentSession();
		return session.getAccessToken().getJwtToken();
	} catch (error) {
		throw error;
	}
}

export const authCtrl = {
	confirmation,
	login,
	logout,
	register,
	resendCode,
	retrieveSession
};
