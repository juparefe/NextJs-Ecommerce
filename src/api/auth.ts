// Api diseñada para comunicarse con todos los servicios externos relacionados con la autenticación de usuarios
import { confirmSignUp, signUp } from 'aws-amplify/auth';

async function confirmation(email: string, code: string) {
	try {
		await confirmSignUp(email, code);
		return true;
	} catch (error) {
		throw error;
	}
}

async function register(email: string, password: string) {
	try {
		const response = await signUp({
			password,
			username: email
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export const authCtrl = {
	confirmation,
	register
};
