import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Formikで作成したフォームをMaterial UIで整形する。

export const FormikForm = () => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "15文字以下にしてください")
          .required("必須項目です"),
        lastName: Yup.string()
          .max(20, "20文字以下にしてください")
          .required("必須項目です"),
        email: Yup.string()
          .email("無効なメールアドレスです")
          .required("必須項目です"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" type="text" />
        <ErrorMessage name="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" />
        <ErrorMessage name="lastName" />
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
