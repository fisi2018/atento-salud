import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import {API} from "../../../consts/api";
import toast,{Toaster} from "react-hot-toast";
import Loader from "../../../components/Loader";
import { useState } from "react";
import Link from "next/link";
export default function AgregarUsuario(){
    const {form,handleChange,setForm}=useForm({
        dni:"",
        role:"",
        nombres:"",
        apellidos:"",
        phone:"",
        email:"",
        password:"",
        codAsegurado:"",
        address:""
    });
    const[loading,setLoading]=useState(false);
    console.log("form ",form);
    const addUser=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            form.role==="admin" && setForm({...form,
            codAsegurado:""})
            const response=await fetch(`${API}user/createUser`,{
                method:"POST",
                body:JSON.stringify(form),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const json=await response.json();
            setLoading(false);
            json.error?toast.error(json.message):toast.success(json.message)
        }catch(err){
            setLoading(false);
            console.log("error en request ",err);
            toast.error("Ha ocurrido un error en el servidor, vuelva a intentarlo más tarde")
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
      <Link href="/admin/asegurados" >
      <a >Usuarios</a>
      </Link>
      </li>
    <li className="breadcrumb-item active" aria-current="page">Agregar usuarios</li>
  </ol>
</nav>
                <div className="user-block">
                <h1>Agregar usuario</h1>
                <hr/>
                <form onSubmit={addUser} >
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.dni} name="dni"  placeholder="DNI" type="number"/>
                        <label htmlFor="dni">Ingrese el DNI del usuario</label></div>
                    <div className="form-floating">
                    <select className="form-select" onChange={handleChange} name="role">
                        <option selected value="">-</option>
                        <option value="user">Usuario regular</option>
                        <option value="admin" >Administrador</option>
                    </select>
                        <label htmlFor="role">Seleccione el rol a asignar</label></div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.nombres} name="nombres" placeholder="Nombres" type="text"/>
                        <label htmlFor="nombres">Nombres del usuario</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.apellidos} name="apellidos" placeholder="Apellidos" type="text"/>
                        <label htmlFor="apellidos">Apellidos del usuario</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.phone} name="phone" placeholder="Teléfono" type="number"/>
                        <label htmlFor="phone">Teléfono de contacto</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.email} name="email" placeholder="Cuenta con la que ingresará" type="email"/>
                        <label htmlFor="email">Email con el que ingresará al sistema</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.password} name="password" placeholder="Contraseña" type="password"/>
                        <label htmlFor="password">Contraseña</label>
                    </div>
                    {form.role==="user" && 
                    <div className="form-floating">
                        <input className="form-control" onChange={handleChange} value={form.role==="admin" ? " ":form.codAsegurado} name="codAsegurado" placeholder="Código de asegurado" type="text"/>
                        <label htmlFor="codAsegurado"></label>
                    </div>
                    }
                    <div className="form-floating">
                    <input className="form-control" onChange={handleChange} value={form.address} name="address" placeholder="Dirección" type="text"/>
                        <label  htmlFor="address">Dirección de contacto</label></div>
                    {loading?
                    <div className="loader-block" >

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
            .user-block{
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