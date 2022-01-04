import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import { API } from "../../../consts/api";

export default function(){
    const {form,setForm,handleChange}=useForm({
        codeEnfermedad:"",
        nombreEnfermedad:""
    });
    const addEnfermedad=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`${API}enfermedad/createEnfermedad`,{
                method:"POST",
                body:JSON.stringify(form),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const json=await response.json();
            console.log("resonse ",json);
        }catch(err){
            console.log("error en el request ",err);
        }
    }
    return(
        <LayoutAdmin>
            <section>
                <div>
                <h1>Agregar enfermedad</h1>
                <hr/>
                <form onSubmit={addEnfermedad} >
                    <input onChange={handleChange} value={form.codeEnfermedad} name="codeEnfermedad"  placeholder="Código de la enfermedad" type="text"/>
                    
                    <input onChange={handleChange} value={form.nombreEnfermedad} name="nombreEnfermedad" placeholder="Nombre de la enfermedad" type="text"/>
                    
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