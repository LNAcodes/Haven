// pages/info/index.js

import styled from "styled-components";
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
        <SectionTitle style={{ color: "#312e81", fontSize: "1.1rem" }}>
          We are here for you.
        </SectionTitle>
        <EmergencyInfoBox style={{ color: "#3730a3", marginTop: "8px" }}>
          If something happened to you — whether online or in person — you
          deserve to be heard and supported. Reach out.
        </EmergencyInfoBox>
        <BelieveYouText>We believe you.</BelieveYouText>
      </YouAreNotAloneSection>

      <CardsContainer>
        <InfoSection $borderColor="#B5747E">
          <CardHeader>
            <IconBox $bgColor="#FDF2F4" $iconColor="#B5747E">
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

        <InfoSection $borderColor="#7D4E8C">
          <CardHeader>
            <IconBox $bgColor="#FAF5FF" $iconColor="#7D4E8C">
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

        <InfoSection $borderColor="#3A7CA5">
          <CardHeader>
            <IconBox $bgColor="#EAF4FB" $iconColor="#3A7CA5">
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
        <SectionTitle style={{ color: "#312e81", fontSize: "1.1rem" }}>
          You are not alone.
        </SectionTitle>
        <EmergencyInfoBox style={{ color: "#3730a3", marginTop: "8px" }}>
          What happened to you is not okay, and it is not your fault. You
          deserve support. Talking to a trusted adult — a teacher, family
          member, or counselor — can make a real difference.
        </EmergencyInfoBox>
      </YouAreNotAloneSectionBottom>
    </InfoContainer>
  );
}

export { requireAuth as getServerSideProps } from "@/lib/auth/requireAuth";

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
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 3px solid ${({ $borderColor }) => $borderColor};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  line-height: 1.3;
`;

const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ResourceItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;

  & + & {
    border-top: 1px solid #f0f0f0;
  }
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
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
`;

const YouAreNotAloneSection = styled.div`
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  padding: 32px 24px;
  margin: 0 -24px;
  text-align: left;
  border-bottom: 1px solid #c7d2fe;
`;

const YouAreNotAloneSectionBottom = styled.div`
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  padding: 32px 24px;
  margin: 0 -24px;
  text-align: left;
  border-top: 1px solid #c7d2fe;

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
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  min-height: 44px;
  padding: 0 14px;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  transition: filter 0.15s ease;

  background-color: ${({ $variant }) => {
    if ($variant === "critical") return "#FDF2F4";
    if ($variant === "accent") return "#FAF5FF";
    if ($variant === "success") return "#EAF4FB";
    return "#EAF4FB";
  }};
  color: ${({ $variant }) => {
    if ($variant === "critical") return "#7A2D3A";
    if ($variant === "accent") return "#6B21A8";
    if ($variant === "success") return "#1E5F85";
    return "#1E5F85";
  }};
  border: 1px solid
    ${({ $variant }) => {
      if ($variant === "critical") return "#E8B4BB";
      if ($variant === "accent") return "#E9D5FF";
      if ($variant === "success") return "#A8D5EE";
      return "#A8D5EE";
    }};

  &:hover {
    filter: brightness(0.96);
  }
`;

const ResourceName = styled.span`
  font-family: var(--font-family);
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
`;

const BelieveYouText = styled.p`
  font-family: var(--font-family);
  font-size: 0.95rem;
  font-weight: var(--font-weight-semibold);
  color: #4338ca;
  margin-top: 4px;
`;

const InfoHeader = styled.div`
  background-color: var(--color-header);
  padding: 48px 24px;
  text-align: left;
  margin: -24px -24px 0 -24px;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 24px 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    align-items: start;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 4px;
`;

const IconBox = styled.div`
  background-color: ${({ $bgColor }) => $bgColor};
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: ${({ $iconColor }) => $iconColor || "var(--color-accent)"};
  flex-shrink: 0;
`;
