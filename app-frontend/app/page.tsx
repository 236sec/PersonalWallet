"use client";
import Image from "next/image";
import Link from "next/link";
import WalletForm from "./component/WalletForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [wallets, setWallets] = useState([]);
  const fetchWallet = async () => {
    const res = await fetch("http://localhost:3000/users/wallet", {
      credentials: "include",
    });
    const data = await res.json();
    if (data) {
      console.log("Have wallet", data.length);
      setWallets(data);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);
  return (
    <div>
      <Link href={"/register"}>Register</Link>
      <Link href={"/login"}>Login</Link>
      <WalletForm />
      <ul>
        {wallets.map((wallet, ind) => {
          return <li key={ind}>{wallet.name}</li>;
        })}
      </ul>
    </div>
  );
}
