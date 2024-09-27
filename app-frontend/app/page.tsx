"use client";
import Image from "next/image";
import Link from "next/link";
import WalletForm from "./component/WalletForm";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getWallet, getWalletsList } from "./services/WalletService";
import TransactionForm from "./component/TransactionForm";
import { getTransactions } from "./services/TransactionService";
import Table from "./component/TableTransaction";
import { useGlobalContext } from "./context/GlobalProvider";
import WalletInfo from "./component/WalletInfo";

interface Wallet {
  _id: string;
  name: string;
}

export default function Home() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [transactions, setTransactions] = useState([]);
  const [walletInfo, setWalletInfo] = useState<any>(null);
  const { isLogged } = useGlobalContext();

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value as string);
    setSelectedWallet(event.target.value as string);
  };

  const fetchWallet = async () => {
    const data = await getWalletsList();
    setWallets(Array.isArray(data) ? data : []);
  };

  const fetchTransaction = async () => {
    const data = await getTransactions({ walletId: selectedWallet });
    console.log("Transactions", data);
    setTransactions(data);
    const wallet = await getWallet(selectedWallet);
    setWalletInfo(wallet);
  };

  useEffect(() => {
    if (selectedWallet !== "") {
      fetchTransaction();
    }
  }, [selectedWallet]);

  useEffect(() => {
    fetchWallet();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      {!isLogged && (
        <div>
          <Link href={"/register"}>
            <Button variant="contained">Register</Button>
          </Link>
          <Link href={"/login"}>
            <Button variant="contained">Login</Button>
          </Link>
        </div>
      )}
      <WalletForm />
      <Link href={"/createwallet"}>
        <Button variant="contained">Create Wallet</Button>
      </Link>
      <h1>Add Transaction</h1>
      <TransactionForm walletId={selectedWallet} />
      <h1>Wallet</h1>
      <FormControl fullWidth>
        <InputLabel id="selectedWallet">Wallet</InputLabel>
        <Select
          labelId="selectedWallet"
          id="selectedWallet"
          value={selectedWallet}
          label="selectedWallet"
          onChange={handleChange}
        >
          {wallets.map((wallet, ind) => {
            return (
              <MenuItem key={ind} value={wallet._id}>
                {wallet.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Table data={transactions} />
      <div className="mt-10"></div>
      {walletInfo && <WalletInfo walletData={walletInfo} />}
    </div>
  );
}
