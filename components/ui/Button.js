// components/ui/Button.js

import styled from "styled-components";

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "action",
  fullWidth = false,
  ...props
}) {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      disabled={disabled}
      $variant={variant}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  font-family: var(--font-family);
  font-size: ${({ $variant }) => {
    if ($variant === "icon") return "1rem";
    if ($variant === "testing") return "0.85rem";
    return "1rem";
  }};
  font-weight: ${({ $variant }) =>
    $variant === "testing"
      ? "var(--font-weight-regular)"
      : "var(--font-weight-medium)"};
  min-height: 44px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "fit-content")};
  background-color: ${({ $variant }) => {
    if ($variant === "action") return "var(--color-accent)";
    if ($variant === "back") return "transparent";
    if ($variant === "delete") return "var(--color-background)";
    if ($variant === "icon") return "transparent";
    if ($variant === "testing") return "transparent";
    return "var(--color-accent)";
  }};
  color: ${({ $variant }) => {
    if ($variant === "action") return "var(--color-button-text)";
    if ($variant === "back") return "var(--color-text)";
    if ($variant === "icon") return "var(--color-accent)";
    if ($variant === "testing") return "var(--color-accent)";
    if ($variant === "delete") return "var(--color-text)";
    return "var(--color-button-text)";
  }};
  border: ${({ $variant }) => {
    if ($variant === "back") return "1.5px solid rgba(45, 42, 74, 0.35)";
    if ($variant === "testing") return "1px solid var(--color-accent)";
    return "none";
  }};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;
