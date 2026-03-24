// pages/info/index.js

import styled from "styled-components";
import { getSession } from "next-auth/react";
import Link from "next/link";
import {
  faShield,
  faTruckMedical,
  faPhone,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InfoPage({ user }) {
  return (
    <InfoContainer>
      <InfoPageTitle>Help & Support</InfoPageTitle>

      <YouAreNotAloneSection>
        <SectionTitle>You are not alone.</SectionTitle>
        <EmergencyInfoBox>
          What happened to you is not okay, and it is not your fault. You
          deserve support. Talking to a trusted adult — a teacher, family
          member, or counselor — can make a real difference.
        </EmergencyInfoBox>
      </YouAreNotAloneSection>

      <InfoSection>
        <SectionTitle>If you are in immediate danger</SectionTitle>
        <EmergencyInfoBox>Please call</EmergencyInfoBox>
        <ButtonRow>
          <CallButton href="tel:110">
            <FontAwesomeIcon icon={faShield} /> Police: 110
          </CallButton>
          <CallButton href="tel:112">
            <FontAwesomeIcon icon={faTruckMedical} /> Emergency: 112
          </CallButton>
        </ButtonRow>
      </InfoSection>

      <InfoSection>
        <SectionTitle>Crisis Hotlines</SectionTitle>
        <ResourceList>
          <ResourceItem>
            <ResourceName>Telefonseelsorge</ResourceName>
            <EmergencyInfoBox>Free, 24/7, anonymous</EmergencyInfoBox>
            <CallButton href="tel:08001110111">
              <FontAwesomeIcon icon={faPhone} /> 0800 111 0 111
            </CallButton>
          </ResourceItem>
          <ResourceItem>
            <ResourceName>Telefonseelsorge</ResourceName>
            <EmergencyInfoBox>Free, 24/7, anonymous</EmergencyInfoBox>
            <CallButton href="tel:0800111 0 222">
              <FontAwesomeIcon icon={faPhone} />
              0800 111 0 222
            </CallButton>
          </ResourceItem>
          <ResourceItem>
            <ResourceName>Nummer gegen Kummer (Kids)</ResourceName>
            <CallButton href="tel:0800 1110550">
              <FontAwesomeIcon icon={faPhone} />
              0800 111 0 550
            </CallButton>
            <EmergencyInfoBox>Free, Mon–Sat 14:00–20:00</EmergencyInfoBox>
          </ResourceItem>
        </ResourceList>
      </InfoSection>

      <InfoSection>
        <SectionTitle>Online Help</SectionTitle>
        <ResourceList>
          <ResourceItem>
            <ResourceName>juuuport.de</ResourceName>
            <EmergencyInfoBox>
              Peer-to-peer counseling by young people
            </EmergencyInfoBox>
            <CallButton href="https://www.juuuport.de" target="_blank">
              <FontAwesomeIcon icon={faGlobe} /> Open website
            </CallButton>
          </ResourceItem>
        </ResourceList>
        <ResourceItem>
          <ResourceName>Bündnis gegen Cybermobbing</ResourceName>
          <EmergencyInfoBox>
            Support and information about cyberbullying
          </EmergencyInfoBox>
          <CallButton
            href="https://www.buendnis-gegen-cybermobbing.de"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGlobe} /> Open website
          </CallButton>
        </ResourceItem>
        <ResourceItem>
          <ResourceName>klicksafe.de</ResourceName>
          <EmergencyInfoBox>
            Information about safe internet use and cyberbullying
          </EmergencyInfoBox>
          <CallButton href="https://www.klicksafe.de" target="_blank">
            <FontAwesomeIcon icon={faGlobe} /> Open website
          </CallButton>
        </ResourceItem>
      </InfoSection>

      <YouAreNotAloneSection>
        <SectionTitle>We are here for you.</SectionTitle>
        <EmergencyInfoBox>
          If something happened to you — whether online or in person — you
          deserve to be heard and supported. Reach out.
        </EmergencyInfoBox>
        <BelieveYouText>We believe you.</BelieveYouText>
      </YouAreNotAloneSection>
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
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InfoPageTitle = styled.h1`
  font-family: var(--font-family);
  font-size: 1.5rem;
  color: var(--color-accent);
  text-align: center;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 12px;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent);
`;

const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ResourceItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const HotlineLink = styled(Link)`
  font-family: var(--font-family);
  font-size: 1rem;
  color: var(--color-text);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
`;

const EmergencyInfoBox = styled.p`
  font-family: var(--font-family);
  font-size: 0.9rem;
  font-weight: var(--font-weight-semibold);

  color: var(--color-text);
  text-align: center;
`;

const YouAreNotAloneSection = styled.div`
  background-color: var(--color-success-bg);
  padding: 24px 16px;
  text-align: center;
  margin: 0 -24px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

const CallButton = styled(Link)`
  font-family: var(--font-family);
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
  min-height: 44px;
  padding: 0 16px;
  background-color: var(--color-primary);
  color: var(--color-text);
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  align-self: center;
  align-items: center;
  gap: 8px;
  width: fit-content;
`;

const ResourceName = styled.span`
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
`;

const BelieveYouText = styled.h2`
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  text-align: center;
`;
