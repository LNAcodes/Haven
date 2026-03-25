// pages/incidents/add-incident/index.js

import IncidentForm from "@/components/IncidentForm/IncidentForm";
import useSWR from "swr";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function AddIncident({ user }) {
  const { mutate, data: incidents } = useSWR("/api/incidents");
  const router = useRouter();

  async function handleAddIncident(incidentData) {
    const newIncident = { ...incidentData, _id: crypto.randomUUID() };
    mutate([newIncident, ...(incidents || [])], false);
    const result = await fetch("/api/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incidentData),
    });

    if (!result.ok) {
      await result.json();
      throw new Error("Could not save new incident.");
    }
    await mutate();
    setTimeout(() => router.push("/welcome"), 2500);
  }
  return (
    <AddIncidentContainer>
      <BackButton onClick={() => router.push("/welcome")}>← Back</BackButton>
      <PageTitle>Add a note</PageTitle>
      <IncidentForm
        submitLabel="Save"
        onSubmit={handleAddIncident}
        cancelLabel="Cancel"
        onCancel={() => router.push("/welcome")}
        resetOnSuccess
      />
    </AddIncidentContainer>
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
const BackButton = styled.button`
  font-family: var(--font-family);
  font-size: 0.8rem;
  font-weight: var(--font-weight-medium);
  min-height: 44px;
  padding: 0 16px;
  background-color: var(--color-accent);
  color: var(--color-button-text);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: fit-content;
`;

const AddIncidentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PageTitle = styled.h1`
  font-family: var(--font-family);
  font-size: 1.2rem;
  color: var(--color-text);
  text-align: center;
`;
