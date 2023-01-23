import { pool } from '../../../../config/db'

export default function handler(req, res) {
    switch(req.method) {
        case 'POST':
            return loginAccount(req, res)
    }
}

const loginAccount = async (req, res) => {
    try {
        const { email, password } = req.body

        // Check if email exists
        const [checkEmail] = await pool.query("SELECT * FROM accounts WHERE email=?", email)
        if(checkEmail.length > 0) {
           // Check password if macth
            if(password !== checkEmail[0].password) {
                return res.status(200).json({success: false, message: "Invalid email/password!"})
            } else {
                const user = checkEmail[0]
                return res.status(200).json({success: true, message: "Signin successfull!."})
            }
        } else {
            return res.status(200).json({success: false, message: "Invalid email/password!"})
        }        
    } catch (error) {
        console.log(error.message)
    }
}