import { useFormik } from 'formik';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Image } from 'semantic-ui-react';
import { initialValues, validationSchema } from './ProductImageForm.form';
import styles from './ProductImageForm.module.scss';
import { productCtrl } from '@/api';

export function ProductImageForm(props: any) {
	const { onClose, onReload, productId } = props;
	const [loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: initialValues(),
		onSubmit: async (formValue) => {
			try {
				setLoading(true);
				const render = new FileReader();
				render.readAsArrayBuffer(formValue.file);
				render.onload = async () => {
					const image = render.result;
					await productCtrl.updateImage(productId, image);
					onReload();
					onClose();
				};
			} catch (error) {
				console.error();
			}
		},
		validateOnChange: false,
		validationSchema: validationSchema()
	});

	const onDrop = useCallback((acceptedFile: any) => {
		const file = acceptedFile[0];
		formik.setFieldValue('file', file);
		formik.setFieldValue('preview', URL.createObjectURL(file));
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: { 'image/jpeg': ['.jpeg'] },
		onDrop
	});

	const getMiniature = () => {
		if (formik.values.file) {
			return formik.values.preview;
		}
		return null;
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={styles.imageContainer} {...getRootProps()}>
				<input {...getInputProps()} />

				{getMiniature() ? (
					<Image size="small" src={getMiniature()} alt="Image to update" />
				) : (
					<div>
						<span>Arrastra la nueva imagen</span>
					</div>
				)}
			</div>

			<Button primary fluid type="submit" loading={loading}>
				Enviar
			</Button>
		</form>
	);
}
