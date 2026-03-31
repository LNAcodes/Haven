// pages/_app.js

import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import styled from "styled-components";
import Footer from "@/components/Footer/Footer";
import PanicButton from "@/components/PanicButton/PanicButton";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const fetcher = async (url) => {
  const fetchResponse = await fetch(url);

  if (!fetchResponse.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await fetchResponse.json();
    error.status = fetchResponse.status;
    throw error;
  }

  return fetchResponse.json();
};

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const { status } = useSession();
  const isLoginPage = router.pathname === "/login";
  const isWelcomePage = router.pathname === "/";

  return (
    <Wrapper>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <PageContainer>
          <Main>
            <Component {...pageProps} />
          </Main>
          {!isLoginPage && <Footer />}
        </PageContainer>
        {status === "authenticated" && <PanicButton />}
        {status === "authenticated" && !isLoginPage && (
          <SettingsLink
            href="/settings"
            aria-label="Settings"
            $onLight={isWelcomePage}
          >
            <FontAwesomeIcon icon={faCog} />
          </SettingsLink>
        )}
      </SWRConfig>
    </Wrapper>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

const PageContainer = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SettingsLink = styled(Link)`
  position: fixed;
  top: 16px;
  right: 16px;
  font-size: 1.4rem;
  color: ${({ $onLight }) =>
    $onLight ? "var(--color-accent)" : "var(--color-button-text)"};
  opacity: 0.5;
  text-decoration: none;
  z-index: 10;

  &:hover,
  &:focus-visible {
    opacity: 0.9;
  }
`;
