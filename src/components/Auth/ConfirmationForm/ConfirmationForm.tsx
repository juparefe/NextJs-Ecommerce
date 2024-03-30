import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { initialValues, validationSchema } from './ConfirmationForm.form';
import { authCtrl } from '@/api';
import { Separator } from '@/components/Shared';

export function ConfirmationForm() {
	const router = useRouter();
	// En la variable query se almacenan los parametros de la url, en este caso tomo el correo electronico
	const { query } = router;
	const [loading, setLoading] = useState(false);

	// useEffect se ejecuta cuando el componente se monta y se actualiza y llena el campo email con el valor del query
	useEffect(() => {
		formik.setFieldValue('email', query.email);
	}, [query]);

	// Funcionalidad del formulario Activar Usuario que usa la api de amplify api/auth.ts para confirmar el usuario
	const formik = useFormik({
		initialValues: initialValues(),
		onSubmit: async (formValue) => {
			try {
				await authCtrl.confirmation(formValue.email, formValue.code);
				router.push('/join/login');
			} catch (error) {
				console.error(error);
			}
		},
		validateOnChange: false,
		validationSchema: validationSchema()
	});

	// Funcionalidad del formulario Reenviar codigo de verificación que usa la api de amplify api/auth.ts para reenviar el código de confirmación
	const onResendCode = async () => {
		formik.setFieldError('email', 'false');

		if (!formik.values.email) {
			formik.setFieldError('email', 'true');
			return;
		}

		setLoading(true);
		await authCtrl.resendCode(formik.values.email);
		setLoading(false);
	};

	// Formulario de confirmación de usuario con (email y código de confirmación), linea de separacion y un botón para reenviar el código de confirmación
	return (
		<>
			<Form onSubmit={formik.handleSubmit}>
				<Form.Input
					name="email"
					placeholder="Correo electronico"
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.errors.email}
				/>
				<Form.Input
					name="code"
					placeholder="Codigo de confirmación"
					values={formik.values.code}
					onChange={formik.handleChange}
					error={formik.errors.code}
				/>
				<Form.Button type="submit" fluid loading={formik.isSubmitting}>
					Activar usuario
				</Form.Button>
			</Form>

			<Separator height={50} />

			<Button fluid basic onClick={onResendCode} loading={loading}>
				Reenviar codigo de verificación
			</Button>
		</>
	);
}
