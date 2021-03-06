import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";
import {useForm} from "../../../components/hooks/useForm";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import Loader from "./../../../components/Loader";
import Link from "next/link";

export default function Enfermedades() {
  const [enfermedades, setEnfermedades] = useState(false);
  const [loading,setLoading]=useState(false);
  const {form,setForm,handleChange}=useForm({
    visibility:false,
    id:"",
    codeEnfermedad:"",
    nombreEnfermedad:""
  });
  
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
  },[]);
  const update=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const response=await axios.put(`${API}enfermedad/updateEnfermedad`,{id:form.id,codeEnfermedad:form.codeEnfermedad,nombreEnfermedad:form.nombreEnfermedad});
      const data=await response.data;
      setLoading(false);
      console.log("response ",data);
      data.error?toast.error(data.message):toast.success(data.message);
      await fetchData();
    }catch(err){
      setLoading(false);
      toast.error("Ha ocurrido un error en el servidor, vuelva a intentarlo más tarde")
      console.log("error ",err);
    }
  }
  const removeItem=async(id)=>{
    try{
      const response=await axios.post(`${API}enfermedad/removeEnfermedad`,{id});
      const data=await response.data;
      console.log("message ",data);
      if(data.error){
        toast.error(data.message)
      }else{
        toast.success(data.message);
        await fetchData();
      }
    }catch(err){
      toast.error("Ha ocurrido un error en el servidor, vuelva a intentarlo más tarde");
      console.log("error ",err);
    }
  }
  return (
    <LayoutAdmin>
      <Toaster/>
      <section>
          <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item">
      <Link href="/admin" >
      <a >Inicio</a>
      </Link>
      </li>
    <li className="breadcrumb-item active" aria-current="page">Enfermedades</li>
  </ol>
</nav>
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
              {enfermedades &&
              enfermedades.map((enfermedad,index)=>(
                <tr key={enfermedad._id}>
                  <th scope="row" >{index+1}</th>
                  <td>{enfermedad.nombreEnfermedad}</td>
                  <td>{enfermedad.codeEnfermedad}</td>
                  <td>
                    <button onClick={()=>setForm({...form,visibility:true,id:enfermedad._id,nombreEnfermedad:enfermedad.nombreEnfermedad,codeEnfermedad:enfermedad.codeEnfermedad})
                    } ><i className="fas fa-edit" ></i></button>
                    <button onClick={()=>removeItem(enfermedad._id)} ><i className="fas fa-trash-alt"></i></button>
                  </td>
                  
                </tr>
              ))}
                
              </tbody>
            </table>
            {!enfermedades && <Loader/> }
            {form.visibility && 
            <form onSubmit={update} >
              <h2>Editar enfermedad</h2>
              <div className="form-floating">
              <input className="form-control" onChange={handleChange} name="codeEnfermedad" value={form.codeEnfermedad} placeholder="Código de la enfermedad" type="text" />
                <label  htmlFor="codeEnfermedad">Código de la enfermedad</label></div>
              <div className="form-floating">
              <input className="form-control" onChange={handleChange} name="nombreEnfermedad" value={form.nombreEnfermedad} placeholder="Nombre de la enfermedad" type="text" />
                <label htmlFor="nombreEnfermedad">Nombre de la enfermedad</label></div>
              <article>
                {loading?<Loader/>:
                <>
              <button className="btn btn-danger" onClick={()=>setForm({...form,visibility:false})}>Cancelar</button>
              <button type="submit" className="btn btn-primary" >Guardar cambios</button>
                </>
                }
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
      .form-floating{
        margin:0.5rem 0;
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
/*export async function getServerSideProps(){
  try{
        await dbConnect();
        const response=await EnfermedadModel.find({});
        console.log("response ",response);
        const enfermedades=response.map(doc=>{
          const enfermedad=doc.toObject()
          enfermedad._id=enfermedad._id.toString()
          enfermedad.createdAt=enfermedad.createdAt.toString()
          enfermedad.updatedAt=enfermedad.updatedAt.toString()
          return enfermedad
        });
      console.log("enfermedades ",enfermedades);
        return{
          props:{
            enfermedades
          }
        }
    }catch(err){
        console.log("error en request ",err);
        return{
          props:{
            message:"Error en el SSR",
            error:true
          }
        }
    }
}*/