import axios from "axios";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ProductsTable(props) {

  const [visible, setVisible] = useState(false)
  const [productId, setProductId] = useState('')
  const [deleteMessage, setDeleteMessage] = useState('')

  async function getSingleData(id) {
    try {
      const result = await axios.get("/api/products/update/" + id)
      props.setSingleProduct({
        id: result.data.id,
        userid: result.data.userid,
        name: result.data.name,
        price: result.data.price,
      })
      props.setAddOrUpdate(false)
      props.setVisible(true)
    } catch (error) {
      console.log(error.message)
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete("/api/products/"+id)
      props.getData()
      setProductId('')
      setVisible(false)
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="relative overflow-x-auto">
      {visible ? (
        <div className="bg-red-100 py-2 flex justify-center items-center mb-2">
          <h1>Delete {deleteMessage}?</h1>
          <button onClick={() => setVisible(false)} className="bg-gray-400 text-white hover:bg-gray-500 px-3 py-1 rounded-full mx-2">
            Cancel
          </button>
          <button onClick={() => deleteProduct(productId)} className="bg-red-400 text-white hover:bg-red-500 px-7 py-1 rounded-full">
            Yes
          </button>
        </div>
      ) : (
        <></>
      )}

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((data, key) => (
            <tr
              key={key}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.name}
              </th>
              <td className="px-6 py-2">{data.price}</td>
              <td className="flex items-center gap-3 px-6 py-2">
                <button
                  onClick={() => {
                    //props.getSingleData(data.id)
                    props.setVisible(false)
                    //props.getSingleData(data.id)
                    getSingleData(data.id)
                  }}
                >
                  <FaEdit size={18} className="text-green-600" />
                </button>
                <button onClick={() => {
                  setVisible(true)
                  setProductId(data.id)
                  setDeleteMessage(data.name)
                }}>
                  <RiDeleteBin6Line size={18} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
