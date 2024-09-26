"use client";
import React from "react";
import { TextField, Button } from "@mui/material";
import { Formik } from "formik";
import { createWallet } from "@/app/services/WalletService";

type Props = {};

const CreateWallet = (props: Props) => {
  return (
    <div>
      <div></div>CreateWallet
      <Formik
        initialValues={{
          name: "",
          description: "",
          type: "",
        }}
        validate={(values) => {
          const errors = {} as any;
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.type) {
            errors.type = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const data = await createWallet(values);
          console.log(data);
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
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name ? errors.name : ""}
            />
            <TextField
              label="Description"
              name="description"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={touched.description && Boolean(errors.description)}
              helperText={
                touched.description && errors.description
                  ? errors.description
                  : ""
              }
            />
            <TextField
              label="Type"
              name="type"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.type}
              error={touched.type && Boolean(errors.type)}
              helperText={touched.type && errors.type ? errors.type : ""}
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
    </div>
  );
};

export default CreateWallet;
