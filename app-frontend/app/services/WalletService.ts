export async function createWallet({
  name,
  description,
  type,
}: {
  name: string;
  description?: string;
  type?: string;
}) {
  const res = await fetch(`http://localhost:3000/wallets`, {
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
