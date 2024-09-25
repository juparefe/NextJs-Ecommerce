// Valores iniciales y validacion de esquema para el form de Formik, se usa en el componente RegisterForm
import * as Yup from 'yup';

export function initialValues() {
	return {
		email: '',
		password: '',
		repeatPassword: ''
	};
}

export function validationSchema() {
	return Yup.object({
		email: Yup.string().required('Debes ingresar el correo con el que deseas registrarte').email('El correo ingresado no es valido'),
		password: Yup.string()
			.required('Debes ingresar una contraseña para continuar')
			.min(8, 'La contraseña debe tener al menos 8 caracteres')
			.matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
			.matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
			.matches(/\d/, 'La contraseña debe contener al menos un número')
			.matches(/[!@_#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un carácter especial'),
		repeatPassword: Yup.string()
			.required('Debes ingresar nuevamente la contraseña para continuar')
			.oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
	});
}
