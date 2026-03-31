import { getSession } from "next-auth/react";

export async function requireAuth(context) {
  const session = await getSession(context);
  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: { user: session.user } };
}
