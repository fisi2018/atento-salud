import { useEffect, useState } from "react";
import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";

export default function AgregarCama(){
    const {form,handleChange,setForm}=useForm({
        codeCama:"",
        estadoCama:false,
        nombrePaciente:""
    });
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
        try{
            form.estadoCama?setForm({
                ...form,
                estadoCama:true
            }):setForm({
                ...form,
                estadoCama:false,
                nombrePaciente:""
            });
            const response=await fetch(`${API}cama/createCama`,{
                method:"POST",
                body:JSON.stringify(form),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const json=await response.json();
            console.log("response ",json);
        }catch(err){
            console.log("error durante el request ",err);
        }
    }
    return(
        <LayoutAdmin>
            <section>
                <div>
                <h1>Agregar cama</h1>
                <hr/>
                <form onSubmit={addCama} >
                    <input onChange={handleChange} name="codeCama" value={form.codeCama} placeholder="Código de la cama" type="text"/>
                    <select  onChange={handleChange} value={form.estadoCama} name="estadoCama">
                        <option  value="">Seleccione el estado de la cama</option>
                        <option value="">Libre</option>
                        <option value={1} >Ocupado</option>
                    </select>
                    {form.estadoCama && 
                    <select  onChange={handleChange} value={form.nombrePaciente} name="nombrePaciente">
                        <option value="">Seleccione el paciente</option>
                        {pacientes.map((paciente)=>(
                            <option key={paciente._id} value={paciente._id}>{paciente.codAsegurado.codAsegurado} - {paciente.codAsegurado.nombres} {paciente.codAsegurado.apellidos} - {paciente.codEnfermedad.nombreEnfermedad}</option>
                        ))}
                    </select>
                    }
                    <button type="submit">Agregar</button>
                </form>
                </div>
            </section>
            <style jsx>{`
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