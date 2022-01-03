import Link from "next/link";
import Adminside from "../../../components/AdminSide";
export default function Tables(){
    return(
        <>
        <div className="admin-content">
        <Adminside></Adminside>
        <div className="admin-main block-tables">
            <Link href="/admin/asegurados" >
                <a>Asegurados</a>
            </Link>
            <Link href="/admin/camas" >
                <a>Camas</a>
            </Link>
            <Link href="/admin/enfermedades" >
                <a>Enfermedades</a>
            </Link>
            <Link href="/admin/especialistas" >
                <a>Especialistas</a>
            </Link>
            <Link href="/admin/familiares" >
            <a>Familiares</a>
            </Link>
            <Link href="/admin/pacientes-atender" >
                <a>Pacientes a atender</a>
            </Link>
        </div>
      </div>
      <style jsx >{`
        .block-tables{
            display:flex;
            flex-direction:column;
            
        }
      `}</style>
        </>
    )
}