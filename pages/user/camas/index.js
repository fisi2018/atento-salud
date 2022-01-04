import { useEffect, useState } from "react";
import LayoutUser from "../../../components/layout/LayoutUser";
import { API } from "../../../consts/api";

export default function Camas(){
    const [camas, setCamas] = useState([]);
    const fetchData=async()=>{
        try{
    const response=await fetch(`${API}cama`);
    const camas=await response.json();
    console.log("repsonse ",camas);
    setCamas(camas);
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
                  <th scope="col">Fecha de inicio de uso</th>
                  <th scope="col">Código de la cama</th>
                  <th scope="col">Disponibilidad</th>
                  
                </tr>
              </thead>
              <tbody>
                {camas.map((cama,index)=>(
                  <tr key={cama._id} >
                      <th scope="row" >{index+1}</th>
                      <td>{cama.nombrePaciente.fecha}</td>
                      <td>{cama.codeCama}</td>
                      <td>{cama.estadoCama?"Ocupada":"Libre"}</td>
                      
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
        error:true,
        message:"Ha ocurrido un error durante el SSR "
      }
    }
  }
}*/