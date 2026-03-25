// pages/index.js
import styled from "styled-components";
import { getSession } from "next-auth/react";

export default function HomePage({ user }) {
  return (
    <Main>
      <Title>Welcome to Haven</Title>
    </Main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
`;

const Title = styled.h1`
  font-family: var(--font-family);
  font-size: 1.2rem;
  color: var(--color-text);
  text-align: center;
`;
