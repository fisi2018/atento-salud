import { useRouter } from "next/router";
import { useState } from "react"

export default function HeaderAdmin(){
    const [showNav,setShowNav]=useState(false);
    const {push}=useRouter();
    return(
        <header>
            <div className="profile-block" >
            <span onClick={()=>showNav? setShowNav(false):setShowNav(true)} className="profile-img-block" >
                <img src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433__480.png" alt="profile login "/>
            </span>
            {showNav && 
            <ul>
                <li>
                    <button onClick={()=>push("/login")} >Cerrar sesión</button>
                </li>
            </ul>
            }
            </div>
            <style jsx>{`
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
            .profile-img-block{
                display:flex;
                width:5rem;
                justify-content:center;
                align-items:center;
            }
            header{
                background-color:rgba(0,0,0,0.7);
                position:sticky;
                top:0;
                right:0;
                padding:0.5rem;
                height:5rem;
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
            `}</style>
        </header>
    )
}