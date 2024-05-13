import * as Yup from "yup";

export function initialValues(data: any) {
  return {
    CategName: data?.categName || "",
    CategPath: data?.categPath || ""
  };
}

export function validationSchema() {
  return Yup.object({
    CategName: Yup.string().required(),
    CategPath: Yup.string().required()
  });
}
