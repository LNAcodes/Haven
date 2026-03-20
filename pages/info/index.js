// pages/info/index.js

import styled from "styled-components";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function InfoPage({ user }) {
  return (
    <InfoContainer>
      <InfoPageTitle>Help & Support</InfoPageTitle>
      <InfoSection></InfoSection>
    </InfoContainer>
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

const InfoContainer = styled.div`
  font-family: var(--font-family);
  font-size: 1rem;
  color: var(--color-text);
`;

const InfoPageTitle = styled.h1``;

const InfoSection = styled.p``;

const SectionTitle = styled.h2``;

const ResourceList = styled.ul``;

const ResourceItem = styled.li``;

const HotlineLink = styled(Link)``;

const EmergencyBox = styled.p``;
