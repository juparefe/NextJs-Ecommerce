import * as Yup from "yup";

export function initialValues() {
  const emptyBlob = new Blob([], { type: 'application/octet-stream' });
  return {
    file: emptyBlob,
    preview: null
  };
}

export function validationSchema() {
  return Yup.object({
    file: Yup.string().required()
  });
}
