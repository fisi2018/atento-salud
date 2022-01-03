import Link from "next/link";
import Layout from "../components/layout";
import { useForm } from "../components/hooks/useForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {API} from "../consts/api";

const initForm={
    email:"",
    password:""
}
export default function Login(){
    const {handleChange,form}=useForm(initForm);
    const {push}=useRouter();
    useEffect(()=>{

       /* onAuthStateChanged(auth,(user)=>{
            if(user){
                console.log("usuario logeado redirect to /user ");
                push("/user/main");
            }else{
                console.log("usuario no logeado");
            }
        });*/
    },[]);
    const login=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`${API}auth/login`,{
                method:"POST",
                body:JSON.stringify(form),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const json=await response.json();
            console.log("response ",json);
            if(json.error) return;
            json.user.role==="admin"?push("/admin"):push("/user/main");
            /*const userCredential=await signInWithEmailAndPassword(auth,form.email,form.password);
            console.log("credenciales ",userCredential);*/

        }catch(err){
            console.log("Ha ocurrido un error al logearse");
        }
    }
    
    return(
        <Layout>

        <section>
            <div>
                <img src="https://media.istockphoto.com/vectors/group-of-doctors-standing-at-hospital-building-vector-id1289188556?b=1&k=20&m=1289188556&s=170667a&w=0&h=nKc4n0Z1yk12PY9Ybkwx6jdyQTlwQrDdV2-f-7rb2II=" alt="sistema hospitalario "/>
            </div>
            <form onSubmit={login} >
                <article className="block-center" ><h1>Inicio de sesión</h1>
                
                <span>
                    <img alt="estetoscopio sistema hospitalario" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.vexels.com%2Fmedia%2Fusers%2F3%2F200602%2Fisolated%2Fpreview%2F1561844524649af9f33c1c1a0a4f528f-monocromo-de-estetoscopio-de-hospital-by-vexels.png&f=1&nofb=1" />
                </span>
                </article>
                
                <article>
                    <div className="icon-block" >
                        <i className="fas fa-user" />
                    </div>
                    <input placeholder="Correo electrónico" onChange={handleChange} name="email" value={form.email} type="email"/></article>
                <article>
                    <div className="icon-block" >
                        <i className="fas fa-lock" />
                    </div>
                    <input placeholder="Contraseña" onChange={handleChange} name="password" value={form.password} type="password"/></article>
                <article className="block-center" >
                    <button type="submit"  >Iniciar sesión</button>
                </article>
                
                <article className="block-center" >
                    <Link href="/" >
                        <a>
                            ¿Aún no estás registrado?
                        </a>
                    </Link>
                </article>
            </form>
        </section>
            <style jsx >{`
            .icon-block{
                display:flex;
                justify-content:center;
                align-items:center;
                padding: 0 0.5rem;
                color:rgba(0,0,0,0.5)
            }
            button{
                background-color:#9370DB;
                border-radius:0.2rem;
                color:white;
                width:100%;
                border:0;
                padding:0.5rem 0;
            }
            a{
                text-decoration:none;
            }
            .block-center{
            
            justify-content:center;
        }
        img{
            width:100%;
            height:auto;
        }
        span{
            margin: 0 0 0 1rem;
            width:3rem;
            display:flex;
            top:1rem;
            right:1rem;
        }
        form{
            box-shadow:0 0.5rem 1.5rem rgba(0,0,0,0.2);
      
            padding:2rem;
            display:flex;
            flex-direction:column;
        }
        input{
            border: 1px  solid rgba(0,0,0,0.2);
            border-width: 0 0 1px 0;
            width:100%;
            outline:0;
            transition: all 0.3s ease;
        }
        input:focus{
            border: 1px solid black;
            border-width: 0 0 1px 0;
        }
        article{
            padding:0.5rem 0;
            margin: 0.5rem 0;
            display:flex;
        }
        h1{
            font-weight:lighter;
        }
        section{
            min-height:100vh;
            display:flex;
            justify-content:space-around;
            align-items:center;
        }
            `}</style>
        </Layout>
    )
}