import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { initialValues, validationSchema } from "./CategoryForm.form";
import { categoryCtrl } from "@/api";

export function CategoryForm(props: any) {
  const { onClose, onReload, category } = props;

  const formik = useFormik({
    initialValues: initialValues(category),
    onSubmit: async (formValue) => {
      try {
        if (category) {
          await categoryCtrl.update(formValue, category.categId);
        } else {
          await categoryCtrl.create(formValue);
        }
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
      <Form.Input
        name="CategName"
        placeholder="Nombre de la categoria"
        value={formik.values.CategName}
        onChange={formik.handleChange}
        error={formik.errors.CategName}
      />
      <Form.Input
        name="CategPath"
        placeholder="Slug de la categoria"
        value={formik.values.CategPath}
        onChange={formik.handleChange}
        error={formik.errors.CategPath}
      />

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
