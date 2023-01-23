import { pool } from '../../../config/db'

export default function handler(req, res) {
    switch(req.method) {
        case 'POST':
            return saveProduct(req, res)
    }
}

const saveProduct = async (req, res) => {
    try {
        const { userid, name, price  } = req.body

        // Check if product name exists
        const [checkName] = await pool.query("SELECT * FROM products WHERE userid=? AND name=?", [userid, name])
        if(checkName.length > 0) {
            return res.status(200).json({success: false, message: "Name already exist."})
            // if (checkName[0].userid === userid) {
            //     return res.status(200).json({success: false, message: "Name already exist."})
            // } else {
            //     const [result] = await pool.query("INSERT INTO products SET ?", {
            //         userid, name, price
            //     })
            //     return res.status(200).json({success: true, message: name + " has been added."})
            // }   
        } else {
            const [result] = await pool.query("INSERT INTO products SET ?", {
                userid, name, price
            })
        }
        return res.status(200).json({success: true, message: name + " has been added."})
    } catch (error) {
        console.log(error.message)
    }
}