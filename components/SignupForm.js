import axios from "axios"
import { useState } from "react"


export default function SignupForm() {
    const [message, setMessage] = useState("")
    const [style, setStyle] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [account, setAccount] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = ({ target: { name, value }}) => {
        if (name === "name") {
            setAccount({
              ...account,
              [name]: value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              ),
            });
        } else {
            setAccount({
                ...account,
                [name]: value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")

        try {
            const result = await axios.post("/api/accounts", account)

            if (result.data.success) {
                setStyle("text-sm bg-green-100 py-2 my-2 italic")
                setMessage(result.data.message)
                setAccount({
                    name: "",
                    email: "",
                    password: ""
                })
            } else {
                setStyle("text-sm bg-red-100 py-2 my-2 italic")
                setMessage(result.data.message)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const handlePass = () => {
        setShowPass(!showPass)
    }

    return (
        <>
            <div className={style}>
                <h1 className="text-center">{message}</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label className="text-sm" htmlFor="name">Name</label><br />
                    <input 
                        className="w-full border px-3 py-1 rounded-md"
                        name="name" 
                        id="name"
                        type="name" 
                        placeholder="Your name.." 
                        required
                        onChange={handleChange}
                        value={account.name}
                        maxLength="32"
                    />
                </div>
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
                        value={account.email}
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
                        placeholder="Your password.." 
                        required
                        onChange={handleChange}
                        value={account.password}
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
                    <button className="w-full defaultBtn py-1 px-3 my-7 hover:bg-blue-700" >Sign Up</button>
                </div>
            </form>
        </>
    )
}