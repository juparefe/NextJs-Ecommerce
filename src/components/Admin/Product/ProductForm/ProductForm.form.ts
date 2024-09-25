import * as Yup from 'yup';

export function initialValues(data: any) {
	return {
		ProdCategId: data?.prodCategId || null,
		ProdDescription: data?.prodDescription || '',
		ProdPath: data?.prodPath || '',
		ProdPrice: Number(data?.prodPrice) || '',
		ProdStock: data?.prodStock || '',
		ProdTitle: data?.prodTitle || ''
	};
}

export function validationSchema() {
	return Yup.object({
		ProdCategId: Yup.number().required('Debes elegir una categoria para tu producto nuevo'),
		ProdDescription: Yup.string(),
		ProdPath: Yup.string().required('Debes elegir una URL amigable para tu producto nuevo (nombre-de-tu-producto)'),
		ProdPrice: Yup.number().required('¿Cual es el precio de venta de tu nuevo producto?').min(1, 'El precio debe ser mayor que 0'),
		ProdStock: Yup.number().required('¿Cuantas unidades tienes disponibles?').min(1, 'Debes tener al menos 1 unidad para vender'),
		ProdTitle: Yup.string().required('Debes elegir un titulo para tu producto nuevo')
	});
}
