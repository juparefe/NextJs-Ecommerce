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
    addAddress: Yup.string().required('¿Cual es la direccion?'),
    addCity: Yup.string().required('¿En que ciudad se encuentra esta direccion'),
    addName: Yup.string().required('¿Quien recibira el pedido en esta direccion'),
    addPhone: Yup.number().required('Debes añadir el numero de quien recibira el pedido'),
    addPostalCode: Yup.string().required('Debes añadir el codigo postal'),
    addState: Yup.string().required('¿En que departamento/estado se ubica la direccion'),
    addTitle: Yup.string().required('¿Como quieres nombrar esta direccion')
  });
}
