import { useRouter } from "next/router";
import { useState } from "react"

export default function HeaderAdmin(){
    const [showNav,setShowNav]=useState(false);
    const {push}=useRouter();
    return(
        <header>
            <div className="form-floating">

                <select defaultValue="es" id="floatingSelect" className="form-select" name="language" id="">
                    <option value="es">
                        Español
                    </option>
                    <option value="en">English</option>
                </select>
                <label htmlFor="floatingSelect">Selecciona un idioma</label>
            </div>
            <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle profile-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    <img src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433__480.png" alt="profile img"/>
  </button>
    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    
    <li><button onClick={()=>{
        localStorage.removeItem("user_login");
        push("/");
    }} className="dropdown-item" >Cerrar sesión</button></li>
    </ul>
    </div>
            <style jsx>{`
            .dropdown>button{
                border-radius:50%;
                padding:0;
                background-color:transparent;
            }
            option{
                
            }
            select{
                width:15rem;
                background-color:rgba(255,255,255,0.8);
                
            }
            ul{
                list-style:none;
                padding:0;
                background-color:white;
            }
            li{
                padding:0;
            }
            img{
                width:3rem;
                height:3rem;
                border-radius:50%;
            }
            
            header{
                background-color:#323232;
                position:sticky;
                z-index:999;
                top:0;
                right:0;
                padding:0.5rem;
                height:5rem;
                display:flex;
                align-items:center;
                justify-content:space-around;
            }
            div{
                display:flex;
            }
            .profile-block{
                display:flex;
                flex-direction:column;
                width:5rem;
                position:fixed;
                right:0.5rem;
                top:1rem;
            }
            .profile-button{
                position:relative;
                width:3rem;
                height:3rem;
            }
            .profile-button>img{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
            }
            `}</style>
        </header>
    )
}