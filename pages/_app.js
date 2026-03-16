// pages/_app.js

import GlobalStyle from "../styles";
import { SWRConfig } from "swr";

const fetcher = async (url) => {
  const fetchResponse = await fetch(url);

  if (!fetchResponse.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await fetchResponse.json();
    error.status = fetchResponse.status;
    throw error;
  }

  return res.json();
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
