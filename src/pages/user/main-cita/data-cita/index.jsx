import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../../../../../firebase";
import Sidebar from "../../../../components/SideBar";

export default function DataCita() {
  const {push}=useRouter();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log("usuario logeado");
      }else{
        console.log("usuario no logeado ");
        push("/login");
      }
    })
  },[]);
  return (
    <>
      <div className="user-content">
        <Sidebar></Sidebar>
        <div className="user-main">
          <div className="main-content w-100 mb-auto d-flex flex-column justify-content-start align-items-center px-5">
            <h1 className="">
              Cita Médica&nbsp;
              <i className="fas fa-stethoscope"></i>
            </h1>
            <div className="boxes w-100 d-flex flex-wrap justify-content-around align-items-center">
              <div className="box d-flex justify-content-center align-items-center">Expecialistas por enfermedad</div>
              <div className="box d-flex justify-content-center align-items-center">Camas para internarse</div>
              <div className="box d-flex justify-content-center align-items-center">Enfermedades a atender</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .img {
            background-image: url("https://emojigraph.org/media/facebook/stethoscope_1fa7a.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            width: 10rem;
            height: 10rem;
          }
          .boxes {
              height: 50vh;
          }
          .box {
              min-width: 250px;
              height: 100px;
              text-align: center;
              background-color: #3D3B3B;
              color: white;
          }
        `}
      </style>
    </>
  );
}
