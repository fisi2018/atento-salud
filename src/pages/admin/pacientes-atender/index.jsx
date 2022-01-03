import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";

export default function PacientesAtender() {
  const [pacientes, setPacientes] = useState([]);
  const fetchData=async()=>{
    try{
    const response=await fetch(`${API}paciente`);
    const pacientes=await response.json();
    console.log(pacientes);
      setPacientes(pacientes);
  }catch(err){
    console.log("error ",err);
    
  }
  }
  useEffect(()=>{
    fetchData();
  },[]);
  return (
  
    <LayoutAdmin>
      <section>

        <div className="admin-main">
          <div className="d-flex w-100 flex-column justify-content-center align-items-center">
            <h1 className="mb-3">Lista de pacientes </h1>
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
                  <th scope="col">Nombres</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Código</th>
                  <th scope="col">Doctor</th>
                  <th scope="col">Enfermedad</th>
                  <th scope="col">DNI</th>
                  <th scope="col" >Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((paciente,index)=>(
                  <tr key={paciente._id} >
                    <th scope="row" >{index+1}</th>
                    <td>{paciente.codAsegurado.nombres}</td>
                    <td>{paciente.codAsegurado.apellidos}</td>
                    <td>{paciente.codAsegurado.codAsegurado}</td>
                    <td>{paciente.doctor.nombres} {paciente.doctor.apellidos}</td>
                    <td>{paciente.codEnfermedad.nombreEnfermedad}</td>
                    <td>{paciente.codAsegurado.dni}</td>
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
      </section>
        <style jsx>{`
        td>button{
          background-color:transparent;
          color:white;
          border:0;
        }
        section{
          padding:1rem;
        }
        table{
          overflow:auto;
        }
        `}</style>
    </LayoutAdmin>
      
  );
}
/*export async function getServerSideProps(){
  try{
    const response=await fetch("https://atento-salud.vercel.app/api/paciente");
    const pacientes=await response.json();
    return{
      props:{
        pacientes
      }
    }
  }catch(err){
    console.log("error ",err);
    return{
      props:{
        message:"Ha ocurrido un error en el SSR",
        error:true
      }
    }
  }
}*/