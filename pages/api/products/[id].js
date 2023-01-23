import {pool} from '../../../config/db'

export default async function handler(req, res) {
    switch(req.method) {
        case 'GET':
            return await getProducts(req, res)
        case 'DELETE':
            return await deleteProducts(req, res)
    }
}

const getProducts = async (req, res) => {
    try {
        const { id } = req.query
        const [result] = await pool.query('SELECT * FROM products WHERE userid=?', id)
        //console.log(result)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.json({message: error.message})
    }
}

const deleteProducts = async (req, res) => {
    try {
        const { id } = req.query
        await pool.query("DELETE FROM products WHERE id=?", id)
        return res.status(200).json({success: true, message: "Product has benn deleted."})
    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}