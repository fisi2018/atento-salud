import { useEffect, useState } from "react";
import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";
import toast,{Toaster} from "react-hot-toast";
import Loader from "./../../../components/Loader";
import Link from "next/link";
export default function AgregarPaciente(){
    const [asegurados,setAsegurados]=useState([]);
    const [loading,setLoading]=useState(false);
    const [enfermedades,setEnfermedades]=useState([]);
    const [doctores,setDoctores]=useState([]);
    const {form,setForm,handleChange}=useForm({
        fecha:"",
        hora:"",
        codAsegurado:"",
        year:"",
        mes:"",
        codEnfermedad:"",
        doctor:""

    });
    const addPaciente=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const response=await fetch(`${API}paciente/createPaciente`,{
                method:"POST",
                body:JSON.stringify(form),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const json=await response.json();
            setLoading(false);
            console.log("response ",json);
            json.error?toast.error(json.message):toast.success(json.message);
        }catch(err){
            setLoading(false);
            console.log("error ",err);
            toast.error("Ha ocurrido un error en el servidor, vuelve a intentarlo más tarde")
        }
    }
    const fetchData=async()=>{
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
    return(
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
      <li className="breadcrumb-item">
      <Link href="/admin/pacientes-atender" >
      <a >Pacientes</a>
      </Link>
      </li>
    <li className="breadcrumb-item active" aria-current="page">Agregar pacientes</li>
  </ol>
</nav>     
                <div className="agregar-block">
                <h1>Agregar paciente</h1>
                <hr/>
                <form className="form-floating" onSubmit={addPaciente} >
                    <input className="form-control" onChange={handleChange} name="fecha" value={form.fecha} placeholder="Fecha" type="date"/>
                    <label htmlFor="fecha">Ingresar fecha de atención</label>
                    <div className="form-floating">

                    <select className="form-select" onChange={handleChange} value={form.codAsegurado} name="codAsegurado" >
                        <option selected value="">-</option>
                        {asegurados.map((asegurado)=>(
                            <option key={asegurado.key} value={asegurado._id}>{asegurado.codAsegurado} - {asegurado.nombres} {asegurado.apellidos}</option>
                        ))}
                        
                    </select>
                    <label htmlFor="codAsegurado">Seleccione el asegurado a atender</label>
                    </div>
                    <div className="form-floating">

                    <input className="form-control" onChange={handleChange} value={form.hora} name="hora" placeholder="Hora" type="time"/>
                    <label htmlFor="hora">Seleccione la hora </label>
                    </div>
                    <div className="form-floating">
                    <select className="form-select" onChange={handleChange} name="doctor" value={form.doctor} >
                        <option value="">-</option>
                        {doctores.map((doctor)=>(
                            <option key={doctor._id} value={doctor._id}>{doctor.codeDoctor} - {doctor.nombres} {doctor.apellidos}</option>
                        ))}
                    </select>
                    <label htmlFor="doctor">Seleccione el doctor</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.year} name="year" placeholder="Año" type="number"/>
                    <label htmlFor="year">Ingrese el año </label>
                    </div>
                    <div className="form-floating">

                    <select className="form-select" onChange={handleChange} value={form.mes} name="mes" >
                        <option value="">-</option>
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
                    <label htmlFor="mes">Seleccione el mes </label>
                    </div>
                    <div className="form-floating">
                    <select className="form-select" onChange={handleChange} value={form.codEnfermedad} name="codEnfermedad" >
                        <option value="">-</option>
                        {enfermedades.map((enfermedad)=>(
                            <option key={enfermedad._id} value={enfermedad._id}>{enfermedad.nombreEnfermedad}</option>
                        ))}
                    </select>
                    <label htmlFor="codEnfermedad">Seleccione la enfermedad </label>
                    </div>
                    
                    {
                        loading?
                        <div className="loader-block">

                            <Loader/>
                        </div>
                        :
                    <button type="submit">Agregar</button>
                    }
                </form>
                </div>
            </section>
            <style jsx>{`
            a{
                text-decoration:none;
            }
            .loader-block{
                display:flex;
                justify-content:center;
            }
            form{
                display:flex;
                flex-direction:column;
            }
            
           .form-floating{
               margin:0.5rem 0;
           }
            section{
                display:flex;
                flex-direction:column;
                align-items:center;
                background-color:#F9FBFD;
                padding:1rem 0;
            }
            .agregar-block{
                background-color:#fff;
                padding:0.5rem;
                width:90%;
                box-shadow: 0 0.5rem 1.5rem rgba(0,0,0,0.2);
            }
            h1{
                font-weight:lighter;
            }
            button{
                padding:0.5rem 0;
                margin:0.5rem 0;
                background-color:#9370DB;
                color:white;
                border:0;
            }
            `}</style>
        </LayoutAdmin>
    )
}
/*export async function getServerSideProps(){
    try{
        const response=await fetch("https://atento-salud.vercel.app/api/user/asegurados");
        const asegurados=await response.json();
        const responseEnfermedad=await fetch("https://atento-salud.vercel.app/api/enfermedad");
        const enfermedades=await responseEnfermedad.json();
        const responseDoctor=await fetch("https://atento-salud.vercel.app/api/doctor");
        const doctores=await responseDoctor.json();
        return{
            props:{
                asegurados,
                enfermedades,
                doctores
            }
        }
    }catch(err){
        console.log("error ",err);
        return{
            props:{
                message:"Error ocurrido en el SSR",
                error:err
            }
        }
    }
}*/