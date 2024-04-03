import * as Yup from 'yup';

export function initialValues(data: any) {
	return {
		ProdCategId: data?.prodCategId || null,
		ProdDescription: data?.prodDescription || '',
		ProdPath: data?.prodPath || '',
		ProdPrice: data?.prodPrice || '',
		ProdStock: data?.prodStock || '',
		ProdTitle: data?.prodTitle || ''
	};
}

export function validationSchema() {
	return Yup.object({
		ProdCategId: Yup.number().required(),
		ProdDescription: Yup.string().required(),
		ProdPath: Yup.string().required(),
		ProdPrice: Yup.number().required(),
		ProdStock: Yup.number().required(),
		ProdTitle: Yup.string().required()
	});
}
