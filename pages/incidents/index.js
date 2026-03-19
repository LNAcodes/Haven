// pages/incidents/index.js

import IncidentList from "@/components/IncidentList/IncidentList";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function IncidentsPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/landing");
    return null;
  }

  if (status === "loading") {
    return null;
  }
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
