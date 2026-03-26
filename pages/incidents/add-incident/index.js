// pages/incidents/add-incident/index.js

import IncidentForm from "@/components/IncidentForm/IncidentForm";
import useSWR from "swr";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

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
    setTimeout(() => router.push("/"), 3000);
  }
  return (
    <AddIncidentContainer>
      <PageHeader>Add a note</PageHeader>
      <Button variant="back" onClick={() => router.push("/")}>
        ← Back
      </Button>
      <IncidentForm
        submitLabel="Save"
        onSubmit={handleAddIncident}
        cancelLabel="Cancel"
        onCancel={() => router.push("/")}
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

const AddIncidentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
