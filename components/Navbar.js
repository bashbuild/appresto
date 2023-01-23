import Link from "next/link";

export default function Navbar(props) {
    return (
        <div className="flex items-center justify-between bg-white p-2 border rounded-b-lg shadow-sm">
            <div>
                <Link className="font-bold text-3xl" href='/' >RESTOAPP</Link>
            </div>
            <div>
                <div className="flex justify-evenly items-center">    
                       
                {props.session ? (    
                    <>
                        {/* <h1>{props.session.user.name}</h1> */}
                        <button className="bg-blue-400 text-white px-2 py-1 rounded-md ml-2 hover:bg-blue-700" onClick={props.signOut}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link className="ml-3 text-gray-500 hover:text-black" href='/about' >About</Link>
                        <Link className="ml-3 mr-3 text-gray-500 hover:text-black" href='/contact' >Contact</Link> 
                    </>
                )}
                </div>
            </div>
        </div>
    )
}