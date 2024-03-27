// Pagina RegisterPage que utiliza el componente RegisterForm y el layout JoinLayout
import { RegisterForm } from '@/components/Auth';
import { JoinLayout } from '@/layouts';

export default function RegisterPage() {
	return (
		<JoinLayout>
			<RegisterForm />
		</JoinLayout>
	);
}
