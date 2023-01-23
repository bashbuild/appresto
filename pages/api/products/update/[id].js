import {pool} from '../../../../config/db'

export default async function handler(req, res) {
    switch(req.method) {
        case 'GET':
            return await getProduct(req, res)
        case 'PUT':
            return await updateProduct(req, res)
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.query
        const [result] = await pool.query('SELECT * FROM products WHERE id=?', id)
        //console.log(result)
        return res.status(200).json(result[0])
    } catch (error) {
        console.log(error)
        return res.json({message: error.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.query
        const { name, price } = req.body
        await pool.query("UPDATE products SET name=?, price=? WHERE id=?", [
            name, price, id
        ])
        return res.status(200).json({success: true, message: "Product has been updated."})
    } catch (error) {
        console.log(error.message)
        return res.json({message: error.message})
    }
}
