import * as Yup from 'yup';

export function initialValues(data: any) {
	return {
		ProdDiscount: Number(data?.ProdDiscount) || 0
	};
}

export function validationSchema() {
	return Yup.object({
		ProdDiscount: Yup.number().required('¿Cual es el porcentaje de descuento de tu producto?').min(1, 'El porcentaje de descuento debe ser mayor que 0')
	});
}
