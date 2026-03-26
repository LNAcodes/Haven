// pages/incidents/[id].js

import useSWR from "swr";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import Dialog from "@/components/ui/Dialog";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Message from "@/components/ui/Message";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

export default function IncidentDetailPage({ user }) {
  const router = useRouter();
  const { id } = router.query;
  const incidentUrl = id ? `/api/incidents/${id}` : null;
  const { data: incident, error, isLoading } = useSWR(incidentUrl);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  if (error) {
    return (
      <>
        <Button variant="back" onClick={() => router.push("/")}>
          ← Back
        </Button>
        <Message type="error">Error loading incident.</Message>
      </>
    );
  }

  if (isLoading || !id || !incident) {
    return <Message type="info">Loading incident... Please wait...</Message>;
  }

  if (!incident) {
    return <Message type="info">Incident not found.</Message>;
  }

  async function handleDelete() {
    setIsDeleting(true);
    const result = await fetch(`/api/incidents/${id}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      setIsDeleting(false);
      throw new Error("Could delete incident.");
    }

    setShowDeleteSuccess(true);
    setIsDialogOpen(false);
    setTimeout(() => router.push("/incidents"), 2000);
  }

  const date = new Date(incident.date).toLocaleDateString("en-GB");

  return (
    <DetailWrapper>
      <PageHeader>{date}</PageHeader>
      <Button variant="back" onClick={() => router.push("/incidents")}>
        ← Back
      </Button>
      {showDeleteSuccess ? (
        <Message
          type="success"
          dismissible
          onClose={() => setShowDeleteSuccess(false)}
        >
          Deleted. Take care. 💙
        </Message>
      ) : null}
      <DetailPageContainer $severity={incident.severity}>
        <ButtonGroup>
          <EditLink href={`/edit-incident/${id}`}>
            <FontAwesomeIcon icon={faPen} />
          </EditLink>

          <Button
            variant="delete"
            onClick={() => setIsDialogOpen(true)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting ..." : <FontAwesomeIcon icon={faTrash} />}
          </Button>
        </ButtonGroup>
        <Dialog
          showDialog={isDialogOpen}
          onConfirm={handleDelete}
          onCancel={() => setIsDialogOpen(false)}
          message="Delete this incident? This cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
        <FieldGroup>
          <FieldLabel>Date</FieldLabel>
          <FieldValue>{date}</FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Time</FieldLabel>
          <FieldValue>{incident.time}</FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Location</FieldLabel>
          <FieldValue>{incident.location}</FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Involved Persons</FieldLabel>
          <FieldValue>{incident.involvedPersons.join(", ")}</FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Witnesses</FieldLabel>
          <FieldValue>
            {incident.witnesses.length > 0
              ? incident.witnesses.join(", ")
              : "None"}
          </FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Category</FieldLabel>
          <FieldValue>{incident.category}</FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Severity</FieldLabel>
          <FieldValue>{incident.severity}</FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Description</FieldLabel>
          <FieldValue>{incident.description}</FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Impact</FieldLabel>
          <FieldValue>{incident.impact || "Not specified"}</FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Reported To</FieldLabel>
          <FieldValue>{incident.reportedTo || "Not specified"}</FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Follow Up</FieldLabel>
          <FieldValue>{incident.followUp || "Not specified"}</FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Status</FieldLabel>
          <FieldValue>{incident.status}</FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Created At</FieldLabel>
          <FieldValue>
            {incident.createdAt
              ? new Date(incident.createdAt).toLocaleDateString("en-GB")
              : "NotAvailable"}
          </FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Updated At</FieldLabel>
          <FieldValue>
            {incident.updatedAt
              ? new Date(incident.updatedAt).toLocaleDateString("en-GB")
              : "Not available"}
          </FieldValue>
        </FieldGroup>
      </DetailPageContainer>
    </DetailWrapper>
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

const DetailPageContainer = styled.main`
  background-color: white;
  border-radius: 8px;
  padding: 24px 24px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-left: 8px solid
    ${({ $severity }) => {
      if ($severity === "low") return "var(--color-severity-low)";
      if ($severity === "medium") return "var(--color-severity-medium)";
      if ($severity === "high") return "var(--color-severity-high)";
      if ($severity === "critical") return "var(--color-severity-critical)";
      return "var(--color-primary)";
    }};
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FieldLabel = styled.span`
  font-family: var(--font-family);
  font-size: 0.8rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent);
  text-transform: uppercase;
`;

const FieldValue = styled.span`
  font-family: var(--font-family);
  font-size: 1rem;
  color: var(--color-text);
`;

const EditLink = styled(Link)`
  font-family: var(--font-family);
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
  min-height: 44px;
  padding: 0 16px;
  background-color: var(--color-background);
  color: var(--color-text);
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: fit-content;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-end;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
`;
