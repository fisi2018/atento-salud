import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";

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
    const addDoctor=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`${API}doctor/createDoctor`,{
                method:"POST",
                body:JSON.stringify(form),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const json=await response.json();
            console.log("response ", json);

        }catch(err){
            console.log("error en el request ",err);
        }
    }
    return(
        <LayoutAdmin>
            <section>
                <div>
                <h1>Agregar médico</h1>
                <hr/>
                <form onSubmit={addDoctor} >
                    <input onChange={handleChange} value={form.dni} name="dni"  placeholder="DNI" type="number"/>
                    <input onChange={handleChange} placeholder="Código del médico" name="codeDoctor" value={form.codeDoctor} type="text"/>
                    <input onChange={handleChange} value={form.nombres} name="nombres" placeholder="Nombres" type="text"/>
                    <input onChange={handleChange} value={form.apellidos} name="apellidos" placeholder="Apellidos" type="text"/>
                    <input onChange={handleChange} value={form.phone} name="phone" placeholder="Teléfono" type="number"/>
                    <input onChange={handleChange} value={form.email} name="email" placeholder="Correo de contacto" type="email"/>
                    <input onChange={handleChange} value={form.disponibilidad} name="disponibilidad" placeholder="Disponibilidad" type="text"/>
                    
                    <input onChange={handleChange} value={form.especialidad} name="especialidad" placeholder="Especialidad" type="text"/>
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