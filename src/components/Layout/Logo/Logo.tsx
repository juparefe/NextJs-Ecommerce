// Devuelve el logo de la aplicación con un enlace a la página principal
import Link from 'next/link';
import { Image } from 'semantic-ui-react';

export function Logo() {
	return (
		<Link href={'/'}>
			<Image src="/images/logo-texto.png" alt="Gambit" />
		</Link>
	);
}
