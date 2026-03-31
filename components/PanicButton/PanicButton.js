// components/PanicButton/PanicButton.js

import { useState } from "react";
import styled from "styled-components";
import { signOut } from "next-auth/react";

export default function PanicButton() {
  const [triggered, setTriggered] = useState(false);

  async function handlePanic() {
    if (triggered) return;
    setTriggered(true);

    try {
      await fetch("/api/panic", { method: "POST" });
    } catch (_err) {
      // Network failure must never trap the user — continue regardless
    }

    await signOut({ redirect: false });
    window.location.href = "https://www.youtube.com";
  }

  return (
    <FloatingButton
      onClick={handlePanic}
      disabled={triggered}
      aria-label="Emergency exit"
      title="Emergency exit"
    />
  );
}

const FloatingButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--color-accent);
  background-color: transparent;
  cursor: pointer;
  z-index: 500;
  padding: 0;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 0.25)};
  transition: opacity 0.2s ease;

  &:hover,
  &:focus-visible {
    opacity: 0.7;
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  &:active {
    opacity: 1;
  }
`;
