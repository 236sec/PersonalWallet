import * as React from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  CoinType,
  deleteTransaction,
  TransactionType,
} from "../services/TransactionService";
import Button from "@mui/material/Button";
import "./TableStyles.css";
import { useRouter } from "next/navigation";

type Transaction = {
  _id: string;
  walletId: string;
  amount: number;
  coinName: CoinType;
  type: TransactionType;
  description: string | null;
  updatedAt: string;
  createdAt: string;
};

type Props = {
  data: Transaction[];
};

const columns: GridColDef[] = [
  { field: "coinName", headerName: "CoinName", width: 120 },
  { field: "amount", headerName: "Amount", type: "number", width: 130 },
  { field: "type", headerName: "Type", width: 100 },
  { field: "description", headerName: "Description", width: 250 },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    width: 250,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const Table = (props: Props) => {
  const router = useRouter();
  const [selectionModel, setSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  // Handle API request to send selected rows
  const handleSendRequest = async () => {
    const selectedRows = props.data.filter((row) =>
      selectionModel.includes(row._id)
    );

    try {
      selectedRows.map(async (transaction) => {
        const data = deleteTransaction({ transactionId: transaction._id });
        if (data) {
          console.log("API response:", data);
          window.location.reload();
          return;
        }
        throw new Error("API not response");
      });
      // const response = await axios.post("/api/selected-rows", { selectedRows });
      // console.log("API response:", response.data);
    } catch (error) {
      console.error("Error sending selected rows:", error);
    }
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={props.data}
        columns={columns}
        getRowId={(row) => row._id}
        getRowClassName={(params) => {
          return params.row.type === "deposit" ? "deposit-row" : "withdraw-row";
        }}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
      <Button
        variant="contained"
        onClick={handleSendRequest}
        disabled={selectionModel.length === 0}
        sx={{ marginTop: 2 }}
      >
        Delete Selected Rows
      </Button>
    </Paper>
  );
};

export default Table;
