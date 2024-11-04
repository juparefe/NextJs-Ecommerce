import { useFormik } from 'formik';
import { Form } from 'semantic-ui-react';
import { initialValues, validationSchema } from './ProductDiscountForm.form';
import { productCtrl } from '@/api';
import { Constants, fn } from '@/utils';

export function ProductDiscountForm(props: any) {
	const { onClose, onReload, product } = props;

	const formik = useFormik({
		initialValues: initialValues(product),
		onSubmit: async (formValue) => {
			try {
				await productCtrl.updateDiscount(product.prodId, JSON.stringify(formValue));
				onReload();
				onClose();
			} catch (error) {
				console.error(error);
			}
		},
		validateOnChange: false,
		validationSchema: validationSchema()
	});

	return (
		<>
			<h6>El precio del producto sin descuento es: {fn.formatCurrency(Number(product.prodPrice), Constants.DEFAULT_CURRENCY)}</h6>
			<Form onSubmit={formik.handleSubmit} warning>
				<Form.Input
					type="number"
					name="ProdDiscount"
					placeholder="Porcentaje de descuento"
					value={formik.values.ProdDiscount}
					onChange={formik.handleChange}
					error={formik.errors.ProdDiscount}
				/>
				<h6>El precio al publico quedaria en: {fn.formatCurrency(Number(product.prodPrice-(product.prodPrice * (formik.values.ProdDiscount/100))), Constants.DEFAULT_CURRENCY)}</h6>
				<Form.Button type="submit" fluid loading={formik.isSubmitting}>
					Enviar
				</Form.Button>
			</Form>
		</>
	);
}
