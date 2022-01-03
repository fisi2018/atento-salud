import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../../../firebase";
import Sidebar from "../../components/SideBar";

export default function User() {
  const {push}=useRouter();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
            if(user){
                console.log("Usuario logeado ",user);
            }else{
                console.log("no logeado");
                push("/login");
            }
        })
  },[]);
  return (
    <>
      <div className="user-content">
        <Sidebar></Sidebar>
        <div className="user-main">User Content</div>
      </div>
    </>
  );
}
