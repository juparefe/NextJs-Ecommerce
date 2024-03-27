// Componente de registro para ser utilizado en la pagina RegisterPage
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Form } from 'semantic-ui-react';
import { initialValues, validationSchema } from './RegisterForm.form';
import styles from './RegisterForm.module.scss';
import { authCtrl } from '@/api';

export function RegisterForm() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: initialValues(),
		onSubmit: async (formValue) => {
			try {
				await authCtrl.register(formValue.email, formValue.password);
				router.push(`/join/confirmation?email=${formValue.email}`);
			} catch (error) {
				console.error(error);
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
				<Form.Input
					type="password"
					name="repeatPassword"
					placeholder="Repetir contraseña"
					value={formik.values.repeatPassword}
					onChange={formik.handleChange}
					error={formik.errors.repeatPassword}
				/>
				<Form.Button type="submit" fluid loading={formik.isSubmitting}>
					Crear cuenta
				</Form.Button>
			</Form>
			<p className={styles.login}>Ya tengo una cuenta</p>
			<Button as={Link} href="/join/login" fluid basic>
				Iniciar sesión
			</Button>
		</>
	);
}
