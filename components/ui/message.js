// components/ui/message.js

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button";

export default function Message({
  type = "info",
  children,
  onClose,
  dismissible = false,
}) {
  return (
    <Overlay>
      <MessageBox
        $type={type}
        role={type === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        <MessageIcon $type={type}>
          {type === "success" && <FontAwesomeIcon icon={faCheck} />}
          {type === "error" && <FontAwesomeIcon icon={faXmark} />}
          {type === "info" && <FontAwesomeIcon icon={faCircleInfo} />}
        </MessageIcon>
        <MessageText>{children}</MessageText>
        {dismissible && onClose ? (
          <Button variant="icon" onClick={onClose} aria-label="Close message">
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        ) : null}
      </MessageBox>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

const MessageBox = styled.div`
  background-color: ${({ $type }) => {
    if ($type === "success") return "var(--color-success-bg)";
    if ($type === "error") return "var(--color-error-bg)";
    return "white";
  }};
  border-radius: 8px;
  padding: 24px;
  max-width: 320px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  border-top: 4px solid
    ${({ $type }) => {
      if ($type === "success") return "var(--color-success)";
      if ($type === "error") return "var(--color-error)";
      return "var(--color-primary)";
    }};
`;

const MessageIcon = styled.span`
  font-size: 1.5rem;
  color: ${({ $type }) => {
    if ($type === "success") return "var(--color-success)";
    if ($type === "error") return "var(--color-error)";
    return "var(--color-primary)";
  }};
`;

const MessageText = styled.p`
  font-family: var(--font-family);
  font-size: 1rem;
  color: var(--color-text);
`;
