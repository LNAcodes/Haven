// pages/index.js
import styled from "styled-components";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <WelcomeContainer>
      <TopSection>
        <AppLabel>Haven</AppLabel>
        <Greeting>Welcome back.</Greeting>
        <Tagline>Take your time. You are safe here.</Tagline>
      </TopSection>
      <BottomSection>
        <ButtonGroup>
          <PrimaryLink href="/incidents">View my records</PrimaryLink>
          <SecondaryLink href="/incidents/add-incident">
            Add a note
          </SecondaryLink>
        </ButtonGroup>
      </BottomSection>
    </WelcomeContainer>
  );
}

export { requireAuth as getServerSideProps } from "@/lib/auth/requireAuth";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - 24px - 88px);
  margin: -24px -24px -88px -24px;
`;

const TopSection = styled.div`
  background-color: var(--color-header);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 48px 32px 52px 32px;
`;

const AppLabel = styled.span`
  display: block;
  font-family: var(--font-family);
  font-size: 0.7rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 20px;
`;

const Greeting = styled.h1`
  font-family: var(--font-family);
  font-size: 2.2rem;
  font-weight: var(--font-weight-semibold);
  color: #ffffff;
  line-height: 1.15;
`;

const Tagline = styled.p`
  font-family: var(--font-family);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 12px;
  line-height: 1.6;
  max-width: 280px;
`;

const BottomSection = styled.div`
  background-color: var(--color-background);
  padding: 40px 32px 88px 32px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PrimaryLink = styled(Link)`
  font-family: var(--font-family);
  font-size: 0.95rem;
  font-weight: var(--font-weight-medium);
  min-height: 48px;
  padding: 0 20px;
  background-color: var(--color-header);
  color: #ffffff;
  border-radius: 6px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SecondaryLink = styled(Link)`
  font-family: var(--font-family);
  font-size: 0.95rem;
  font-weight: var(--font-weight-medium);
  min-height: 48px;
  padding: 0 20px;
  background-color: transparent;
  color: var(--color-text);
  border-radius: 6px;
  border: 1.5px solid rgba(45, 42, 74, 0.2);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
