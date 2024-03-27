// Pagina ConfirmationPage que utiliza el componente ConfirmationForm y el layout JoinLayout
import { ConfirmationForm } from '@/components/Auth';
import { JoinLayout } from '@/layouts';

export default function ConfirmationPage() {
	return (
		<JoinLayout>
			<ConfirmationForm />
		</JoinLayout>
	);
}
