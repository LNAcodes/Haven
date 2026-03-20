// pages/incidents/index.js

import IncidentList from "@/components/IncidentList/IncidentList";
import styled from "styled-components";
import { getSession } from "next-auth/react";

export default function IncidentsPage({ user }) {
  return (
    <IncidentsContainer>
      <IncidentListPageTitle>Documentation</IncidentListPageTitle>
      <IncidentList />
    </IncidentsContainer>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/landing",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

const IncidentListPageTitle = styled.h1`
  font-family: var(--font-family);
  font-size: 1.2rem;
  color: var(--color-text);
  text-align: center;
`;

const IncidentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
`;
