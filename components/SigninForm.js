import axios from "axios"
import { useState } from "react"


export default function SigninForm(props) {
    const [account, setAccount] = useState({
        email: "",
        password: ""
    })
    const [showPass, setShowPass] = useState(false)
    const [message, setMessage] = useState("")
    const [style, setStyle] = useState("")

    const handlePass = () => {
        setShowPass(!showPass)
    }

    const handleChange = ({ target: { name, value }}) => {
        setAccount({
            ...account, [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const result = await axios.post("/api/accounts/login", account)

            if (result.data.success) {
                setStyle("text-sm bg-green-100 py-2 my-2 italic")
                setMessage(result.data.message)
                handleSignin()
            } else {
                setStyle("text-sm bg-red-100 py-2 my-2 italic")
                setMessage(result.data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSignin = () => {
      const getIn = document.getElementById("getinForm")
      getIn.submit();
    }

    return (
        <>
            <div className={style}>
                <h1 className="text-center">{message}</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label className="text-sm" htmlFor="email">Email</label><br />
                    <input 
                        className="w-full border px-3 py-1 rounded-md"
                        name="email" 
                        id="email"
                        type="email" 
                        placeholder="example@email.com" 
                        required
                        onChange={handleChange}
                        maxLength="32"
                    />
                </div>
                <div className="mb-2">
                    <label className="text-sm" htmlFor="email">Password</label><br />
                    <input 
                        className="w-full border px-3 py-1 rounded-md"
                        name="password" 
                        id="password"
                        type={showPass ? "text" : "password"} 
                        placeholder="password" 
                        required
                        onChange={handleChange}
                        maxLength="32"
                    />
                </div>
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id="showpassword"
                        onChange={handlePass}
                    />
                    <label className="text-sm ml-2" >Show password</label>
                </div>
                <div>
                    <button className="w-full defaultBtn py-1 px-3 my-7 hover:bg-blue-700" >Sign In</button>
                </div>
            </form>

            <form 
                id="getinForm"
                className="displayNone"
                method="post"
                action="/api/auth/callback/credentials"
            >
                <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
                <input name="email" type="email" defaultValue={account.email} />
            </form>
        </>
    )
}

