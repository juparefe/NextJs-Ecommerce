import * as Yup from "yup";

export function initialValues(data: any) {
  return {
    addAddress: data?.addAddress || "",
    addCity: data?.addCity || "",
    addName: data?.addName || "",
    addPhone: data?.addPhone || "",
    addPostalCode: data?.addPostalCode || "",
    addState: data?.addState || "",
    addTitle: data?.addTitle || ""
  };
}

export function validationSchema() {
  return Yup.object({
    addAddress: Yup.string().required(),
    addCity: Yup.string().required(),
    addName: Yup.string().required(),
    addPhone: Yup.number().required(),
    addPostalCode: Yup.string().required(),
    addState: Yup.string().required(),
    addTitle: Yup.string().required()
  });
}
