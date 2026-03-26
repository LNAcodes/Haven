// pages/info/index.js

import styled from "styled-components";
import { getSession } from "next-auth/react";
import Link from "next/link";
import {
  faShield,
  faTruckMedical,
  faPhone,
  faGlobe,
  faHandHoldingMedical,
  faLaptop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InfoPage({ user }) {
  return (
    <InfoContainer>
      <InfoHeader>
        <InfoPageTitle>Help & Support</InfoPageTitle>
      </InfoHeader>

      <YouAreNotAloneSection>
        <SectionTitle>We are here for you.</SectionTitle>
        <EmergencyInfoBox>
          If something happened to you — whether online or in person — you
          deserve to be heard and supported. Reach out.
        </EmergencyInfoBox>
        <BelieveYouText>We believe you.</BelieveYouText>
      </YouAreNotAloneSection>

      <CardsContainer>
        <InfoSection $borderColor="var(--color-error)">
          <CardHeader>
            <IconBox $bgColor="var(--color-error-bg)">
              <FontAwesomeIcon icon={faShield} />
            </IconBox>
            <SectionTitle>If you are in immediate danger</SectionTitle>
          </CardHeader>
          <EmergencyInfoBox>Please call</EmergencyInfoBox>
          <ResourceList>
            <ResourceItem>
              <CallButton href="tel:110" $variant="critical">
                <FontAwesomeIcon icon={faShield} /> Police: 110
              </CallButton>
            </ResourceItem>
            <ResourceItem>
              <CallButton href="tel:112" $variant="critical">
                <FontAwesomeIcon icon={faTruckMedical} /> Emergency: 112
              </CallButton>
            </ResourceItem>
          </ResourceList>
        </InfoSection>

        <InfoSection $borderColor="var(--color-accent)">
          <CardHeader>
            <IconBox $bgColor="var(--color-severity-low)">
              <FontAwesomeIcon icon={faHandHoldingMedical} />
            </IconBox>
            <SectionTitle>Crisis Hotlines</SectionTitle>
          </CardHeader>
          <ResourceList>
            <ResourceItem>
              <ResourceName>Telefonseelsorge</ResourceName>
              <EmergencyInfoBox>Free, 24/7, anonymous</EmergencyInfoBox>
              <CallButton href="tel:08001110111" $variant="accent">
                <FontAwesomeIcon icon={faPhone} /> 0800 111 0 111
              </CallButton>
            </ResourceItem>
            <ResourceItem>
              <ResourceName>Telefonseelsorge</ResourceName>
              <EmergencyInfoBox>Free, 24/7, anonymous</EmergencyInfoBox>
              <CallButton href="tel:08001110222" $variant="accent">
                <FontAwesomeIcon icon={faPhone} /> 0800 111 0 222
              </CallButton>
            </ResourceItem>
            <ResourceItem>
              <ResourceName>Nummer gegen Kummer (Kids)</ResourceName>
              <CallButton href="tel:116111" $variant="accent">
                <FontAwesomeIcon icon={faPhone} /> 116 111
              </CallButton>
              <EmergencyInfoBox>Free, Mon–Sat 14:00–20:00</EmergencyInfoBox>
            </ResourceItem>
          </ResourceList>
        </InfoSection>

        <InfoSection $borderColor="var(--color-success)">
          <CardHeader>
            <IconBox $bgColor="var(--color-success-bg)">
              <FontAwesomeIcon icon={faLaptop} />
            </IconBox>
            <SectionTitle>Online Help</SectionTitle>
          </CardHeader>
          <ResourceList>
            <ResourceItem>
              <ResourceName>juuuport.de</ResourceName>
              <EmergencyInfoBox>
                Peer-to-peer counseling by young people
              </EmergencyInfoBox>
              <CallButton
                href="https://www.juuuport.de"
                target="_blank"
                $variant="success"
              >
                <FontAwesomeIcon icon={faGlobe} /> juuuport.de
              </CallButton>
            </ResourceItem>
            <ResourceItem>
              <ResourceName>Bündnis gegen Cybermobbing</ResourceName>
              <EmergencyInfoBox>
                Support and information about cyberbullying
              </EmergencyInfoBox>
              <CallButton
                href="https://www.buendnis-gegen-cybermobbing.de"
                target="_blank"
                $variant="success"
              >
                <FontAwesomeIcon icon={faGlobe} />{" "}
                buendnis-gegen-cybermobbing.de
              </CallButton>
            </ResourceItem>
            <ResourceItem>
              <ResourceName>klicksafe.de</ResourceName>
              <EmergencyInfoBox>
                Information about safe internet use
              </EmergencyInfoBox>
              <CallButton
                href="https://www.klicksafe.de"
                target="_blank"
                $variant="success"
              >
                <FontAwesomeIcon icon={faGlobe} /> klicksafe.de
              </CallButton>
            </ResourceItem>
          </ResourceList>
        </InfoSection>
      </CardsContainer>
      <YouAreNotAloneSectionBottom>
        <SectionTitle>You are not alone.</SectionTitle>
        <EmergencyInfoBox>
          What happened to you is not okay, and it is not your fault. You
          deserve support. Talking to a trusted adult — a teacher, family
          member, or counselor — can make a real difference.
        </EmergencyInfoBox>
      </YouAreNotAloneSectionBottom>
    </InfoContainer>
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

const InfoContainer = styled.div`
  font-family: var(--font-family);
  font-size: 1rem;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
`;

const InfoPageTitle = styled.h1`
  font-family: var(--font-family);
  font-size: 1.5rem;
  color: var(--color-button-text);
  text-align: left;
`;

const InfoSection = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-left: 4px solid ${({ $borderColor }) => $borderColor};
`;

const SectionTitle = styled.h2`
  font-family: var(--font-family);
  font-size: 1.1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  align-self: center;
`;

const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ResourceItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  color: var(--color-text);
`;

const YouAreNotAloneSection = styled.div`
  background-color: var(--color-severity-low);
  padding: 32px 24px;
  margin: 0 -24px;
  text-align: left;
`;

const YouAreNotAloneSectionBottom = styled.div`
  background-color: var(--color-severity-low);
  padding: 32px 24px;
  margin: 0 -24px;
  text-align: left;

  @media (min-width: 768px) {
    margin: 0 -24px;
    padding-bottom: 88px;
  }
`;

const YouAreNotAloneContent = styled.div`
  text-align: left;
  padding: 0 16px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const CallButton = styled(Link)`
  font-family: var(--font-family);
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
  min-height: 44px;
  padding: 0 16px;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background-color: ${({ $variant }) => {
    if ($variant === "critical") return "var(--color-error-bg)";
    if ($variant === "accent") return "var(--color-severity-low)";
    if ($variant === "success") return "var(--color-success-bg)";
    return "var(--color-severity-low)";
  }};
  color: var(--color-text);
  border: 1px solid
    ${({ $variant }) => {
      if ($variant === "critical") return "var(--color-error)";
      if ($variant === "accent") return "var(--color-accent)";
      if ($variant === "success") return "var(--color-success)";
      return "var(--color-primary)";
    }};
`;

const ResourceName = styled.span`
  font-family: var(--font-family);
  font-size: 0.85rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
`;

const BelieveYouText = styled.h2`
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
`;

const InfoHeader = styled.div`
  background-color: var(--color-severity-critical);
  padding: 48px 24px;
  text-align: left;
  margin: -24px -24px 0 -24px;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    align-items: start;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const IconBox = styled.div`
  background-color: ${({ $bgColor }) => $bgColor};
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--color-accent);
  flex-shrink: 0;
`;
