import { useState } from "react"
import SigninForm from "./SigninForm"
import SignupForm from "./SignupForm"

export default function Homepage(props) {

    const [signin, setSignin] = useState(true)

    const handleToggle = () => {
        setSignin(!signin)
    }

    return (
        <>
            <div className="flex justify-center items-center lg:h-screen">
                <div className="grid lg:grid-cols-2 mt-5 items-center lg:gap-20">
                    <div>
                        <h1 className="font-bold text-2xl text-center">WELCOME TO</h1>
                        <h1 className="font-bold text-4xl text-center">APPRESTO</h1>
                        <img src="images/waiter.png" />
                    </div>
                    <div>
                        <div className="bg-white p-4 rounded-lg">
                            <div>
                                <h1 className="font-bold text-lg text-center">{signin? "Sign In" : "Sign Up"}</h1>
                            </div>
                            <div>
                                <h1></h1>
                            </div>
                            <div>
                                {signin ? (
                                    <>
                                        <SigninForm csrfToken={props.csrfToken} />
                                    </>
                                ) : (
                                    <>
                                        <SignupForm />
                                    </>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleToggle} className="text-blue-400 font-bold text-lg italic">{signin ? "Sign Up" : "Sign In"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}