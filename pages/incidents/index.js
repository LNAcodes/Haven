// pages/incidents/index.js

import IncidentList from "@/components/IncidentList/IncidentList";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import PageHeader from "@/components/ui/PageHeader";

export default function IncidentsPage({ user }) {
  return (
    <IncidentsContainer>
      <PageHeader>Overview</PageHeader>
      <IncidentList />
    </IncidentsContainer>
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

const IncidentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
`;
