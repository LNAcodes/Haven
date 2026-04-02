// components/ui/PageHeader.js

import styled from "styled-components";

export default function PageHeader({ children, variant = "default" }) {
  return (
    <Header>
      <Title>{children}</Title>
    </Header>
  );
}

const Header = styled.div`
  background-color: var(--color-header);
  padding: 48px 24px;
  margin: -24px -24px 0 -24px;
`;

const Title = styled.h1`
  font-family: var(--font-family);
  font-size: 1.5rem;
  color: var(--color-button-text);
  text-align: left;
`;
