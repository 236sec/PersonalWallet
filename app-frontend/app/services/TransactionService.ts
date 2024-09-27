export async function createTransaction({
  walletId,
  coinName,
  amount,
  description,
  type,
}: {
  walletId: string;
  coinName: CoinType;
  amount: number;
  description?: string;
  type: TransactionType;
}) {
  const res = await fetch(`${process.env.BASE_URL}/transactions/${walletId}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coinName, amount, description, type }),
  });
  if (!res.ok) {
    throw Error("Failed to Create Transaction");
  }
  const result = await res.json();
  return result;
}

export async function getTransactions({ walletId }: { walletId: string }) {
  const res = await fetch(
    `${process.env.BASE_URL}/wallets/${walletId}/transactions`,
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!res.ok) {
    throw Error("Failed to Create Transaction");
  }
  const result = await res.json();
  return result;
}

export async function deleteTransaction({
  transactionId,
}: {
  transactionId: string;
}) {
  const res = await fetch(
    `${process.env.BASE_URL}/transactions/${transactionId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!res.ok) {
    throw Error("Failed to Create Transaction");
  }
  const result = await res.json();
  return result;
}

export enum CoinType {
  THB = "THB",
  USD = "USD",
}

export enum TransactionType {
  Withdraw = "withdraw",
  Deposit = "deposit",
}
