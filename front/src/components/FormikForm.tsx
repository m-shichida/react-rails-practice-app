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

export const FormikForm = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={Yup.object({
        fullName: Yup.string().required("必須項目です"),
        email: Yup.string()
          .email("無効なメールアドレスです")
          .required("必須項目です"),
        password: Yup.string().required("必須項目です"),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref("password")], "passwordと一致しません")
          .required("必須項目です"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ errors, touched }) => (
        <Container style={{ marginTop: "112px" }} maxWidth="sm">
          <Paper className={classes.paper} elevation={3}>
            <Form>
              <ErrorMessage name="fullName">
                {(msg) => (
                  <Typography className={classes.errorMessage}>
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>
              <Field
                name="fullName"
                label="フルネーム"
                as={TextField}
                type="text"
                variant="outlined"
                fullWidth
                error={errors.fullName && touched.fullName}
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
                name="passwordConfirm"
                type="password"
                as={TextField}
                label="パスワード確認"
                variant="outlined"
                fullWidth
                error={errors.passwordConfirm && touched.passwordConfirm}
              />
              <div className={classes.buttonWrapper}>
                <Button
                  className={classes.interval}
                  variant="contained"
                  color="primary"
                  endIcon={<SendRounded />}
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
