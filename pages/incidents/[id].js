// pages/incidents/[id].js

import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog";
import Link from "next/link";

export default function IncidentDetailPage() {
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
        <BackButton onClick={() => router.push("/")}>← Back</BackButton>
        <FeedbackMessage role="alert">Error loading incident.</FeedbackMessage>
      </>
    );
  }

  if (isLoading || !id || !incident) {
    return (
      <FeedbackMessage role="status" aria-live="polite">
        Loading incident... Please wait...
      </FeedbackMessage>
    );
  }

  if (!incident) {
    return (
      <FeedbackMessage role="status" aria-live="polite">
        Incident not found.
      </FeedbackMessage>
    );
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
    setTimeout(() => router.push("/"), 2000);
  }

  const date = new Date(incident.date).toLocaleDateString("en-GB");

  return (
    <>
      <BackButton onClick={() => router.push("/")}>← Back</BackButton>
      {showDeleteSuccess ? (
        <SuccessMessage role="status" aria-live="polite">
          Incident successfully deleted.
        </SuccessMessage>
      ) : null}
      <DetailPageContainer $severity={incident.severity}>
        <ButtonGroup>
          <EditLink href={`/edit-incident/${id}`}>✏️</EditLink>

          <DeleteButton
            onClick={() => setIsDialogOpen(true)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting ..." : "🗑️"}
          </DeleteButton>
        </ButtonGroup>
        {isDialogOpen ? (
          <ConfirmationDialog
            onConfirm={handleDelete}
            onCancel={() => setIsDialogOpen(false)}
          />
        ) : null}
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
            {new Date(incident.createdAt).toLocaleDateString("en-GB")}
          </FieldValue>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Updated At</FieldLabel>
          <FieldValue>
            {new Date(incident.updatedAt).toLocaleDateString("en-GB")}
          </FieldValue>
        </FieldGroup>
      </DetailPageContainer>
    </>
  );
}

const DetailPageContainer = styled.main`
  background-color: white;
  border-radius: 8px;
  padding: 24px 24px 24px 32px;
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
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

const DeleteButton = styled.button`
  font-family: var(--font-family);
  font-size: 0.9rem;
  min-height: 44px;
  padding: 0 16px;
  background-color: var(--color-background);
  color: var(--color-button-text);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
  align-self: flex-end;
`;

const SuccessMessage = styled.p`
  font-family: var(--font-family);
  color: var(--color-success);
  background-color: var(--color-success-bg);
  padding: 8px 12px;
  border-radius: 4px;
  text-align: center;
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
