import Link from "next/link";

export default function Header(){
    return(
        <header>
            <Link href="/">
            <a >
                Inicio
            </a>
            </Link>
            <style>{`

            header{
                position:sticky;
                padding:1rem;
                top:0;
                right:0;
                left:0;
            }
            `}</style>
        </header>
    )
}