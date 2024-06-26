import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Button } from 'semantic-ui-react';
import { initialValues, validationSchema } from './LoginForm.form';
import styles from './LoginForm.module.scss';
import { authCtrl } from '@/api';
import { useAuth } from '@/hooks';

export function LoginForm() {
	const { login } = useAuth();
	const router = useRouter();

	const formik = useFormik({
		initialValues: initialValues(),
		onSubmit: async (formValue) => {
			try {
				await authCtrl.login(formValue.email, formValue.password);
				await login();
				router.push('/');
			} catch (error) {
				console.error(error);
				// alert('Usuario o contraseña incorrecto');
			}
		},
		validateOnChange: false,
		validationSchema: validationSchema()
	});

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
					type="password"
					name="password"
					placeholder="Contraseña"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.errors.password}
				/>
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
