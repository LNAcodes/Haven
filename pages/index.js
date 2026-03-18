// pages/index.js
import Link from "next/link";
import styled from "styled-components";

export default function HomePage() {
  return (
    <Main>
      <Title>Welcome to Haven</Title>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
`;

const Title = styled.h1`
  font-family: var(--font-family);
  font-size: 1.2rem;
  color: var(--color-text);
  text-align: center;
`;
