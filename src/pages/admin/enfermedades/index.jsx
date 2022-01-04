import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";
import {useForm} from "../../../components/hooks/useForm";
export default function Enfermedades({enfermedades}) {
  //const [enfermedades, setEnfermedades] = useState([]);
  const {form,setForm,handleChange}=useForm({
    visibility:false,
    codeEnfermedad:"",
    nombreEnfermedad:""
  });
  
  /*const fetchData=async()=>{
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
  },[])*/
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
                    <button onClick={()=>setForm({...form,visibility:true,nombreEnfermedad:enfermedad.nombreEnfermedad,codeEnfermedad:enfermedad.codeEnfermedad})
                    } ><i className="fas fa-edit" ></i></button>
                    <button><i className="fas fa-trash-alt"></i></button>
                  </td>
                  
                </tr>
              ))}
                
              </tbody>
            </table>
            {form.visibility && 
            <form>
              <h2>Editar enfermedad</h2>
              <input onChange={handleChange} name="codeEnfermedad" value={form.codeEnfermedad} placeholder="Código de la enfermedad" type="text" />
              <input onChange={handleChange} name="nombreEnfermedad" value={form.nombreEnfermedad} placeholder="Nombre de la enfermedad" type="text" />
              <article>
              <button className="btn btn-danger" onClick={()=>setForm({...form,visibility:false})}>Cancelar</button>
              <button className="btn btn-primary" >Guardar cambios</button>
              </article>
            </form>
            }
          </div>
        </div>
      </section>
      <style jsx>{`
      h2{
        font-weight:lighter;
        text-align:center;
      }
      form{
        box-shadow:0 0.5rem 1.5rem rgba(0,0,0,0.2);
        display:flex;
        flex-direction:column;
        padding:2rem;
      }
      form>input{
        margin:0.5rem;
        border-radius:0.5rem;
        width:20rem;
        padding:0.5rem;
        border:0.1rem solid rgba(0,0,0,0.2);
      }
      td>button{
        background-color:transparent;
        color:white;
        border:0;
      }
      article{
        display:flex;
        justify-content:space-around;
      }
      section{
        padding:1rem;
      }
      `}</style>
    </LayoutAdmin>
      
  );
}
export async function getServerSideProps(){
  try{
    const response=await fetch(`${API}enfermedad`);
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
}