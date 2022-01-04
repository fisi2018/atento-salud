import HeaderAdmin from "./HeaderAdmin";
import AdminSide from "../AdminSide";
export default function LayoutAdmin({children}){
    return(
        <section>
           
            <AdminSide/>
            <main>
            <HeaderAdmin/>
            {children}
            </main>
            <style jsx>{`
            section{
                width:100%;
               display:flex;
               min-height:100vh;
            }
            
            main{
                flex:1;
               
            }
            `}</style>
        </section>
    )
}