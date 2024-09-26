"use client";
import React, { Component } from "react";
import { Formik } from "formik";
import { TextField, Button, MenuItem } from "@mui/material";
import {
  CoinType,
  createTransaction,
  TransactionType,
} from "../services/TransactionService";
import Select from "@mui/material/Select";

type Props = {
  walletId: string;
};

type State = {};

class TransactionForm extends Component<Props, State> {
  state = {};

  render() {
    return (
      <Formik
        initialValues={{
          coinName: CoinType.THB,
          amount: 0,
          description: "",
          type: TransactionType.Deposit,
        }}
        validate={(values) => {
          const errors = {} as any;
          if (!values.coinName) {
            errors.coinName = "Required";
          }
          if (values.amount == 0) {
            errors.amount = "Required";
          }
          if (!values.type) {
            errors.type = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const data = await createTransaction({
            walletId: this.props.walletId,
            ...values,
          });
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
            <Select
              label="CoinName"
              name="coinName"
              value={values.coinName}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              error={touched.coinName && Boolean(errors.coinName)}
            >
              <MenuItem value={CoinType.THB}>{CoinType.THB}</MenuItem>
              <MenuItem value={CoinType.USD}>{CoinType.USD}</MenuItem>
            </Select>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.amount}
              error={touched.amount && Boolean(errors.amount)}
              helperText={touched.amount && errors.amount ? errors.amount : ""}
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
            <Select
              label="Type"
              name="type"
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              error={touched.type && Boolean(errors.type)}
            >
              <MenuItem value={TransactionType.Deposit}>
                {TransactionType.Deposit.toUpperCase()}
              </MenuItem>
              <MenuItem value={TransactionType.Withdraw}>
                {TransactionType.Withdraw.toUpperCase()}
              </MenuItem>
            </Select>
            {touched.type && errors.type && (
              <div style={{ color: "red" }}>{errors.type}</div>
            )}

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
    );
  }
}

export default TransactionForm;
