// components/IncidentList/IncidentList.js

import useSWR from "swr";
import styled from "styled-components";
import Link from "next/link";
import IncidentCard from "@/components/IncidentCard/IncidentCard";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export default function IncidentList() {
  const { data: incidents, isLoading, error } = useSWR(API_ENDPOINTS.INCIDENTS);

  if (error) return <ErrorMessage>Something went wrong</ErrorMessage>;
  if (isLoading || !incidents)
    return <LoadingMessage>Loading incidents...</LoadingMessage>;
  if (incidents.length === 0)
    return (
      <EmptyMessage>
        No incidents documented yet.{" "}
        <AddIncidentLink href="/incidents/add-incident">
          Click + to add your first incident.
        </AddIncidentLink>
      </EmptyMessage>
    );

  return (
    <List>
      {incidents.map((incident) => (
        <ListItem key={incident._id}>
          <IncidentCard incident={incident} />
        </ListItem>
      ))}
    </List>
  );
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ListItem = styled.li`
  margin: 0;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: var(--color-text);
  padding: 16px;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: var(--color-error);
  background-color: var(--color-error-bg);
  padding: 16px;
  border-radius: 4px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: var(--color-text);
  padding: 16px;
`;

const AddIncidentLink = styled(Link)`
  font-family: var(--font-family);
  font-size: 0.8rem;
  font-weight: var(--font-weight-medium);
  min-height: 44px;
  padding: 0 16px;
  background-color: var(--color-primary);
  color: var(--color-button-text);
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
