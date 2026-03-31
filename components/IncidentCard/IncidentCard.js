// component/IncidentCard/IncidentCard.js

import styled from "styled-components";
import Link from "next/link";
import { CATEGORY_ABBREVIATIONS } from "@/lib/constants/incident";
import { formatDate } from "@/lib/utils/dateFormatter";
import { getSeverityColor } from "@/lib/utils/severity";

export default function IncidentCard({ incident }) {
  const date = formatDate(incident.date);

  return (
    <CardLink
      href={`/incidents/${incident._id}`}
      aria-label={`View incident from ${date} - ${incident.category}`}
    >
      <Card $severity={incident.severity}>
        <DateText>{date}</DateText>
        <CategoryText>
          {CATEGORY_ABBREVIATIONS[incident.category] || incident.category}
        </CategoryText>
      </Card>
    </CardLink>
  );
}

const CardLink = styled(Link)`
  text-decoration: none;
`;

const Card = styled.article`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  min-height: 60px;
  display: flex;
  gap: 8px;
  align-items: center;
  border-left: 8px solid ${({ $severity }) => getSeverityColor($severity)};
`;

const DateText = styled.span`
  font-family: var(--font-family);
  font-weight: var(--font-weight-semibold);
  font-size: 0.9rem;
  color: var(--color-text);
`;

const CategoryText = styled.span`
  font-family: var(--font-family);
  font-size: 0.85rem;
  color: var(--color-accent);
  text-transform: capitalize;
`;

