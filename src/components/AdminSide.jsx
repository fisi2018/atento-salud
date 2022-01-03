import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Sidebar = () => {
  const {push,pathname}=useRouter();
  const [option,setOption]=useState({
    pacientes:false,
    camas:false,
    medicos:false,
    usuarios:false,
    enfermedades:false
  });
  console.log("path ",pathname.split("/").pop());
  return (
    <>
      <div className="adminSide-block" >
        <header>
          <h1>Atento Salud</h1>
        </header>
        <article>
          <div className="profile-block" >
          <span className="profile-img-block" >
            <img src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433__480.png" alt="admin profile" />
          </span>
          <div className="profile-info-block" >
            <p>Nombres Apellidos</p>
            <p>Administrador</p>
          </div>
          <span>
            <i className="fas fa-sort-down" />
          </span>
          </div>
        </article>
        <span>
        <hr />
        </span>
        <div className="features-block" >
            <ul>
              <li>
                <div className="dropdown-block" >
                  <Link href="/admin" passHref >
                  <div className={`dropdown-title-element ${pathname.split("/").pop()==="admin" && "element-active"}`} >
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
                  <div onClick={()=>!option.pacientes ? setOption({...option,pacientes:true}) : setOption({...option,pacientes:false})} className={`dropdown-title-element ${(pathname.split("/").pop()==="pacientes-atender" || pathname.split("/").pop()==="agregarPaciente" ) && "element-active"}`} >
                      <span>
                        <i className="fas fa-user-injured" ></i>
                      </span>
                      <p>Pacientes</p>
                      <span className={option.pacientes && `active-icon`} >
                        <i className="fas fa-sort-down " ></i>
                      </span>
                  </div>
                  {option.pacientes && <>
                  <Link href="/admin/pacientes-atender" passHref >
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Mostrar</p>
                  </div>
                  </Link>
                  <Link href="/admin/pacientes-atender/agregarPaciente" passHref >
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Agregar paciente</p>
                  </div>
                  </Link>
                  </>}
                </div>
              </li>
              <li>
                <div className="dropdown-block" >
                  <div onClick={()=>!option.camas ? setOption({...option,camas:true}) : setOption({...option,camas:false})}  className={`dropdown-title-element ${(pathname.split("/").pop()==="camas" || pathname.split("/").pop()==="agregarCama") && "element-active"}`} >
                      <span>
                        <i className="fas fa-procedures" ></i>
                      </span>
                      <p>Camas</p>
                      <span className={option.camas && `active-icon`} >
                        <i className="fas fa-sort-down" ></i>
                      </span>
                  </div>
                  {option.camas && <>
                  <Link href="/admin/camas" passHref >
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Mostrar</p>
                  </div>
                  </Link>
                  <Link href="/admin/camas/agregarCama" passHref >
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Agregar cama</p>
                  </div>
                  </Link>
                  </>}
                </div>
              </li>
              <li>
                <div className="dropdown-block" >
                  <div onClick={()=>!option.medicos ? setOption({...option,medicos:true}) : setOption({...option,medicos:false})}  className={`dropdown-title-element ${(pathname.split("/").pop()==="especialistas" || pathname.split("/").pop()==="agregarDoctor") && "element-active"}`} >
                      <span>
                        <i className="fas fa-user-md" ></i>
                      </span>
                      <p>Médicos</p>
                      <span className={option.medicos && `active-icon`} >
                        <i className="fas fa-sort-down" ></i>
                      </span>
                  </div>
                  {option.medicos && <>
                  <Link href="/admin/especialistas" passHref >
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Mostrar</p>
                  </div>
                  </Link>
                  <Link href="/admin/especialistas/agregarDoctor" passHref >
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Agregar médico</p>
                  </div>
                    </Link>
                  </>}
                </div>
              </li>
              <li>
                <div className="dropdown-block" >
                  <div onClick={()=>!option.usuarios ? setOption({...option,usuarios:true}) : setOption({...option,usuarios:false})}  className={`dropdown-title-element ${(pathname.split("/").pop()==="asegurados" || pathname.split("/").pop()==="agregarUsuario") && "element-active"}`} >
                      <span>
                        <i className="fas fa-user" ></i>
                      </span>
                      <p>Usuarios</p>
                      <span className={option.usuarios && `active-icon`} >
                        <i className="fas fa-sort-down" ></i>
                      </span>
                  </div>
                  {option.usuarios && <>
                  <Link href="/admin/asegurados" passHref >
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Mostrar</p>
                  </div>
                  </Link>
                  <Link href="/admin/asegurados/agregarUsuario" passHref>
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Agregar usuario</p>
                  </div>
                  </Link>
                  </>}
                </div>
              </li>
              <div className="dropdown-block" >
                  <div onClick={()=>!option.enfermedades ? setOption({...option,enfermedades:true}) : setOption({...option,enfermedades:false})}  className={`dropdown-title-element ${(pathname.split("/").pop()==="enfermedades" || pathname.split("/").pop()==="agregarEnfermedad") && "element-active"}`} >
                      <span>
                        <i className="fas fa-notes-medical" ></i>
                      </span>
                      <p>Enfermedades</p>
                      <span className={option.enfermedades && `active-icon`} >
                        <i className="fas fa-sort-down" ></i>
                      </span>
                  </div>
                  {option.enfermedades && <>
                  <Link href="/admin/enfermedades" passHref>
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Mostrar</p>
                  </div>
                  </Link>
                  <Link href="/admin/enfermedades/agregarEnfermedad" passHref >
                  <div className="dropdown-title-element dropdown-element">
                    <span>
                      <i className="fas fa-dot-circle" ></i>
                    </span>
                    <p>Agregar Enfermedad</p>
                  </div>
                  </Link>
                  </>}
                </div>
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
  );
};

export default Sidebar;
