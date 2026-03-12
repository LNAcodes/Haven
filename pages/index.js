// pags/index.js
import Link from "next/link";
import styled from "styled-components";

export default function HomePage() {
  return (
    <main>
      <Title>Welcome to Haven</Title>
      <StyledLink href="/incidents/add-incident">
        <Button>Add New Incident</Button>
      </StyledLink>
    </main>
  );
}

const Main = styled.main`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  min-height: 100dvh;
  padding: 24px;
`;

const Title = styled.h1`
  font-family: var(--font-family);
  font-size: 1.2rem;
  color: var(--color-text);
  text-align: center;
  align-self: end;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

const Button = styled.button`
  font-family: var(--font-family);
  font-size: 0.8rem;
  height: 36px;
  padding: 0 14px;
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: start;
`;
