// Devuelve un separador con la altura que se le pase por props
export function Separator(props: any) {
	const { height } = props;

	return <div style={{ height }} />;
}
