import HeaderAdmin from "./HeaderAdmin";
import AdminSide from "../AdminSide";
export default function LayoutAdmin({children}){
    return(
        <section className="all-block" >
           
            <AdminSide/>
            <main>
            <HeaderAdmin/>
            {children}
            </main>
            <style jsx global>{`
            .all-block{
                width:100%;
               display:flex;
               min-height:100vh;
            }
            .user-content {
            text-align: center;
            display: grid;
            grid-template-columns: 25% 1fr;
            grid-template-rows: 1fr;
            width: 100%;
            height: 100vh;
          }
          .user-content .user-main {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10vh 10%;
          }
          a{
              text-decoration:none;
          }
          .admin-content {
            text-align: center;
            display: grid;
            grid-template-columns: 8% 1fr;
            grid-template-rows: 1fr;
            width: 100%;
            height: 100vh;
          }
          .admin-content .admin-main {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10vh 10%;
          }
            main{
                flex:1;
               
            }
            `}</style>
        </section>
    )
}