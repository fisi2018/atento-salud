import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";

export default function Enfermedades() {
  const [enfermedades, setEnfermedades] = useState([]);
  const fetchData=async()=>{
      try{
    const response=await fetch(`${API}enfermedad`);
    const enfermedades=await response.json();
    console.log(enfermedades);
    setEnfermedades(enfermedades);
  }catch(err){
    console.log("error ",err);
    
    
  }
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <LayoutAdmin>
      <section>

        <div className="admin-main">
          <div className="d-flex w-100 flex-column justify-content-center align-items-center">
            <h1 className="mb-3">Enfermedades a atender</h1>
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
                  <th scope="col">Nombre de enfermedad</th>
                  <th scope="col">Código de enfermedad</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
              {enfermedades.map((enfermedad,index)=>(
                <tr key={enfermedad._id}>
                  <th scope="row" >{index+1}</th>
                  <td>{enfermedad.nombreEnfermedad}</td>
                  <td>{enfermedad.codeEnfermedad}</td>
                  <td>
                    <button><i className="fas fa-edit" ></i></button>
                    <button><i className="fas fa-trash-alt"></i></button>
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
      `}</style>
    </LayoutAdmin>
      
  );
}
/*export async function getServerSideProps(){
  try{
    const response=await fetch("https://atento-salud.vercel.app/api/enfermedad");
    const enfermedades=await response.json();
    return{
      props:{
        enfermedades
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