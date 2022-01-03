import { useEffect, useState } from "react";
import LayoutUser from "../../../components/layout/LayoutUser";
import { API } from "../../../consts/api";

export default function Enfermedades(){
    const [enfermedades, setEnfermedades] = useState([]);
    const fetchData=async()=>{
        try{
    const response=await fetch(`${API}enfermedad`);
    const enfermedades=await response.json();
    setEnfermedades(enfermedades);
    
  }catch(err){
    console.log("error ",err);
    
  }
    }
    useEffect(()=>{
        fetchData();
    },[]);
    return(
        <LayoutUser>
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
                </tr>
              </thead>
              <tbody>
              {enfermedades.map((enfermedad,index)=>(
                <tr key={enfermedad._id}>
                  <th scope="row" >{index+1}</th>
                  <td>{enfermedad.nombreEnfermedad}</td>
                  <td>{enfermedad.codeEnfermedad}</td>
                  
                </tr>
              ))}
                
              </tbody>
            </table>
          </div>
        </div>
            <style jsx>{`
            .admin-main{
                padding:1rem;
            }
            `}</style>
        </LayoutUser>
    )
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