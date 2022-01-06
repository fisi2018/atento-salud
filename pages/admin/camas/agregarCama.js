import { useEffect, useState } from "react";
import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";
import toast,{Toaster} from "react-hot-toast";
import Loader from "../../../components/Loader";
import Link from "next/link";
export default function AgregarCama(){
    const {form,handleChange,setForm}=useForm({
        codeCama:"",
        estadoCama:"",
        nombrePaciente:""
    });
    const [loading,setLoading]=useState(false);
    const [pacientes,setPacientes]=useState([]);
    const fetchData=async()=>{
        try{
        const response=await fetch(`${API}paciente`);
        const pacientes=await response.json();
        console.log("pacientes ",pacientes);
        setPacientes(pacientes);
        
    }catch(err){
        console.log("error ",err);
        
    }
    }
    useEffect(()=>{
        fetchData();
    },[])
    const addCama=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const dataFormat=form.estadoCama==="ocupado"?{
                estadoCama:true
            }:{
                estadoCama:false,
                nombrePaciente:""
            }
            const response=await fetch(`${API}cama/createCama`,{
                method:"POST",
                body:JSON.stringify({...form,...dataFormat}),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const json=await response.json();
            setLoading(false);
            json.error?toast.error(json.message):toast.success(json.message);
            console.log("response ",json);
        }catch(err){
            setLoader(false);
            toast.error("Ha ocurrido un error en el servidor, vuelve a intentarlo más tarde")
            console.log("error durante el request ",err);
        }
    }
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
      <Link href="/admin/camas" >
      <a >Camas</a>
      </Link>
      </li>
    <li className="breadcrumb-item active" aria-current="page">Agregar camas</li>
  </ol>
</nav>
                <div className="camas-block">
                <h1>Agregar cama</h1>
                <hr/>
                <form onSubmit={addCama} >
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} name="codeCama" value={form.codeCama} placeholder="Código de la cama" type="text"/>
                    <label htmlFor="codeCama">Código de la cama</label>
                    </div>
                    <div className="form-floating">
                    <select className="form-select" onChange={handleChange} value={form.estadoCama} name="estadoCama">
                        <option  value="">-</option>
                        <option value="libre">Libre</option>
                        <option value="ocupado" >Ocupado</option>
                    </select>
                    <label htmlFor="estadoCama">Estado de la cama</label>
                    </div>
                    {form.estadoCama==="ocupado" && 
                    <div className="form-floating">
                    <select className="form-select"  onChange={handleChange} value={form.nombrePaciente} name="nombrePaciente">
                        <option value="">-</option>
                        {pacientes.map((paciente)=>(
                            <option key={paciente._id} value={paciente._id}>{paciente.codAsegurado.codAsegurado} - {paciente.codAsegurado.nombres} {paciente.codAsegurado.apellidos} - {paciente.codEnfermedad.nombreEnfermedad}</option>
                        ))}
                    </select>
                        <label htmlFor="nombrePaciente">Seleccione el paciente a internar</label>
                    </div>
                    }
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
            .camas-block{
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
        const response=await fetch("https://atento-salud.vercel.app/api/paciente");
        const pacientes=await response.json();
        console.log("pacientes ",pacientes);
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
                error:err
            }
        }
    }
}*/