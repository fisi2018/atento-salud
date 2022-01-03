import { useEffect, useState } from "react";
import Adminside from "../../../components/AdminSide";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";

export default function Camas() {
  const [camas,setCamas]=useState([]);
  const fetchData=async()=>{
    try{
    const response=await fetch(`${API}cama`);
    const camas=await response.json();
    setCamas(camas);
    console.log("repsonse ",camas);
    
  }catch(err){
    console.log("error ",err);
    
  }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
  
    <LayoutAdmin>

        <div className="admin-main">
          <div className="d-flex w-100 flex-column justify-content-center align-items-center">
            <h1 className="mb-3">Camas para internarse</h1>
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
                  <th scope="col">Nombre del paciente</th>
                  <th scope="col">Código de la cama</th>
                  <th scope="col">Disponibilidad</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {camas.map((cama,index)=>(
                  <tr key={cama._id} >
                      <th scope="row" >{index+1}</th>
                      <td>{cama.nombrePaciente.codAsegurado}</td>
                      <td>{cama.codeCama}</td>
                      <td>{cama.estadoCama?"Ocupada":"Libre"}</td>
                      <td>
                        <button>
                          <i className="fas fa-edit" ></i>
                        </button>
                        <button>
                          <i className="fas fa-trash-alt" ></i>
                        </button>
                      </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>
        <style jsx>{`
        td>button{
          background-color:transparent;
          color:white;
          border:0;
        }
        .admin-main{
          padding:1rem;
        }
        `}</style>
    </LayoutAdmin>
     
  );
}
/*export async function getServerSideProps(){
  try{
    const response=await fetch("https://atento-salud.vercel.app/api/cama");
    const camas=await response.json();
    console.log("repsonse ",camas);
    return{
      props:{
        camas
      }
    }
  }catch(err){
    console.log("error ",err);
    return{
      props:{
        error:err,
        message:"Ha ocurrido un error durante el SSR "
      }
    }
  }
}*/