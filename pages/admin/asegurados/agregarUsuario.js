import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import {API} from "../../../consts/api";
import toast,{Toaster} from "react-hot-toast";
import Loader from "../../../components/Loader";
import { useState } from "react";
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
                <div>
                <h1>Agregar usuario</h1>
                <hr/>
                <form onSubmit={addUser} >
                    <input onChange={handleChange} value={form.dni} name="dni"  placeholder="DNI" type="number"/>
                    <select onChange={handleChange} name="role">
                        <option selected value="">Seleccione el rol a asignar</option>
                        <option value="user">Usuario regular</option>
                        <option value="admin" >Administrador</option>
                    </select>
                    <input onChange={handleChange} value={form.nombres} name="nombres" placeholder="Nombres" type="text"/>
                    <input onChange={handleChange} value={form.apellidos} name="apellidos" placeholder="Apellidos" type="text"/>
                    <input onChange={handleChange} value={form.phone} name="phone" placeholder="Teléfono" type="number"/>
                    <input onChange={handleChange} value={form.email} name="email" placeholder="Cuenta con la que ingresará" type="email"/>
                    <input onChange={handleChange} value={form.password} name="password" placeholder="Contraseña" type="password"/>
                    {form.role==="user" && 
                    
                    <input onChange={handleChange} value={form.role==="admin" ? " ":form.codAsegurado} name="codAsegurado" placeholder="Código de asegurado" type="text"/>
                    }
                    <input onChange={handleChange} value={form.address} name="address" placeholder="Dirección" type="text"/>
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
            input{
                margin:1rem 0;
                padding:0.5rem;
            }
            select{
                margin:0.5rem 0;
                padding:0.5rem;
            }
            section{
                display:flex;
                flex-direction:column;
                align-items:center;
                background-color:#F9FBFD;
                padding:1rem 0;
            }
            div{
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