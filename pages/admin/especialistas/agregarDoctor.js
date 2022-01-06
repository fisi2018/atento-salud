import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";
import toast,{Toaster} from "react-hot-toast";
import Loader from "../../../components/Loader";
import { useState } from "react";
import Link from "next/link";
export default function AgregarDoctor(){
    const {form,setForm,handleChange}=useForm({
        codeDoctor:"",
        dni:"",
        especialidad:"",
        phone:"",
        email:"",
        nombres:"",
        apellidos:"",
        disponibilidad:""
    });
    const [loading,setLoading]=useState(false);
    const addDoctor=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const response=await fetch(`${API}doctor/createDoctor`,{
                method:"POST",
                body:JSON.stringify(form),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const json=await response.json();
            setLoading(false);
            json.error?toast.error(json.message):toast.success(json.message);
            console.log("response ", json);

        }catch(err){
            setLoading(false);
            toast.error("Ha ocurrido un error en el servidor, vuelva a intentarlo más tarde");
            console.log("error en el request ",err);
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
      <Link href="/admin/especialistas" >
      <a >Médicos</a>
      </Link>
      </li>
    <li className="breadcrumb-item active" aria-current="page">Agregar médicos</li>
  </ol>
</nav>
                <div className="medico-block">
                <h1>Agregar médico</h1>
                <hr/>
                <form onSubmit={addDoctor} >
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.dni} name="dni"  placeholder="DNI" type="number"/>
                    <label htmlFor="dni">Ingrese el DNI del médico</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} placeholder="Código del médico" name="codeDoctor" value={form.codeDoctor} type="text"/>
                        <label htmlFor="codeDoctor">Ingrese el código del médico</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.nombres} name="nombres" placeholder="Nombres" type="text"/>
                        <label htmlFor="nombres">Nombres del médico</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.apellidos} name="apellidos" placeholder="Apellidos" type="text"/>
                        <label htmlFor="apellidos">Apellidos del médico</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.phone} name="phone" placeholder="Teléfono" type="number"/>
                        <label htmlFor="phone">Teléfono de contacto</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.email} name="email" placeholder="Correo de contacto" type="email"/>
                        <label htmlFor="email">Email de contacto</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.disponibilidad} name="disponibilidad" placeholder="Disponibilidad" type="text"/>
                        <label htmlFor="disponibilidad">Horario de atención del médico</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.especialidad} name="especialidad" placeholder="Especialidad" type="text"/>
                        <label htmlFor="especialidad">Ingrese las especialidades del médico separadas por una ","</label>
                    </div>
                    {loading?
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
            .medico-block{
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