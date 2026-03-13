// pages/index.js
import Link from "next/link";
import styled from "styled-components";
import IncidentList from "@/components/IncidentList/IncidentList";

export default function HomePage() {
  return (
    <Main>
      <Title>Welcome to Haven</Title>
      <AddIncidentLink href="/incidents/add-incident">
        Add New Incident
      </AddIncidentLink>
      <IncidentList />
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
`;

const Title = styled.h1`
  font-family: var(--font-family);
  font-size: 1.2rem;
  color: var(--color-text);
  text-align: center;
`;

const AddIncidentLink = styled(Link)`
  font-family: var(--font-family);
  font-size: 0.8rem;
  font-weight: var(--font-weight-medium);
  min-height: 44px;
  padding: 0 16px;
  background-color: var(--color-primary);
  color: var(--color-text);
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
