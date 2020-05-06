import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Paper,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import sessionService from "../repository/session";
import { UserTokenContext } from "../Router";

export const Login = () => {
  const classes = useStyles();
  const { setToken } = useContext(UserTokenContext);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().required("必須項目です"),
        password: Yup.string().required("必須項目です"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const login = async () => {
          const response = await sessionService.loginUser(values);
          setToken(response.token);
        };
        login();
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Container style={{ marginTop: "112px" }} maxWidth="sm">
          <Paper className={classes.paper} elevation={3}>
            <Form>
              <ErrorMessage name="email">
                {(msg) => (
                  <Typography className={classes.errorMessage}>
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>
              <Field
                name="email"
                label="メールアドレス"
                as={TextField}
                type="text"
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
                label="パスワード"
                as={TextField}
                variant="outlined"
                fullWidth
                error={errors.password && touched.password}
              />
              <div className={classes.buttonWrapper}>
                <Button
                  className={classes.interval}
                  variant="contained"
                  color="default"
                >
                  <Link
                    style={{ color: "#000000", textDecoration: "none" }}
                    to="/signup"
                  >
                    新規登録へ
                  </Link>
                </Button>
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
    justifyContent: "space-between",
  },
  errorMessage: {
    fontSize: "0.8rem",
    color: "#F44036",
    marginTop: "8px",
  },
});
