import { useEffect, useState } from "react";
import Adminside from "../../components/AdminSide";
import LayoutAdmin from "../../components/layout/LayoutAdmin";
import axios from "axios";
import { API } from "../../consts/api";
export default function index() {
  const [usersIcon,setUsersIcon]=useState(Array(100).fill(true));
  const [users,setUsers]=useState([]);
  const [pacientes,setPacientes]=useState([]);
  const [camas,setCamas]=useState([]);
  const [medicos,setMedicos]=useState([]);
  const fetchData=async()=>{
    try{
      const response=await axios.get(`${API}user`);
      const users=await response.data;
      setUsers(users);
      const response2=await axios.get(`${API}paciente`);
      const pacientes=await response2.data;
      setPacientes(pacientes);
      const response3=await axios.get(`${API}cama`);
      const camas=await response3.data;
      setCamas(camas);
      const response4=await axios.get(`${API}doctor`);
      const medicos=await response4.data;
      setMedicos(medicos);
      console.log(pacientes);
    }catch(err){
      console.log("error ",err);
    }
  }
  useEffect(()=>{
    fetchData();
  },[]);
  return (
    <LayoutAdmin>
      <div className="admin-main">
        <h1>Panel de control</h1>
        <hr />
        <div className="users-block" >
          <h2>Número de usuarios registrados</h2>
          <article>
            <span className="square-block-admin" ></span>
            <p>Administrador</p>
          </article>
          <article>
            <span className="square-block-user" ></span>
            <p>Asegurado</p>
          </article>
          <div className="users-icon-block row row-cols-auto" >
            {
              usersIcon.map((val,i)=>(
                <span className={`col  ${i<users.length?"user-icon-element-exist":"user-icon-element"} ${(i<users.length && users[i].role==="admin") && " admin-icon "} ` } >
                  <i className="fas fa-male" ></i>
                </span>
              ))
            }
            
          </div>
          <p>{users.length}/100</p>
        </div>
        <div className="pacientes-block" >
          <h2>Número de pacientes</h2>
          
          <article>
            <span className="square-block-paciente" ></span>
            <p>Paciente</p>
          </article>
          <div className="users-icon-block row row-cols-auto" >
            {pacientes.length>0 &&
              usersIcon.map((val,i)=>(
                <span  className={`col ${i<pacientes.length?"paciente-icon-element-exist" :"paciente-icon-element"} ` } >
                  {i<pacientes.length ? <i className="fas fa-user-injured" ></i>
                  :
                  <i className="fas fa-male"></i>
                  }
                </span>
              ))
            }
            
          </div>
          <p>{pacientes.length}/100</p>
        </div>
        <div className="users-block" >
          <h2>Número de camas</h2>
          <article>
            <span className="square-block-admin" ></span>
            <p>Ocupadas</p>
          </article>
          <article>
            <span className="square-block-user" ></span>
            <p>Libres</p>
          </article>
          <div className="users-icon-block row row-cols-auto" >
            {
              camas.length!==0 &&
              usersIcon.map((val,i)=>(
                <span className={`col  ${i<camas.length?"user-icon-element-exist":"user-icon-element"} ${(i<camas.length && camas[i].estadoCama) && " admin-icon "} ` } >
                  <i className="fas fa-procedures" ></i>
                </span>
              ))
            }
            
          </div>
          <p>{camas.length}/100</p>
        </div>
        <div className="pacientes-block" >
          <h2>Número de médicos</h2>
          
         
          <div className="users-icon-block row row-cols-6" >
            {pacientes.length>0 &&
              medicos.map((val,i)=>(
                <span  className={`col doctor-icon user-icon-element-exist ` } >
                  <i className="fas fa-user-md" ></i>
                </span>
              ))
            }
            
          </div>
          <p >{medicos.length}</p>
        </div>
      </div>
      <style jsx>{`
      .doctor-icon{
        font-size:3rem;
      }
      .square-block-admin,
      .square-block-user,
      .square-block-paciente{
        display:block;
        width:1rem;
        height:1rem;
        border-radius:50%;
        margin-right:0.5rem;
      }
      .square-block-admin{
        background-color:#49CCB8;
      }
      .square-block-paciente{
        background-color:#3E637D;
      }
      .square-block-user{
        background-color:white
      }
      article{
        display:flex;
        align-items:center;
        padding:0.5rem 0;
      }
     
      p{
        color:white;
        text-align:right;
        margin:0;
      }
      span{
        transition:all 0.3s ease;
      }
        h1{
          font-weight:lighter;
          text-align:center;
        }
        .admin-main{
          padding:1rem;
        }
        .users-block{
          padding:1rem;
          background-color:#3E637D;
          border-radius:0.5rem;
          box-shadow:0 0.5rem 1.5rem rgba(0,0,0,0.2);
        }
        .pacientes-block{
          padding:1rem;
          margin:2rem 0;
          background-color:#00BCE2;
           box-shadow:0 0.5rem 1.5rem rgba(0,0,0,0.2);
          border-radius:0.5rem;
        }
        .user-icon-element-exist{
          color:white;
        }
        .user-icon-element{
          color:rgba(255,255,255,0.2);
        }
        .paciente-icon-element-exist{
          color:#3E637D;
        }
        .paciente-icon-element{
          color:rgba(255,255,255,0.5);
        }
        h2{
          font-weight:lighter;
          color:white;
        }
        .admin-icon{
        color:#49CCB8;
      }
      `}</style>
    </LayoutAdmin>
    
  );
}
