// pages/settings/index.js

import { useState } from "react";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Message from "@/components/ui/Message";

export default function SettingsPage({ initialEmail }) {
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState(null); // "success" | "error"

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    const res = await fetch("/api/user/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trustedContactEmail: email }),
    });

    setStatus(res.ok ? "success" : "error");
  }

  return (
    <Container>
      <PageHeader>Settings</PageHeader>

      {status === "success" && (
        <Message type="success" dismissible onClose={() => setStatus(null)}>
          Trusted contact saved.
        </Message>
      )}
      {status === "error" && (
        <Message type="error" dismissible onClose={() => setStatus(null)}>
          Could not save. Please try again.
        </Message>
      )}

      <Section>
        <SectionTitle>Trusted contact</SectionTitle>
        <SectionDescription>
          If you trigger the emergency exit, your records will be emailed to
          this address before being deleted. Use someone you trust completely.
        </SectionDescription>

        <Form onSubmit={handleSubmit}>
          <Label htmlFor="trustedContactEmail">Email address</Label>
          <Input
            id="trustedContactEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="trusted@example.com"
            autoComplete="email"
          />
          <Button type="submit" variant="action">
            Save
          </Button>
        </Form>

        {email && (
          <CurrentEmail>
            Currently set to: <strong>{email}</strong>
          </CurrentEmail>
        )}
      </Section>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  // Fetch the current setting server-side so the form pre-populates
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  let initialEmail = "";

  try {
    const res = await fetch(`${baseUrl}/api/user/settings`, {
      headers: { cookie: context.req.headers.cookie || "" },
    });
    if (res.ok) {
      const data = await res.json();
      initialEmail = data.trustedContactEmail ?? "";
    }
  } catch (_err) {
    // Non-fatal — form just starts empty
  }

  return { props: { initialEmail } };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
`;

const SectionDescription = styled.p`
  font-size: 0.9rem;
  color: var(--color-text);
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
`;

const Input = styled.input`
  font-family: var(--font-family);
  font-size: 1rem;
  min-height: 48px;
  padding: 0 12px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  background-color: white;
  color: var(--color-text);
  width: 100%;

  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`;

const CurrentEmail = styled.p`
  font-size: 0.85rem;
  color: var(--color-text);
`;
