import * as Yup from 'yup';

export function initialValues() {
	return {
		email: '',
		password: ''
	};
}

export function validationSchema() {
	return Yup.object({
		email: Yup.string().required('Debes ingresar el correo con el que te registraste').email('El correo ingresado no es valido'),
		password: Yup.string().required('Debes ingresar una contraseña para continuar')
	});
}
