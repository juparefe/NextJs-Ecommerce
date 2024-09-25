import * as Yup from "yup";

export function initialValues(data: any) {
  return {
    CategName: data?.categName || "",
    CategPath: data?.categPath || ""
  };
}

export function validationSchema() {
  return Yup.object({
    CategName: Yup.string().required('Debes elegir un nombre para la categoria'),
    CategPath: Yup.string()
      .required('Debes elegir una URL amigable para tu categoria (nombre-categoria)')
      .matches(/^[a-zA-Z0-9\-]+$/, 'La URL no debe tener espacios y solo puede contener letras, números y guiones')
  });
}
