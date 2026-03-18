// pages/landing/index.js

import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import styled from "styled-components";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

const Title = styled.h1``;

const DescreetMessage = styled.p``;

const LogButton = styled.button``;
