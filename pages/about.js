import { useSession, signOut } from "next-auth/react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

export default function About() {
    const { data: session } = useSession()

    return (
        <Layout>
            <Navbar session={session} signOut={signOut} />
            <div className="contentBody bg-white">
                <h1 className="text-lg font-bold">About</h1>
                <hr />
                <p className="my-2">
                This is the about page.                </p>
            </div>
        </Layout>
    )
}