import axios from "axios";
import { useEffect, useState } from "react";
import Adminside from "../../../components/AdminSide";
import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";
import Loader from "./../../../components/Loader";
import toast,{Toaster} from "react-hot-toast";
export default function Camas() {
  const [camas,setCamas]=useState(false);
  const [loading,setLoading]=useState(false);
  const [pacientes,setPacientes]=useState([]);
  const{form,setForm,handleChange}=useForm({
    visibility:false
  });
 console.log("form ",form);
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
  const fetchGroup=async()=>{
    await fetchSelectData();
   await fetchData();
  }
  useEffect(() => {
    fetchGroup();
  }, []);
  const getPaciente=(id)=>{
    const paciente=pacientes.find((paciente)=>{
    if(paciente.codAsegurado._id===id)return true
    });
    return paciente
  }
  const fetchSelectData=async()=>{
    try{
        const response=await fetch(`${API}paciente`);
        const pacientes=await response.json();
        console.log("pacientes ",pacientes);
        setPacientes(pacientes);
        
    }catch(err){
        console.log("error ",err);
        
    }
  }
  const update=async()=>{
    setLoading(true);
    try{
     const dataFormat=form.estadoCama?{
       estadoCama:true
     }:{
       estadoCama:false,
       nombrePaciente:""
     }
      const response=await axios.put(`${API}cama/updateCama`,{...form,...dataFormat});
      const data=await response.data;
      setLoading(false);
      console.log("response ",data);
      data.error?toast.error(data.message):toast.success(data.message);
      await fetchData();
    }catch(err){
      setLoading(false);
      toast.error("Ha ocurrido un error en el servidor, vuelva a intentarlo más tarde");
      console.log("error ",err);
    }
  }
  const removeItem=async(id)=>{
    try{
      const response=await axios.post(`${API}cama/removeCama`,{id});
      const data=await response.data;
      data.error?toast.error(data.message):toast.success(data.message);
      console.log("message ",data);
      await fetchData();
    }catch(err){
      console.log("error ",err);
      toast.error("Ha ocurrido un error en el servidor, vuelva a intentarlo más tarde");
    }
  }
  
  return (
  
    <LayoutAdmin>
      <Toaster/>
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
                {camas &&
                camas.map((cama,index)=>(
                  <tr key={cama._id} >
                      <th scope="row" >{index+1}</th>
                      {cama.nombrePaciente?
                      <td>{getPaciente(cama.nombrePaciente.codAsegurado).codAsegurado.nombres} {getPaciente(cama.nombrePaciente.codAsegurado).codAsegurado.apellidos}</td>
                      :
                      <td>Sin paciente</td>
                      }
                      <td>{cama.codeCama}</td>
                      <td>{cama.estadoCama?"Ocupada":"Libre"}</td>
                      <td>
                        <button onClick={async()=>{
                            await fetchSelectData();
                            cama.nombrePaciente?
                            setForm({...cama,id:cama._id,visibility:true,nombrePaciente:cama.nombrePaciente._id}):
                            setForm({...cama,id:cama._id,visibility:true})
                        }} >
                          <i className="fas fa-edit" ></i>
                        </button>
                        <button onClick={()=>removeItem(cama._id)} >
                          <i className="fas fa-trash-alt" ></i>
                        </button>
                      </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
            {!camas && <Loader/>}
            {form.visibility && 
            <form onSubmit={async(e)=>{
              e.preventDefault();
              await update()}} >
              <h2>Editar cama</h2>
              <input className="form-control" onChange={handleChange} name="codeCama" value={form.codeCama} placeholder="Código de la cama" type="text" />
              <select className="form-control" onChange={handleChange}  value={form.estadoCama} name="estadoCama" >
                <option value="">Libre</option>
                <option value={true}>Ocupada</option>
              </select>
              {form.estadoCama && 
              <select className="form-control" onChange={handleChange} value={form.nombrePaciente} name="nombrePaciente" >
                <option value="">Seleccione un paciente</option>
                {pacientes.map((paciente)=>(
                  <option value={paciente._id}>{paciente.codAsegurado.codAsegurado}-{paciente.codAsegurado.nombres} {paciente.codAsegurado.apellidos}-{paciente.codEnfermedad.nombreEnfermedad}</option>
                ))}
              </select>
              }
              <article>{
                loading?<Loader/>:
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
      form>input,select{
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