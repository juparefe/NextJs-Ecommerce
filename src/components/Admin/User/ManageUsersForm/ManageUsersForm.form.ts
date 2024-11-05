import * as Yup from "yup";

export function initialValues(data: any) {
  return {
    UserEmail: data?.userEmail || "",
    UserFirstName: data?.userFirstName || "",
    UserLastName: data?.userLastName || "",
    UserStatus: data?.categPath || "",
    UserUUID: data?.UserUUID || ""
  };
}

export function validationSchema() {
  return Yup.object({
    UserEmail: Yup.string().required('Debes elegir un email de usuario para actualizar'),
    UserStatus: Yup.string().required('Debes elegir un rol para el usuario escogido')
  });
}
