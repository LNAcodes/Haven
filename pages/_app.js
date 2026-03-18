// pages/_app.js

import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import styled from "styled-components";
import Footer from "@/components/Footer/Footer";

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
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <PageContainer>
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer />
        </PageContainer>
      </SWRConfig>
    </>
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
