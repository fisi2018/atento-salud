import "bootstrap/dist/css/bootstrap.css";

import("bootstrap/dist/js/bootstrap")
import("@fortawesome/fontawesome-free/js/brands")
import("@fortawesome/fontawesome-free/js/solid")
import("@fortawesome/fontawesome-free/js/fontawesome")

function MyApp({ Component, pageProps }) {
 
  return (
      <Component {...pageProps} />
  );
}

export default MyApp;
