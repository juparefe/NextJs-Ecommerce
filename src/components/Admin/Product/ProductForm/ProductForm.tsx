import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { initialValues, validationSchema } from './ProductForm.form';
import { categoryCtrl, productCtrl } from '@/api';
import { Separator } from '@/components/Shared';
import { Category, ENV } from '@/utils';

export function ProductForm(props: any) {
	const { onClose, onReload, product } = props;
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await categoryCtrl.getAll();
				const result = response.map((item: Category) => ({
					key: item.categId,
					text: item.categName,
					value: item.categId
				}));
				setCategories(result);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const formik = useFormik({
		initialValues: initialValues(product),
		onSubmit: async (formValue) => {
			try {
				if (product) {
					await productCtrl.update(formValue, product.prodID);
				} else {
					await productCtrl.create(formValue);
				}
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
		<Form onSubmit={formik.handleSubmit}>
			<Form.Input
				name="ProdTitle"
				placeholder="Nombre"
				value={formik.values.ProdTitle}
				onChange={formik.handleChange}
				error={formik.errors.ProdTitle}
			/>
			<Form.Input
				name="ProdPath"
				placeholder="Slug"
				value={formik.values.ProdPath}
				onChange={formik.handleChange}
				error={formik.errors.ProdPath}
			/>

			<Editor
				apiKey={ENV.TINY_APIKEY}
				init={{
					height: 400,
					menubar: true,
					plugins: [
						'advlist',
						'autolink',
						'lists',
						'link',
						'image',
						'charmap',
						'preview',
						'anchor',
						'searchreplace',
						'visualblocks',
						'code',
						'fullscreen',
						'insertdatetime',
						'media',
						'table',
						'code',
						'help',
						'wordcount'
					],
					toolbar:
						'undo redo | blocks | ' +
						'bold italic forecolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help'
				}}
				initialValue={formik.values.ProdDescription}
				onBlur={(event) => formik.setFieldValue('ProdDescription', event.target.getContent())}
			/>

			<Separator height={20} />
			<Form.Dropdown
				name="ProdCategId"
				placeholder="Categoria del producto"
				search
				selection
				fluid
				options={categories}
				value={formik.values.ProdCategId}
				error={formik.errors.ProdCategId}
				onChange={(_, data) => formik.setFieldValue('ProdCategId', data.value)}
			/>

			<Form.Group widths="equal">
				<Form.Input
					type="number"
					name="ProdPrice"
					placeholder="Precio"
					value={formik.values.ProdPrice}
					onChange={formik.handleChange}
					error={formik.errors.ProdPrice}
				/>
				<Form.Input
					type="number"
					name="ProdStock"
					placeholder="Stock"
					value={formik.values.ProdStock}
					onChange={formik.handleChange}
					error={formik.errors.ProdStock}
				/>
			</Form.Group>

			<Form.Button type="submit" fluid loading={formik.isSubmitting}>
				Enviar
			</Form.Button>
		</Form>
	);
}
