// pages/_app.js

import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import styled from "styled-components";
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

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

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  return (
    <SessionProvider session={pageProps.session}>
      <Wrapper>
        <SWRConfig value={{ fetcher }}>
          <GlobalStyle />
          <PageContainer>
            <Main>
              <Component {...pageProps} />
            </Main>
            {!isLoginPage && <Footer />}
          </PageContainer>
        </SWRConfig>
      </Wrapper>
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
