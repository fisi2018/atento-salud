import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";
import toast,{Toaster} from "react-hot-toast";
export default function Especialistas() {
  const [doctores, setDoctores] = useState([]);
  const {form,setForm,handleChange}=useForm({
    visibility:false,
    id:"",
    codeDoctor:"",
    dni:"",
    especialidad:"",
    phone:"",
    email:"",
    nombres:"",
    apellidos:"",
    disponibilidad:""
  })
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
  const update=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.put(`${API}doctor/updateDoctor`,form);
      const data=await response.data;
      console.log("response ",data);
      await fetchData();
    }catch(err){
      console.log("error ",err);
    }
  }
  const removeItem=async(id)=>{
    try{
      const response=await axios.post(`${API}doctor/removeDoctor`,{id});
      const data=await response.data;
      console.log("message ",data);
      if(data.error){
        toast.error(data.message);
      }else{
        toast.success(data.message);
        await fetchData();
      }
    }catch(err){
      console.log("error ",err);
    }
  }
  return (
    <LayoutAdmin>
      <Toaster/>
      <section>

        <div className="admin-main">
          <div className="d-flex w-100 flex-column justify-content-center align-items-center">
            <h1 className="mb-3">Lista de médicos</h1>
            <p>Nota: Antes de eliminar un médico de la lista asegúrese que no tiene pacientes a su cargo</p>
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
                        <button onClick={()=>setForm({...doctor,
                        id:doctor._id,
                        especialidad:doctor.especialidad.join(","),
                        visibility:true
                        })} >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={()=>removeItem(doctor._id)} >
                          <i className="fas fa-trash-alt" ></i>
                        </button>
                      </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
             {form.visibility && 
            <form onSubmit={update} >
              <h2>Editar información de médico</h2>
              <input className="form-control" onChange={handleChange} name="codeDoctor" value={form.codeDoctor} placeholder="Código del médico" type="text" />
              <input className="form-control" onChange={handleChange} name="dni" value={form.dni} placeholder="DNI" type="number" />
              <input className="form-control" onChange={handleChange} name="especialidad" value={form.especialidad} placeholder="Especialidades" type="text" />
              <input className="form-control" onChange={handleChange} name="phone" value={form.phone} placeholder="Teléfono de contacto" type="number" />
              <input className="form-control" onChange={handleChange} name="email" value={form.email} placeholder="Email de contacto" type="email" />
              <input className="form-control" onChange={handleChange} name="nombres" value={form.nombres} placeholder="Nombres" type="text" />
              <input className="form-control" onChange={handleChange} name="apellidos" value={form.apellidos} placeholder="Apellidos" type="text" />
              <input className="form-control" onChange={handleChange} name="disponibilidad" value={form.disponibilidad} placeholder="Disponibilidad" type="text" />
              <article>
              <button className="btn btn-danger" onClick={()=>setForm({...form,visibility:false})}>Cancelar</button>
              <button type="submit" className="btn btn-primary" >Guardar cambios</button>
              </article>
            </form>
            }
            </div>
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
      form>input{
        margin:0.5rem;
        border-radius:0.5rem;
        
        padding:0.5rem;
        border:0.1rem solid rgba(0,0,0,0.2);
      }
      td>button{
        background-color:transparent;
        color:white;
        border:0;
        cursor:pointer;
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