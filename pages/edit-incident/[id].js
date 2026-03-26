// pages/edit-incident/[id].js

import IncidentForm from "@/components/IncidentForm/IncidentForm";
import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import Button from "@/components/ui/Button";
import Message from "@/components/ui/Message";
import PageHeader from "@/components/ui/PageHeader";

export default function EditIncidentPage({ user }) {
  const router = useRouter();
  const { id } = router.query;
  const incidentUrl = id ? `/api/incidents/${id}` : null;
  const { data: incident, isLoading, error } = useSWR(incidentUrl);

  if (isLoading || !id || !incident) {
    return <Message type="info">Loading incident...</Message>;
  }

  if (error) {
    return (
      <>
        <Button variant="back" onClick={() => router.push(`/incidents/${id}`)}>
          ← Back
        </Button>
        <Message type="error">Incident not found.</Message>
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
      <PageHeader>Make Changes</PageHeader>
      <Button variant="back" onClick={() => router.push(`/incidents/${id}`)}>
        ← Back
      </Button>
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
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
