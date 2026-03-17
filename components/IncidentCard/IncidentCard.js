// component/IncidentCard/IncidentCard.js

import styled from "styled-components";
import Link from "next/link";

export default function IncidentCard({ incident }) {
  const date = new Date(incident.date).toLocaleDateString("en-GB");

  return (
    <CardLink
      href={`/incidents/${incident._id}`}
      aria-label={`View incident from ${date} - ${incident.category}`}
    >
      <Card $severity={incident.severity}>
        <DateText>{date}</DateText>
        <CategoryText>{incident.category}</CategoryText>
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
  border-left: 8px solid
    ${({ $severity }) => {
      if ($severity === "low") return "var(--color-severity-low)";
      if ($severity === "medium") return "var(--color-severity-medium)";
      if ($severity === "high") return "var(--color-severity-high)";
      if ($severity === "critical") return "var(--color-severity-critical)";
      return "var(--color-primary)";
    }};
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
