import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const WalletInfo = ({ walletData }) => {
  const { _doc, ...transactions } = walletData;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">{_doc.name}</Typography>
      <Typography variant="body1">{_doc.description}</Typography>
      <Typography variant="body2" color="textSecondary">
        Type: {_doc.type}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Created At: {new Date(_doc.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Updated At: {new Date(_doc.updatedAt).toLocaleString()}
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Coin Name</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(transactions).map((key) => {
              const transaction = transactions[key];
              return (
                <TableRow key={key}>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.coinName}</TableCell>
                  <TableCell>{transaction.totalAmount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WalletInfo;
