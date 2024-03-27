// Api diseñada para comunicarse con todos los servicios externos relacionados con la autenticación de usuarios
import { confirmSignUp, resendSignUpCode, signUp } from 'aws-amplify/auth';

async function confirmation(email: string, code: string) {
	try {
		await confirmSignUp({ confirmationCode: code, username: email });
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

async function resendCode(email: string) {
	try {
		await resendSignUpCode({ username: email });
	} catch (error) {
		throw error;
	}
}

export const authCtrl = {
	confirmation,
	register,
	resendCode
};
