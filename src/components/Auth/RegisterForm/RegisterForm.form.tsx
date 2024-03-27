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
		email: Yup.string().email().required(),
		password: Yup.string().required(),
		repeatPassword: Yup.string()
			.required()
			.oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
	});
}
