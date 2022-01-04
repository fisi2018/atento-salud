import "bootstrap/dist/css/bootstrap.css"
import { useEffect } from "react"
import("bootstrap/dist/js/bootstrap")
import("@fortawesome/fontawesome-free/js/brands")
import("@fortawesome/fontawesome-free/js/solid")
import("@fortawesome/fontawesome-free/js/fontawesome")

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    typeof document !== undefined ? require("bootstrap/dist/js/bootstrap") : null;
  }, []);
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>
        {`
          .user-content {
            text-align: center;
            display: grid;
            grid-template-columns: 25% 1fr;
            grid-template-rows: 1fr;
            width: 100%;
            height: 100vh;
          }
          .user-content .user-main {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10vh 10%;
          }
          
          .admin-content {
            text-align: center;
            display: grid;
            grid-template-columns: 8% 1fr;
            grid-template-rows: 1fr;
            width: 100%;
            height: 100vh;
          }
          .admin-content .admin-main {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10vh 10%;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
