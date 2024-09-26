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
import { getWallets } from "./services/WalletService";
import TransactionForm from "./component/TransactionForm";

interface Wallet {
  _id: string;
  name: string;
}

export default function Home() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value as string);
    setSelectedWallet(event.target.value as string);
  };

  const fetchWallet = async () => {
    const data = await getWallets();
    setWallets(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchWallet();
  }, []);
  return (
    <div>
      <Link href={"/register"}>
        <Button variant="contained">Register</Button>
      </Link>
      <Link href={"/login"}>
        <Button variant="contained">Login</Button>
      </Link>
      <WalletForm />
      <Link href={"/createwallet"}>
        <Button variant="contained">Create Wallet</Button>
      </Link>
      <TransactionForm walletId={selectedWallet} />
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
    </div>
  );
}
