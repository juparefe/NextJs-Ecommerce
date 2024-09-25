// Contiene los valores iniciales del formulario y el esquema de validación. Se utiliza para el formulario de confirmación de usuario.
import * as Yup from 'yup';

export function initialValues() {
	return {
		code: '',
		email: ''
	};
}

export function validationSchema() {
	return Yup.object({
		code: Yup.string().required('Ingresa el codigo que llego a tu correo para continuar'),
		email: Yup.string().required('Debes ingresar el correo con el que te registraste').email('El correo ingresado no es valido')
	});
}
