// pages/edit-incidents/[id].js

import IncidentForm from "@/components/IncidentForm/IncidentForm";
import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getSession } from "next-auth/react";

export default function EditIncidentPage({ user }) {
  const router = useRouter();
  const { id } = router.query;
  const incidentUrl = id ? `/api/incidents/${id}` : null;
  const { data: incident, isLoading, error } = useSWR(incidentUrl);

  if (isLoading || !id || !incident) {
    return (
      <FeedbackMessage role="status" aria-live="polite">
        Loading incident...
      </FeedbackMessage>
    );
  }

  if (error) {
    return (
      <>
        <BackButton onClick={() => router.push(`/incidents/${id}`)}>
          ← Back
        </BackButton>
        <FeedbackMessage role="alert">Incident not found.</FeedbackMessage>
      </>
    );
  }

  const initialData = {
    ...incident,
    date: incident.date.slice(0, 10),
    involvedPersons: incident.involvedPersons.join(", "),
    witnesses: incident.witnesses.join(", "),
  };

  async function handleEditIncident(incidentData) {
    const result = await fetch(`/api/incidents/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incidentData),
    });

    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(errorData.message ?? "Could not update incident.");
    }

    setTimeout(() => router.push(`/incidents/${id}`), 2000);
  }

  return (
    <PageContainer>
      <BackButton onClick={() => router.push(`/incidents/${id}`)}>
        ← Back
      </BackButton>
      <PageTitle>Make Changes</PageTitle>
      <IncidentForm
        initialData={initialData}
        onSubmit={handleEditIncident}
        submitLabel="Save Changes"
        onCancel={() => router.push(`/incidents/${id}`)}
        cancelLabel="Cancel"
      />
    </PageContainer>
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

const FeedbackMessage = styled.p`
  font-family: var(--font-family);
  padding: 16px;
  text-align: center;
  color: var(--color-text);
`;

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

const PageTitle = styled.h1`
  font-family: var(--font-family);
  font-size: 1.2rem;
  color: var(--color-text);
  text-align: center;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
