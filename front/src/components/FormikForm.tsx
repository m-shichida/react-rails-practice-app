import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Button,
  TextField,
  Container,
  Paper,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";

import userService from "../repository/user";

export const FormikForm = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("必須項目です"),
        lastName: Yup.string().required("必須項目です"),
        email: Yup.string()
          .email("無効なメールアドレスです")
          .required("必須項目です"),
        password: Yup.string().required("必須項目です"),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref("password")], "passwordと一致しません")
          .required("必須項目です"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const login = async () => {
          const response = await userService.registrateUser(values);
          alert(response);
          setSubmitting(false);
        };
        login();
      }}
    >
      {({ errors, touched }) => (
        <Container style={{ marginTop: "112px" }} maxWidth="sm">
          <Paper className={classes.paper} elevation={3}>
            <Form>
              <ErrorMessage name="firstName">
                {(msg) => (
                  <Typography className={classes.errorMessage}>
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>
              <Field
                name="firstName"
                label="姓"
                as={TextField}
                type="text"
                variant="outlined"
                fullWidth
                error={errors.firstName && touched.firstName}
              />
              <ErrorMessage name="lastName">
                {(msg) => (
                  <Typography className={classes.errorMessage}>
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>
              <Field
                className={classes.interval}
                name="lastName"
                label="名"
                as={TextField}
                type="text"
                variant="outlined"
                fullWidth
                error={errors.lastName && touched.lastName}
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <Typography className={classes.errorMessage}>
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>
              <Field
                className={classes.interval}
                name="email"
                type="email"
                as={TextField}
                label="メールアドレス"
                variant="outlined"
                fullWidth
                error={errors.email && touched.email}
              />
              <ErrorMessage name="password">
                {(msg) => (
                  <Typography className={classes.errorMessage}>
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>
              <Field
                className={classes.interval}
                name="password"
                type="password"
                as={TextField}
                label="パスワード"
                variant="outlined"
                fullWidth
                error={errors.password && touched.password}
              />
              <ErrorMessage name="passwordConfirm">
                {(msg) => (
                  <Typography className={classes.errorMessage}>
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>
              <Field
                className={classes.interval}
                name="passwordConfirmation"
                type="password"
                as={TextField}
                label="パスワード確認"
                variant="outlined"
                fullWidth
                error={
                  errors.passwordConfirmation && touched.passwordConfirmation
                }
              />
              <div className={classes.buttonWrapper}>
                <Button
                  className={classes.interval}
                  variant="contained"
                  color="primary"
                  endIcon={<SendRounded />}
                  type="submit"
                >
                  Send
                </Button>
              </div>
            </Form>
          </Paper>
        </Container>
      )}
    </Formik>
  );
};

const useStyles = makeStyles({
  interval: {
    marginTop: "8px",
  },
  paper: {
    padding: "24px",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  errorMessage: {
    fontSize: "0.8rem",
    color: "#F44036",
    marginTop: "8px",
  },
});
