import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "../../../components/hooks/useForm";
import LayoutAdmin from "../../../components/layout/LayoutAdmin";
import {API} from "../../../consts/api";
import toast,{Toaster} from "react-hot-toast";
export default function Asegurados() {
  const [users,setUsers]=useState([]);
  const {form,setForm,handleChange}=useForm({
    visibility:false
  });
  const fetchData=async()=>{
    try{
    const response=await fetch(`${API}user`);
    const users=await response.json();
    setUsers(users);
  }catch(err){
    console.log("error ",err);
  }
  }
  useEffect(()=>{
    fetchData();
  },[]);
  const update=async(e)=>{
    e.preventDefault();
    try{
      form.role==="admin" && setForm({...form,codAsegurado:""});
      const response=await axios.put(`${API}user/updateUser`,form);
      const data=await response.data;
      console.log("response ",data);
      await fetchData();
    }catch(err){
      console.log("error ",err);
    }
  }
  const removeItem=async(id)=>{
    try{
      const response=await axios.post(`${API}user/removeUser`,{id});
      const data=await response.data;
      console.log("message ",data);
      if(data.error){
        toast.error(data.message)
      }else{
        toast.success(data.message);
        await fetchData();
      }
    }catch(err){
      console.log("error ",err);
    }
  }
  return (
    <LayoutAdmin>
      <Toaster/>
      <section>

        <div className="admin-main">
          <div className="d-flex w-100 flex-column justify-content-center align-items-center">
            <h1 className="mb-3">Usuarios</h1>
            <div className="input-group px-5 mb-5">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                aria-label="Buscar..."
                aria-describedby="button-addon2"
              />
              <button className="btn btn-dark" type="button" id="button-addon2">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombres</th>
                  <th scope="col">Email</th>
                  <th scope="col">DNI</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Dirección</th>
                  <th scope="col" >Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user,index)=>(
                  <tr key={user._id} >
                      <th scope="row">{index+1}</th>
                      <td>{user.nombres} {user.apellidos}</td>
                      <td>{user.email}</td>
                      <td>{user.dni}</td>
                      <td>{user.role}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>
                        <button onClick={()=>setForm({
                          ...user,
                          id:user._id,
                          visibility:true
                        })} ><i className="fas fa-edit" ></i></button>
                        <button onClick={()=>removeItem(user._id)} ><i className="fas fa-trash-alt"></i></button>
                      </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
             {form.visibility && 
            <form onSubmit={update} >
              <h2>Editar información de usuario</h2>
              <input className="form-control" onChange={handleChange} name="address" value={form.address} placeholder="Dirección" type="text" />
              <input className="form-control" onChange={handleChange} name="dni" value={form.dni} placeholder="DNI" type="number" />
              <input className="form-control" onChange={handleChange} name="phone" value={form.phone} placeholder="Teléfono de contacto" type="number" />
              <input className="form-control" onChange={handleChange} name="email" value={form.email} placeholder="Email con el que ingresará" type="email" />
              <input className="form-control" onChange={handleChange} name="password" value={form.password} placeholder="Contraseña" type="text" />
              <input className="form-control" onChange={handleChange} name="nombres" value={form.nombres} placeholder="Nombres" type="text" />
              <input className="form-control" onChange={handleChange} name="apellidos" value={form.apellidos} placeholder="Apellidos" type="text" />
              <select className="form-control" onChange={handleChange} value={form.role} name="role">
                <option value="">Seleccione el rol a asignar</option>
                <option value="user">Usuario regular</option>
                <option value="admin">Administrador</option>
              </select>
              {form.role==="user" && 
              <input className="form-control" onChange={handleChange} name="codAsegurado" value={form.codAsegurado} placeholder="Código del asegurado" type="text" />
              }
              <article>
              <button className="btn btn-danger" onClick={()=>setForm({...form,visibility:false})}>Cancelar</button>
              <button type="submit" className="btn btn-primary" >Guardar cambios</button>
              </article>
            </form>
            }
          </div>
        </div>
      </section>
        <style jsx>{`
         h2{
        font-weight:lighter;
        text-align:center;
      }
      form{
        box-shadow:0 0.5rem 1.5rem rgba(0,0,0,0.2);
        display:flex;
        flex-direction:column;
        padding:2rem;
      }
      form>input,
      select{
        margin:0.5rem;
        border-radius:0.5rem;
        width:20rem;
        padding:0.5rem;
        border:0.1rem solid rgba(0,0,0,0.2);
      }
      td>button{
        background-color:transparent;
        color:white;
        border:0;
      }
      article{
        display:flex;
        justify-content:space-around;
      }
      section{
        padding:1rem;
      }
        `}</style>
    </LayoutAdmin>
  );
}
/*export async function getServerSideProps(){
  try{
    const response=await fetch("https://atento-salud.vercel.app/api/user");
    const users=await response.json();
    return{
      props:{
        users
      }
    }
  }catch(err){
    return{
      props:{
        message:"Ha ocurrido un error en el SSR",
        error:err
      }
    }
  }
}*/