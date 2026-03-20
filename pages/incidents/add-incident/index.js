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
    setTimeout(() => router.push("/"), 2500);
  }
  return (
    <>
      <BackButton onClick={() => router.push("/")}>← Back</BackButton>
      <IncidentForm
        submitLabel="Submit"
        onSubmit={handleAddIncident}
        cancelLabel="Cancel"
        onCancel={() => router.push("/")}
        resetOnSuccess
      />
    </>
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
