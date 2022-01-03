import Adminside from "../../../components/AdminSide";

export default function Familiares() {
  return (
    <>
      <div className="admin-content">
        <Adminside></Adminside>
        <div className="admin-main">
          <div className="d-flex w-100 flex-column justify-content-center align-items-center">
            <h1 className="mb-3">Familiares Asegurados</h1>
            <div className="input-group px-5 mb-5">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                aria-label="Buscar..."
                aria-describedby="button-addon2"
              />
              <button className="btn btn-dark" type="button" id="button-addon2">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Código</th>
                  <th scope="col">Familiar</th>
                  <th scope="col">Detalles</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Dirección</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">0001</th>
                  <td>María Sanchez</td>
                  <td>SIH_5416351</td>
                  <td>Esposo</td>
                  <td>Ver Detalles</td>
                  <td>999 999 999</td>
                  <td>Ver dirección</td>
                </tr>
                <tr>
                  <th scope="row">0002</th>
                  <td>George Estrada</td>
                  <td>SIH_5416351</td>
                  <td>Hijo</td>
                  <td>Ver Detalles</td>
                  <td>999 999 999</td>
                  <td>Ver dirección</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
