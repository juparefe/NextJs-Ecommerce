import { useFormik } from 'formik';
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Form, Icon, Image, SemanticICONS } from 'semantic-ui-react';
import { initialValues, validationSchema } from './ProductImageForm.form';
import styles from './ProductImageForm.module.scss';
import { productCtrl } from '@/api';
import { WindowScreenE } from '@/utils';

export function ProductImageForm(props: any) {
	const { onClose, onReload, productId, windowScreen } = props;
	const [imageDetails, setImageDetails] = useState({
		height: 0,
		size: 0,
		width: 0
	});
	const [loading, setLoading] = useState(false);
	const [resizedImageDetails, setResizedImageDetails] = useState({
		height: 0,
		size: 0,
		width: 0
	});
	const [resizedFile, setResizedFile] = useState<File | null>(null);
	const [resizedImageURL, setResizedImageURL] = useState<string | null>(null);
	const [icon, setIcon] = useState<SemanticICONS>('angle double right');

	useEffect(() => {
        setIcon([WindowScreenE.Mobile].includes(windowScreen) ? 'angle double down' : 'angle double right');
    }, [windowScreen]);

	const formik = useFormik({
		initialValues: initialValues(),
		onSubmit: async () => {
			try {
				setLoading(true);
				if (resizedFile) {
					await productCtrl.updateImage(productId, resizedFile);
					onReload();
					onClose();
				}
			} catch (error) {
				console.error();
			} finally {
				setLoading(false);
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
		onDrop
	});

	const getMiniature = () => {
		if (formik.values.file && formik.values.preview) {
			// Cargar la imagen para obtener el ancho, alto y tamaño
			const img = new window.Image();
      		img.src = formik.values.preview;
			img.onload = () => {
			  setImageDetails({
				height: img.height,
				size: formik.values.file.size,
				width: img.width
			  });
			};
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (ctx) {
				const maxSize = 500; // Máximo tamaño para la imagen redimensionada
				canvas.width = maxSize;
				canvas.height = maxSize;

				// Dibujar la imagen redimensionada en el canvas
				ctx.drawImage(img, 0, 0, maxSize, maxSize);
				// Obtener la imagen como Blob
				canvas.toBlob(async (blob) => {
					if (blob) {
						setResizedImageDetails({
							height: maxSize,
							size: blob.size,
							width: maxSize
						});
						setResizedFile(new File([blob], productId, { type: formik.values.file.type }));
						setResizedImageURL(URL.createObjectURL(blob)); // Actualizar URL redimensionada
					}
				}, formik.values.file.type);
			}
			return formik.values.preview;
		}
		return null;
	};

	return (
	  <Form>
		<div className={styles.container} {...getRootProps()}>
		  <input {...getInputProps()} />
			<div className={styles.imageContainer}>
			{getMiniature() ? (
				<>
					<Image alt="Image to update" size="small" spaced src={formik.values.preview}  />
					<div className={styles.info}>
						<p className={styles.text}><strong>Ancho:</strong> {imageDetails.width}px</p>
						<p className={styles.text}><strong>Alto:</strong> {imageDetails.height}px</p>
						<p className={styles.text}><strong>Peso:</strong> {(imageDetails.size / 1024).toFixed(2)} KB</p>
					</div>
					<Icon className={styles.icon} name={icon} size='large'/>
					<Image alt="Image to update" size="small" spaced src={resizedImageURL}  />
					<div className={styles.info}>
						<p className={styles.text}><strong>Ancho:</strong> {resizedImageDetails.width.toFixed(2)}px</p>
						<p className={styles.text}><strong>Alto:</strong> {resizedImageDetails.height.toFixed(2)}px</p>
						<p className={styles.text}><strong>Peso:</strong> {(resizedImageDetails.size / 1024).toFixed(2)} KB</p>
					</div>
				</>
			) : (
				<div>
				<span>Arrastra la nueva imagen</span>
				</div>
			)}
			</div>
		</div>
		<Button primary fluid onClick={(event) => formik.handleSubmit(event as any)} loading={loading}>
			Enviar
		</Button>
	  </Form>
	);
}
