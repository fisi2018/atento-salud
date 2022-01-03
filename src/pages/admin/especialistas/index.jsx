import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";

export default function Especialistas() {
  const [doctores, setDoctores] = useState([]);
  const fetchData=async()=>{
    try{
    const response=await fetch(`${API}doctor`);
    const doctors=await response.json();
    console.log(doctors);
    setDoctores(doctors);
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
                  <th scope="col">DNI</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Email</th>
                
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {doctores.map((doctor,index)=>(
                  <tr key={doctor._id} >
                      <th scope="row">{index+1}</th>
                      <td>{doctor.codeDoctor}</td>
                      <td>{doctor.nombres}</td>
                      <td>{doctor.apellidos}</td>
                      <td>{doctor.dni}</td>
                      <td>{doctor.phone}</td>
                      <td>{doctor.email}</td>
                   
                      <td>
                        <button>
                          <i className="fas fa-edit"></i>
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
        </div>
      </section>
      <style jsx>{`
      td>button{
        background-color:transparent;
        color:white;
        border:0;
        cursor:pointer;
      }
      table{
        overflow:auto;
   
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
} */