import "../css/tailwind.css";
import "../css/main.css";

import { Analytics } from "@vercel/analytics/react";
import { SWUpdatePopup } from "@/components/SWUpdatePopup";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <SWUpdatePopup />
      <Analytics />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
