import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../../../../firebase";
import LayoutUser from "../../../components/layout/LayoutUser";
import Sidebar from "../../../components/SideBar";

export default function MainCita() {
  const {push}=useRouter();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log("ususario logeado");
      }else{
        console.log("usuario nomlogeado");
        push("/login");
      }
    })
  })
  return (
    <LayoutUser>
      <section>

        <div className="user-main">
          <div className="main-content w-100 d-flex flex-column justify-content-start align-items-center mb-auto px-5">
            <h1 className="mb-5">
              Cita Médica&nbsp;
              <i className="fas fa-stethoscope"></i>
            </h1>
            <div className="buttons w-100 d-flex justify-content-between align-items-center">
              <button onClick={()=>push("/user/main-cita/data-cita")}  className="btn btn-dark">Programar citas</button>
              <button className="btn btn-dark">Mis citas</button>
            </div>
          </div>
        </div>
      </section>
      <style jsx>
        {`
        section{
          padding:0.5rem;
        }
          .img {
            background-image: url("https://emojigraph.org/media/facebook/stethoscope_1fa7a.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            width: 10rem;
            height: 10rem;
          }
        `}
      </style>
    </LayoutUser>
  );
}
