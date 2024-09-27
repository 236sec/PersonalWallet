"use client";
import React from "react";
import { Formik } from "formik";
import { getProfile, loginUser } from "@/app/services/UserService";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context/GlobalProvider";
type Props = {};

const RegisterPager = (props: Props) => {
  const router = useRouter();
  const { setIsLogged } = useGlobalContext();
  return (
    <div>
      <h1>Login Page</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {} as any;
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const data = await loginUser(values);

          console.log(data);
          if (!data) {
            alert("Failed");
          } else {
            alert("Success");
            setIsLogged(true);
            router.push("/");
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email ? errors.email : ""}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={
                touched.password && errors.password ? errors.password : ""
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
              sx={{
                color: "white",
                backgroundColor: "#3f51b5",
                "&:hover": {
                  backgroundColor: "#303f9f",
                },
              }}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>

      <Button onClick={async () => await getProfile()}>Hello</Button>
    </div>
  );
};

export default RegisterPager;
