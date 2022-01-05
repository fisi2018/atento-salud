import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";
import toast,{Toaster} from "react-hot-toast";
import Loader from "./../../../components/Loader";

export default function PacientesAtender() {
  const [pacientes, setPacientes] = useState(false);
  const [loading,setLoading]=useState(false);
  const [asegurados,setAsegurados]=useState([]);
    const [enfermedades,setEnfermedades]=useState([]);
    const [doctores,setDoctores]=useState([]);
  const {form,setForm,handleChange}=useForm({
    visibility:false
  });
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
  const fetchSelectOptions=async()=>{
    try{
        const response=await fetch(`${API}user/asegurados`);
        const asegurados=await response.json();
        const responseEnfermedad=await fetch(`${API}enfermedad`);
        const enfermedades=await responseEnfermedad.json();
        const responseDoctor=await fetch(`${API}doctor`);
        const doctores=await responseDoctor.json();
        setAsegurados(asegurados);
        setEnfermedades(enfermedades);
        setDoctores(doctores);
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
      const response=await axios.put(`${API}paciente/updatePaciente`,form);
      const data=await response.data;
      setLoading(false);
      data.error?toast.error(data.message):toast.success(data.message);
      console.log("response ",data);
      await fetchData();
    }catch(err){
      setLoading(false);
      toast.error("Ha ocurrido un error, vuelva a intentarlo");
      console.log("error ",err);
    }
  }
  const removeItem=async(id)=>{
    try{
      const response=await axios.post(`${API}paciente/removePaciente`,{id});
      const data=await response.data;
      console.log("message ",data);
      if(data.error){
        toast.error(data.message);
      }else{
        toast.success(data.message);
        await fetchData();
      }
    }catch(err){
      toast.error("Ha ocurrido un error, vuelva a intentarlo");
      console.log("error ",err);
    }
  }
  return (
  
    <LayoutAdmin>
      <Toaster/>
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
                {pacientes &&
                pacientes.map((paciente,index)=>(
                  <tr key={paciente._id} >
                    <th scope="row" >{index+1}</th>
                    <td>{paciente.codAsegurado.nombres}</td>
                    <td>{paciente.codAsegurado.apellidos}</td>
                    <td>{paciente.codAsegurado.codAsegurado}</td>
                    <td>{paciente.doctor.nombres} {paciente.doctor.apellidos}</td>
                    <td>{paciente.codEnfermedad.nombreEnfermedad}</td>
                    <td>{paciente.codAsegurado.dni}</td>
                    <td>
                      <button onClick={async()=>{
                        await fetchSelectOptions();
                        setForm({...paciente,id:paciente._id,
                        doctor:paciente.doctor._id,
                        codEnfermedad:paciente.codEnfermedad._id,
                        codAsegurado:paciente.codAsegurado._id
                        ,visibility:true})}} >
                        <i className="fas fa-edit" ></i>
                      </button>
                      <button onClick={()=>removeItem(paciente._id)} >
                        <i className="fas fa-trash-alt" ></i>
                      </button>
                    </td>
                  </tr>
                ))}
               
              </tbody>
            </table>
            {!pacientes && <Loader/> }
            {form.visibility && 
            <form onSubmit={update} >
              <h2>Editar información del paciente</h2>
              <input className="form-control" onChange={handleChange} name="fecha" value={form.fecha} placeholder="Fecha de ingreso del paciente" type="date" />
              <input className="form-control" onChange={handleChange} name="hora" value={form.hora} placeholder="Hora de ingreso" type="time" />
              <select className="form-control" onChange={handleChange} value={form.codAsegurado} name="codAsegurado" >
                <option value="">Seleccione el asegurado</option>
                {asegurados.map((asegurado)=>(
                  <option value={asegurado._id}>{asegurado.codAsegurado}-{asegurado.nombres} {asegurado.apellidos}</option>
                ))}
              </select>
              <select onChange={handleChange} className="form-control" value={form.mes} name="mes">
                <option value="">Seleccione el mes de ingreso</option>
                <option value="Enero">Enero</option>
                <option value="Febrero">Febrero</option>
                <option value="Marzo">Marzo</option>
                <option value="Abril">Abril</option>
                <option value="Mayo">Mayo</option>
                <option value="Junio">Junio</option>
                <option value="Julio">Julio</option>
                <option value="Agosto">Agosto</option>
                <option value="Setiembre">Setiembre</option>
                <option value="Octubre">Octubre</option>
                <option value="Noviembre">Noviembre</option>
                <option value="Diciembre">Diciembre</option>
              </select>
              <input className="form-control" onChange={handleChange} name="year" value={form.year} placeholder="Año de ingreso" type="number" />
              <select value={form.codEnfermedad} className="form-control" name="codEnfermedad" onChange={handleChange}>
                <option value="">Seleccione la enfermedad</option>
                {enfermedades.map((enfermedad)=>(
                  <option value={enfermedad._id}>{enfermedad.codeEnfermedad}-{enfermedad.nombreEnfermedad}</option>
                ))}
              </select>
              <select value={form.doctor} className="form-control" onChange={handleChange} name="doctor">
                <option value="">Seleccione el doctor a cargo</option>
                {doctores.map((doctor)=>(
                  <option value={doctor._id}>{doctor.codeDoctor}-{doctor.nombres} {doctor.apellidos}-{doctor.especialidad.join(",")}</option>
                ))}
              </select>
              <article>
                {loading?
              <Loader/>:
              <>
              <button className="btn btn-danger" onClick={()=>setForm({...form,visibility:false})}>Cancelar</button>
              <button type="submit" className="btn btn-primary" >Guardar cambios</button>
              </>}
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
      article{
        display:flex;
        justify-content:space-around;
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
        cursor:pointer;
      }
      table{
        overflow:auto;
   
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