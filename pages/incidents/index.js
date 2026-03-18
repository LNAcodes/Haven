// pages/incidents/index.js

import IncidentList from "@/components/IncidentList/IncidentList";
import styled from "styled-components";

export default function IncidentsPage() {
  return (
    <>
      <IncidentListPageTitle>Documentation</IncidentListPageTitle>
      <IncidentList />
    </>
  );
}

const IncidentListPageTitle = styled.h1`
  font-family: var(--font-family);
  font-size: 1.2rem;
  color: var(--color-text);
  text-align: center;
`;
