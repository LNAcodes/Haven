// components/ConfirmationDialog/ConfirmationDialog.js

import styled from "styled-components";

export default function ConfirmationDialog({ onConfirm, onCancel }) {
  return (
    <Overlay>
      <Dialog>
        <Message>Delete this incident? This cannot be undone.</Message>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <DeleteButton onClick={onConfirm}>Delete</DeleteButton>
        </ButtonGroup>
      </Dialog>
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

const Dialog = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 320px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Message = styled.p`
  font-family: var(--font-family);
  font-size: 1rem;
  color: var(--color-text);
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const CancelButton = styled.button`
  font-family: var(--font-family);
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
  min-height: 44px;
  padding: 0 16px;
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-text);
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
`;

const DeleteButton = styled.button`
  font-family: var(--font-family);
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
  min-height: 44px;
  padding: 0 16px;
  background-color: var(--color-error);
  color: var(--color-button-text);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
`;
