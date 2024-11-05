import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import { initialValues, validationSchema } from "./ManageUsersForm.form";
import { userCtrl } from "@/api";
import { UserI } from "@/utils";

export function ManageUsersForm(props: any) {
  const { onClose, onReload, category } = props;
  const [users, setUsers] = useState<any[]>([]);
  const [fieldsDisabled, setFieldsDisabled] = useState<boolean>(true);

  useEffect(() => {
		(async () => {
			try {
				const response = await userCtrl.getAll();
        // Filtrar resultados para eliminar SuperAdmin
        const filteredResponse = response.data.filter((item: UserI) => item.userStatus !== 1);
				const result = filteredResponse.map((item: UserI) => ({
          firstName: item.userFirstName,
          key: item.userUUID,
          lastName: item.userLastName,
          role: item.userStatus,
					text: item.userEmail,
          value: item.userEmail
				}));
				setUsers(result);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

  const formik = useFormik({
    initialValues: initialValues(category),
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateUserRole(formValue);
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
      <Form.Field>
      <label>Escoge el usuario</label>
        <Form.Dropdown
          name="UserEmail"
          placeholder="Email del usuario"
          search
          selection
          fluid
          options={users}
          value={formik.values.UserEmail}
          error={formik.errors.UserEmail}
          onChange={(_, data) => {
            const selectedUser = users.find(item => item.value === data.value);
            if (selectedUser) {
              formik.setFieldValue('UserEmail', selectedUser.value);
              formik.setFieldValue('UserFirstName', selectedUser.firstName);
              formik.setFieldValue('UserLastName', selectedUser.lastName);
              formik.setFieldValue('UserStatus', selectedUser.role);
              formik.setFieldValue('UserUUID', selectedUser.key);
              setFieldsDisabled(false);
            }
          }}
        />
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field disabled={fieldsDisabled}>
          <label>Nombre</label>
          <Form.Input
            name="UserFirstName"
            placeholder="Nombre"
            value={formik.values.UserFirstName}
            onChange={formik.handleChange}
            error={formik.errors.UserFirstName}
          />
        </Form.Field>
        <Form.Field disabled={fieldsDisabled}>
          <label>Apellido</label>
          <Form.Input
            name="UserLastName"
            placeholder="Apellido"
            value={formik.values.UserLastName}
            onChange={formik.handleChange}
            error={formik.errors.UserLastName}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field disabled={fieldsDisabled}>
        <label>Rol del usuario</label>
        <Form.Group inline>
          <Form.Radio
            label="Administrador"
            name="UserStatus"
            value={2}
            checked={[1,2].includes(formik.values.UserStatus)}
            onChange={() => formik.setFieldValue('UserStatus', 2)}
          />
          <Form.Radio
            label="Cliente"
            name="UserStatus"
            value={3}
            checked={formik.values.UserStatus === 3}
            onChange={() => formik.setFieldValue('UserStatus', 3)}
          />
        </Form.Group>
      </Form.Field>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
