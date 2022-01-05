import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNameFormat } from "../utils";

export default function UserSide(){
    const {pathname,push}=useRouter();
    const [option,setOption]=useState({
    pacientes:false,
    profile:false,
    camas:false,
    medicos:false,
    usuarios:false,
    enfermedades:false
  });
  const [user,setUser]=useState(false);
    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem("user_login"));
        setUser(data);
    },[]);
  const logout=()=>{
    localStorage.removeItem("user_login");
    push("/");
  }
    return(
         <>
      <div className="adminSide-block" >
        <header>
          <h1>Atento Salud</h1>
        </header>
        <article>
          <div className="dropdown-profile-block" >

          <div onClick={()=>!option.profile ? setOption({...option,profile:true}) : setOption({...option,profile:false})}   className=" profile-block" >
            <span className="profile-img-block" >
              <img src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433__480.png" alt="admin profile" />
            </span>
            <div className="profile-info-block" >
              <p>{user && getNameFormat(user.nombres,user.apellidos)}</p>
              <p>Asegurado</p>
            </div>
            <span className={option.profile && `active-icon`} >
              <i className="fas fa-sort-down" />
            </span>
          </div>
          {option.profile && 
                  <div onClick={logout} className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Cerrar sesión</p>
                  </div>
                
                  
            }
          </div>
        </article>
        <span>
        <hr />
        </span>
        <div className="features-block" >
            <ul>
              <li>
                <div className="dropdown-block" >
                  <Link href="/user/main" passHref >
                  <div className={`dropdown-title-element ${pathname.split("/").pop()==="main" && "element-active"}`} >
                      <span>
                        <i className="fas fa-home" ></i>
                      </span>
                      <p>Inicio</p>
                      <span>
                        <i className="fas fa-sort-down" ></i>
                      </span>
                  </div>
                  </Link>
                </div>
              </li>
              
              <li>
                <div className="dropdown-block" >
                  <div onClick={()=>!option.camas ? setOption({...option,camas:true}) : setOption({...option,camas:false})}  className={`dropdown-title-element ${(pathname.split("/").pop()==="camas" ) && "element-active"}`} >
                      <span>
                        <i className="fas fa-procedures" ></i>
                      </span>
                      <p>Camas</p>
                      <span className={option.camas && `active-icon`} >
                        <i className="fas fa-sort-down" ></i>
                      </span>
                  </div>
                  {option.camas && <>
                  <Link href="/user/camas" passHref >
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Mostrar</p>
                  </div>
                  </Link>
                  
                  </>}
                </div>
              </li>
              <li>
                <div className="dropdown-block" >
                  <div onClick={()=>!option.medicos ? setOption({...option,medicos:true}) : setOption({...option,medicos:false})}  className={`dropdown-title-element ${(pathname.split("/").pop()==="medicos" ) && "element-active"}`} >
                      <span>
                        <i className="fas fa-user-md" ></i>
                      </span>
                      <p>Médicos</p>
                      <span className={option.medicos && `active-icon`} >
                        <i className="fas fa-sort-down" ></i>
                      </span>
                  </div>
                  {option.medicos && <>
                  <Link href="/user/medicos" passHref >
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Mostrar</p>
                  </div>
                  </Link>
                 
                  </>}
                </div>
              </li>
              <li>

              <div className="dropdown-block" >
                  <div onClick={()=>!option.enfermedades ? setOption({...option,enfermedades:true}) : setOption({...option,enfermedades:false})}  className={`dropdown-title-element ${(pathname.split("/").pop()==="enfermedades" ) && "element-active"}`} >
                      <span>
                        <i className="fas fa-notes-medical" ></i>
                      </span>
                      <p>Enfermedades</p>
                      <span className={option.enfermedades && `active-icon`} >
                        <i className="fas fa-sort-down" ></i>
                      </span>
                  </div>
                  {option.enfermedades && <>
                  <Link href="/user/enfermedades" passHref>
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Mostrar</p>
                  </div>
                  </Link>
                  
                  </>}
                </div>
              </li>
            </ul>
        </div>
      </div>

      <style jsx>
        {`
        h1{
          text-align:center;
        }
        .active-icon{
          transform: rotate(180deg);
        }
        .features-block{
          display:flex;
          padding: 0.5rem 0;
          flex-direction:column;
          align-items:center;
        }
        .dropdown-title-element{
          display:flex;
          align-items:center;
          border-radius:0.3rem;
          color:rgba(0,0,0,0.5);
          padding:0.5rem;
          cursor:pointer;
          transition: all 0.3s ease;
        }
        .dropdown-title-element:hover{
          background-color:#F4F4F4;
          color:black;
        }
        .element-active{
          background-color:rgba(0,0,0,0.7) !important;
          color:white !important;
        }
        .dropdown-title-element>p{
          width:10rem;
          margin-left:0.5rem;
        }
        ul{
          list-style:none;
          padding:0;
          width:80%;
        }
        li{
          margin-bottom:0.5rem;
        }
        .profile-info-block{
          display:flex;
          flex-direction:column;
          width:10rem;
          padding: 0 1rem;
        }
        p{
          margin:0.25rem 0;
          text-align:left;
          font-size:0.8rem;
        }
        .profile-info-block>p:nth-child(2){
          font-weight:bolder;
        }
        article{
          display:flex;
          justify-content:center;
        }
        .profile-block{
          display:flex;
          padding:0.5rem 0;
          cursor:pointer;
          align-items:center;
          height:100%;
        }
        .dropdown-profile-block{
          display:flex;
          flex-direction:column;
        }
        .profile-img-block{
          display:flex;
          justify-content:center;
          align-items:center;
        }
        img{
          width:3rem;
          height:3rem;
          border-radius:50%;
        }
        span{
          display:flex;
          justify-content:center;
          transition: all 0.3s ease;
        }
        hr{
          width:80%;
          margin:0;
        }
        h1{
          color:white;
          font-weight:lighter;
          font-size:1.5rem;
        }
        header{
          background-color:rgba(0,0,0,0.7);
          width:100%;
          padding:1rem 0;
        }
        .adminSide-block{
          width:16rem;
          position:sticky;
          box-shadow: 0 0.5rem 1.5rem rgba(0,0,0,0.2);
          top:0;
          left:0;
          height:100vh;
          bottom:0;
          overflow:auto;
        }
         .adminSide-block::-webkit-scrollbar {
    -webkit-appearance: none;
}

.adminSide-block::-webkit-scrollbar:vertical {
    width:10px;
}

.adminSide-block::-webkit-scrollbar-button:increment,.adminSide-block::-webkit-scrollbar-button {
    display: none;
} 

.adminSide-block::-webkit-scrollbar:horizontal {
    height: 10px;
}

.adminSide-block::-webkit-scrollbar-thumb {
    background-color: #797979;
    border-radius: 20px;
    border: 2px solid #f1f2f3;
}

.adminSide-block::-webkit-scrollbar-track {
    border-radius: 10px;  
}
        `}
      </style>
      </>
    )
}