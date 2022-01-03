import { useRouter } from "next/router";

const Navbar = () => {
  const {push}=useRouter();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Atención Hospitalaria Vida
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#id">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#aboutus">
                  Acerca de Nosotros
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#aboutus">
                  Nuestros Sericios
                </a>
              </li>
            </ul>
            <div className="navbar-text">
              <button onClick={()=>push("/login")} className="btn btn-danger me-3">Iniciar Sesión</button>
              <button onClick={()=>push("/register")} className="btn btn-danger">Registrate</button>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>
        {`
          nav {
            background-color: white;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
