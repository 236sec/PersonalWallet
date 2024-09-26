export async function createWallet({
  name,
  description,
  type,
}: {
  name: string;
  description?: string;
  type?: string;
}) {
  const res = await fetch(`${process.env.BASE_URL}/wallets`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, type }),
  });
  if (!res.ok) {
    throw Error("Failed to Create Wallet");
  }
  const result = await res.json();
  return result;
}

export async function getWallets() {
  const res = await fetch(`${process.env.BASE_URL}/users/wallet`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    throw Error("Failed to Create Wallet");
  }
  const result = await res.json();
  return result;
}
