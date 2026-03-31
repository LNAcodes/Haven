// pages/incidents/index.js

import IncidentList from "@/components/IncidentList/IncidentList";
import styled from "styled-components";
import PageHeader from "@/components/ui/PageHeader";

export default function IncidentsPage({ user }) {
  return (
    <IncidentsContainer>
      <PageHeader>Overview</PageHeader>
      <IncidentList />
    </IncidentsContainer>
  );
}

export { requireAuth as getServerSideProps } from "@/lib/auth/requireAuth";

const IncidentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
`;
