import { useSession, signOut } from "next-auth/react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

export default function Contact() {
    const { data: session } =  useSession()

    return (
        <Layout>
            <Navbar session={session} signOut={signOut} />
            <div className="contentBody bg-white">
            <h1 className="text-lg font-bold">Contact</h1>
            <hr />
            <p className="mt-2">Address :</p>
            <p>Landline # :</p>
            <p>Mobile # :</p>
            <p>Email :</p>
            <p>Facebook :</p>
            </div>
        </Layout>
    )
}