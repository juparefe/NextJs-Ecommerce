import { useFormik } from "formik";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Image } from "semantic-ui-react";
import { initialValues, validationSchema } from "./AvatarForm.form";
import styles from "./AvatarForm.module.scss";
import { userCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { fn } from "@/utils/functions";

export function AvatarForm() {
  const [avatar, setAvatar] = useState<Blob | string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: async (formValue) => {
      try {
        setLoading(true);
        const render = new FileReader();
        render.readAsArrayBuffer(formValue.file);
        render.onload = async () => {
          const image = render.result;
          await userCtrl.updateAvatar(user.userUUID, image);
          setLoading(false);
        };
      } catch (error) {
        console.error(error);
      }
    },
    validateOnChange: false,
    validationSchema: validationSchema()
  });

  useEffect(() => {
    const imageUrl = fn.getUrlImage(user.userUUID);
    fn.checkIfImageExists(imageUrl, (exists: boolean) => {
      if (exists) setAvatar(imageUrl);
      else setAvatar(null);
    });
  }, [user]);

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("file", file);
    const previewUrl = URL.createObjectURL(file);
    setAvatar(previewUrl);
    formik.setFieldValue("preview", previewUrl);
  }, [formik]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer} {...getRootProps()}>
        <input {...getInputProps()} />
        {avatar ? (
          <Image size="small" src={avatar} alt="Avatar"/>
        ) : (
          <div>
            <span>Arrastra la imagen</span>
          </div>
        )}
      </div>
      <Button primary className={styles.btnA} loading={loading} onClick={(event) => formik.handleSubmit(event as any)}>
        Enviar
      </Button>
    </div>
  );
}
