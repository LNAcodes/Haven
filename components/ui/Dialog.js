// components/ui/Dialog.js

import styled from "styled-components";
import Button from "@/components/ui/Button";

export default function Dialog({
  onConfirm,
  onCancel,
  showDialog,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  if (!showDialog) return null;

  return (
    <Overlay>
      <DialogBox>
        <DialogMessage>{message}</DialogMessage>
        <ButtonGroup>
          <Button variant="back" onClick={onCancel} fullWidth>
            {cancelText}
          </Button>
          <Button variant="delete" onClick={onConfirm} fullWidth>
            {confirmText}
          </Button>
        </ButtonGroup>
      </DialogBox>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const DialogBox = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 320px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DialogMessage = styled.p`
  font-family: var(--font-family);
  font-size: 1rem;
  color: var(--color-text);
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;
