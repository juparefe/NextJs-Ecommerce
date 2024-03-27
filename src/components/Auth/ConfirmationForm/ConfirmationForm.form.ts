import * as Yup from 'yup';

export function initialValues() {
	return {
		code: '',
		email: ''
	};
}

export function validationSchema() {
	return Yup.object({
		code: Yup.string().required(),
		email: Yup.string().email().required()
	});
}
