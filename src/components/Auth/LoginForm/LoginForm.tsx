import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { initialValues, validationSchema } from './LoginForm.form';
import styles from './LoginForm.module.scss';
import { authCtrl } from '@/api';
import { useAuth } from '@/hooks';

export function LoginForm() {
	const { login } = useAuth();
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState('');

	const formik = useFormik({
		initialValues: initialValues(),
		onSubmit: async (formValue) => {
			setErrorMessage('');
			try {
				await authCtrl.login(formValue.email, formValue.password);
				await login();
				router.push('/');
			} catch (error) {
				console.error(error);
				setErrorMessage('El usuario o contraseña ingresado es incorrecto');
			}
		},
		validateOnChange: false,
		validationSchema: validationSchema()
	});

	return (
		<>
			<Form onSubmit={formik.handleSubmit} error={!!errorMessage}>
				<Form.Input
					name="email"
					placeholder="Correo electronico"
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.errors.email}
				/>
				<Form.Input
					type="password"
					name="password"
					placeholder="Contraseña"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.errors.password}
				/>
				{errorMessage && (
					<Message
						error
						header="Error en el inicio de sesión"
						content={errorMessage}
					/>
				)}
				<Form.Button type="submit" fluid loading={formik.isSubmitting}>
					Iniciar sesión
				</Form.Button>
			</Form>

			<p className={styles.register}>¿Eres nuevo cliente?</p>
			<Button as={Link} href="/join/register" fluid basic>
				Crear cuenta
			</Button>
		</>
	);
}
