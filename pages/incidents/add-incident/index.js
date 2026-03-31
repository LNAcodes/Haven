// pages/incidents/add-incident/index.js

import IncidentForm from "@/components/IncidentForm/IncidentForm";
import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export default function AddIncident({ user }) {
  const { mutate, data: incidents } = useSWR(API_ENDPOINTS.INCIDENTS);
  const router = useRouter();

  async function handleAddIncident(incidentData) {
    const newIncident = { ...incidentData, _id: crypto.randomUUID() };
    mutate([newIncident, ...(incidents || [])], false);
    const result = await fetch(API_ENDPOINTS.INCIDENTS, {
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

export { requireAuth as getServerSideProps } from "@/lib/auth/requireAuth";

const AddIncidentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
