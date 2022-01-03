import { onAuthStateChanged, signOut } from "@firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

const Sidebar = () => {
  const {push}=useRouter();
  const [names,setNames]=useState("Nomres del usuario");
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setNames(user.displayName);
      }else{
        console.log("usuario no logeado");
      }
    })
  },[])
  const logout=async()=>{
        try{
            await signOut(auth);
            push("/login");
        }catch(err){
            console.log("error al logout ",err);
        }
    }
  return (
    <>
      <div className="sidebar-content container-fluid text-center">
        <div className="img"></div>
        <Link href="/user/main" passHref >
        <h3>{names}</h3>
        </Link>
        <p>Mi historia clínica</p>
        <p>Atención al cliente</p>
        <Link href="/user/main-cita" passHref>
        <p>Mis citas</p>
        </Link>
        <p>Configuración</p>
        <p>Preguntas frecuentes</p>
        <p>Familiares asegurados</p>
        <button onClick={logout} className="btn btn-dark">Cerrar Sesión</button>
        <span className="language-block" ><button>
          Language
          <i className="fas fa-chevron-down"/>
          </button></span>
        <span className="mode-block" ><button>
          Dark mode
          <i  className="fas fa-moon" />
          </button></span>
      </div>

      <style jsx>
        {`
        
        span{
          position:fixed;
          right:1rem;
          display:flex;
        }
        
        .mode-block{
          bottom:1rem;
        }
        .mode-block>button{
          width:5rem;
          font-size:0.8rem;
          color:white;
          background-color:black;
          height:5rem;
          border-radius:50%;
        }
        
        .language-block{
          top:1rem;
        }
        .language-block>button{
          display:flex;
          justify-content:center;
          align-items:center;
        }
        
        h3,p{
          cursor:pointer;
        }
          .img {
            background-image: url("https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            width: 10rem;
            height: 10rem;
          }
          .sidebar-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #3d3b3b;
          }
          h3,
          p {
            margin-bottom: 2.1rem;
            color: white;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;
