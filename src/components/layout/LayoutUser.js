import UserSide from "../UserSide";

export default function LayoutUser({children}){
    return(
        <section>
            <UserSide/>
            <main>
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