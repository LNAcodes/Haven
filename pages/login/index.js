// pages/login/index.js

import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

  return (
    <LoginContainer>
      <TopSection>
        <AppLabel>Haven</AppLabel>
        <Tagline>A place just for you.</Tagline>
      </TopSection>
      <BottomSection>
        <ButtonContainer>
          <Button variant="action" fullWidth onClick={() => signIn("github")}>
            <FontAwesomeIcon icon={faGithub} />
            Login with Github
          </Button>
          <Button
            variant="testing"
            fullWidth
            onClick={() => setShowForm(true)}
          >
            Login for Testing
          </Button>

          {showForm ? (
            <CredentialsForm
              onSubmit={(event) => {
                event.preventDefault();
                signIn("credentials", { username, password });
              }}
            >
              <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="username"
              />
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="password"
              />
              <Button
                variant="action"
                type="submit"
                fullWidth
                onClick={() => signIn("credentials", { username, password })}
              >
                Submit
              </Button>
            </CredentialsForm>
          ) : null}
        </ButtonContainer>
      </BottomSection>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - 24px);
  margin: -24px -24px -88px -24px;
`;

const TopSection = styled.div`
  background-color: var(--color-header);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 48px 32px 52px 32px;
`;

const AppLabel = styled.span`
  display: block;
  font-family: var(--font-family);
  font-size: 0.7rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 20px;
`;

const Tagline = styled.p`
  font-family: var(--font-family);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 12px;
  line-height: 1.6;
`;

const BottomSection = styled.div`
  background-color: var(--color-background);
  padding: 40px 32px 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  font-family: var(--font-family);
  font-size: 1rem;
  padding: 8px 12px;
  min-height: 48px;
  border: 1px solid rgba(45, 42, 74, 0.2);
  border-radius: 4px;
  color: var(--color-text);
  background-color: var(--color-background);
  width: 100%;
  box-sizing: border-box;
`;

const CredentialsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  align-items: stretch;
`;
