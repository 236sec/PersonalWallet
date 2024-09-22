export async function registerUser({
  email,
  password,
  username,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}): Promise<any | null> {
  const res = await fetch(`http://localhost:3000/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      username: username,
      firstName: firstName,
      lastName: lastName,
    }),
  });
  if (!res.ok) {
    throw Error("Failed to Register");
  }
  const result = await res.json();
  return result;
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any | null> {
  const res = await fetch(`http://localhost:3000/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (!res.ok) {
    throw Error("Failed to Login");
  }
  const result = await res.json();
  return result;
}

export async function getProfile() {
  const res = await fetch(`http://localhost:3000/users/profile`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw Error("Failed to Get Profile");
  }
  const result = await res.json();
  return result;
}
