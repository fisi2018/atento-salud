import { useEffect, useState } from "react";
import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";

export default function AgregarPaciente(){
    const [asegurados,setAsegurados]=useState([]);
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
        try{
            const response=await fetch(`${API}paciente/createPaciente`,{
                method:"POST",
                body:JSON.stringify(form),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const json=await response.json();
            console.log("response ",json);
        }catch(err){
            console.log("error ",err);
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
            <section>
                <div>
                <h1>Agregar paciente</h1>
                <hr/>
                <form onSubmit={addPaciente} >
                    <input onChange={handleChange} name="fecha" value={form.fecha} placeholder="Fecha" type="date"/>
                    <select onChange={handleChange} value={form.codAsegurado} name="codAsegurado">
                        <option selected value="">Seleccione el asegurado</option>
                        {asegurados.map((asegurado)=>(
                            <option key={asegurado.key} value={asegurado._id}>{asegurado.codAsegurado} - {asegurado.nombres} {asegurado.apellidos}</option>
                        ))}
                        
                    </select>
                    <input onChange={handleChange} value={form.hora} name="hora" placeholder="Hora" type="time"/>
                    <input onChange={handleChange} value={form.year} name="year" placeholder="Año" type="number"/>
                    <select onChange={handleChange} value={form.mes} name="mes" >
                        <option value="">Seleccione el mes</option>
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
                    <select onChange={handleChange} value={form.codEnfermedad} name="codEnfermedad" >
                        <option value="">Seleccione la enfermedad</option>
                        {enfermedades.map((enfermedad)=>(
                            <option key={enfermedad._id} value={enfermedad._id}>{enfermedad.nombreEnfermedad}</option>
                        ))}
                    </select>
                    <select onChange={handleChange} name="doctor" value={form.doctor} >
                        <option value="">Seleccione el doctor a cargo</option>
                        {doctores.map((doctor)=>(
                            <option key={doctor._id} value={doctor._id}>{doctor.codeDoctor} - {doctor.nombres} {doctor.apellidos}</option>
                        ))}
                    </select>
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