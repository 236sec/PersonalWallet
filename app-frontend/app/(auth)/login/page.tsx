"use client";
import React from "react";
import { Formik } from "formik";
import { getProfile, loginUser } from "@/app/services/UserService";

type Props = {};

const RegisterPager = (props: Props) => {
  return (
    <div>
      <h1>RegisterPager</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          firstName: "",
          lastName: "",
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
          if (!data) {
            alert("Failed");
          } else {
            alert("Success");
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>

      <button onClick={async () => await getProfile()}>Hello</button>
    </div>
  );
};

export default RegisterPager;
