// pages/index.js
import styled from "styled-components";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function WelcomePage({ user }) {
  return (
    <WelcomeContainer>
      <Title>Welcome back</Title>
      <Message>Take your time. You are safe here.</Message>
      <ButtonGroup>
        <ActionLink href="/incidents">View my records</ActionLink>
        <ActionLink href="/incidents/add-incident">Add a note</ActionLink>
      </ButtonGroup>
    </WelcomeContainer>
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

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  gap: 24px;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h1`
  font-family: var(--font-family);
  font-size: 1.8rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent);
`;

const Message = styled.p`
  font-family: var(--font-family);
  font-size: 1rem;
  color: var(--color-text);
  max-width: 300px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 300px;
`;

const ActionLink = styled(Link)`
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  min-height: 48px;
  padding: 0 16px;
  background-color: var(--color-primary);
  color: var(--color-text);
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
