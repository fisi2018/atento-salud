import { useEffect, useState } from "react";
import LayoutUser from "../../../components/layout/LayoutUser";
import { API } from "../../../consts/api";

export default function Medicos(){
    const[doctores,setDoctores]=useState([]);
    const fetchData=async()=>{
        try{
    const response=await fetch(`${API}doctor`);
    const doctores=await response.json();
    setDoctores(doctores);
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
            <h1 className="mb-3">Lista de médicos</h1>
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
            <div>

            <table className=" table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Código</th>
                  <th scope="col">Nombres</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Teléfono de contacto</th>
                  <th scope="col">Email de contacto</th>
                </tr>
              </thead>
              <tbody>
                {doctores.map((doctor,index)=>(
                  <tr key={doctor._id} >
                      <th scope="row">{index+1}</th>
                      <td>{doctor.codeDoctor}</td>
                      <td>{doctor.nombres}</td>
                      <td>{doctor.apellidos}</td>
                      <td>{doctor.phone}</td>
                      <td>{doctor.email}</td>
                
                  </tr>
                ))}
                
              </tbody>
            </table>
            </div>
          </div>
        </div>
            <style jsx >{`
            .admin-main{
                padding:1rem;
            }
            `}</style>
        </LayoutUser>
    )
}
/*export async function getServerSideProps(){
    try{
    const response=await fetch("https://atento-salud.vercel.app/api/doctor");
    const doctores=await response.json();
    return{
      props:{
        doctores
      }
    }
  }catch(err){
    console.log("error ",err);
    return{
      props:{
        message:"Error ocurrido en el SSR",
        error:true
      }
    }
  }
}*/