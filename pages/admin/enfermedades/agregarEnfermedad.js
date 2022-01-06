import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";
import toast,{Toaster} from "react-hot-toast";
import Loader from "../../../components/Loader";
import { useState } from "react";
import Link from "next/link";
export default function(){
    const {form,setForm,handleChange}=useForm({
        codeEnfermedad:"",
        nombreEnfermedad:""
    });
    const [loading,setLoading]=useState(false);
    const addEnfermedad=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const response=await fetch(`${API}enfermedad/createEnfermedad`,{
                method:"POST",
                body:JSON.stringify(form),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const json=await response.json();
            setLoading(false);
            json.error?toast.error(json.message):toast.success(json.message);
            console.log("resonse ",json);
        }catch(err){
            setLoading(false);
            toast.error("Ha ocurrido un error en el servidor, vuelva a intentarlo más tarde")
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
      <Link href="/admin/enfermedades" >
      <a >Enfermedades</a>
      </Link>
      </li>
    <li className="breadcrumb-item active" aria-current="page">Agregar enfermedades</li>
  </ol>
</nav>
                <div className="enfermedad-block">
                <h1>Agregar enfermedad</h1>
                <hr/>
                <form onSubmit={addEnfermedad} >
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.codeEnfermedad} name="codeEnfermedad"  placeholder="Código de la enfermedad" type="text"/>
                        <label  htmlFor="codeEnfermedad">Código de la enfermedad</label></div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.nombreEnfermedad} name="nombreEnfermedad" placeholder="Nombre de la enfermedad" type="text"/>
                        <label  htmlFor="nombreEnfermedad">Nombre de la enfermedad</label></div>
                    
                    {
                        loading?
                        <div className="loader-block" >
                            <Loader/>
                        </div>:

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
            .enfermedad-block{
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