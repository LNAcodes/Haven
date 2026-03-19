// pages/welcome/index.js

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

export default function WelcomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/landing");
    return null;
  }

  if (status === "loading") {
    return (
      <FeedbackMessage role="status" aria-live="polite">
        Loading...
      </FeedbackMessage>
    );
  }

  return (
    <WelcomeContainer>
      <Title>Welcome back</Title>
      <Message>Take your time. You are safe here.</Message>
      <ButtonGroup>
        <ActionLink href="/incidents">View my records</ActionLink>
        <ActionLink href="/incidents/add-incident">
          Document new incident
        </ActionLink>
      </ButtonGroup>
    </WelcomeContainer>
  );
}

const FeedbackMessage = styled.p`
  font-family: var(--font-family);
  padding: 16px;
  text-align: center;
  color: var(--color-text);
`;

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
