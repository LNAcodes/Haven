// pages/_app.js

import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import styled from "styled-components";

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
          <Component {...pageProps} />
        </PageContainer>
      </SWRConfig>
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 24px;
`;
