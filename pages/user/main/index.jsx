
import { useRouter } from "next/router";
import { useEffect } from "react";
import LayoutUser from "../../../components/layout/LayoutUser";

export default function Main() {
  const {pathname,push}=useRouter();
  
  return (
    <LayoutUser>
        <section>

        <div className="user-main">
          <div className="main-content d-flex flex-column justify-content-center align-items-center">
            <h1 className="mb-5">Sistema hospitalario</h1>
            <div className="img mb-5"></div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                aria-label="Buscar..."
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-dark"
                type="button"
                id="button-addon2"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        </section>
      <style jsx>
        {`
        section{
          padding:1rem;
        }
          .img {
            background-image: url("https://emojigraph.org/media/facebook/stethoscope_1fa7a.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            width: 10rem;
            height: 10rem;
          }
        `}
      </style>
    </LayoutUser>
  );
}
