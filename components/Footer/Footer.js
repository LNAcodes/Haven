// components/Footer/Footer.js
import Navbar from "@/components/Navbar/Navbar";
import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <Navbar />
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  margin: 0 -24px;
  background-color: white;
`;
