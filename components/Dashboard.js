import axios from "axios";
import { useEffect, useState } from "react";
import { RiAddFill } from "react-icons/ri";
import ProductForm from "./ProductForm";
import ProductsTable from "./ProductsTable";


export default function Dashboard(props) {
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([])
  const [singleProduct, setSingleProduct] =useState({
    id: null,
    userid: "",
    name: "",
    price: 0,
  })
  const userid = props.session.user.image.id
  const [addOrUpdate, setAddOrUpdate] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const result = await axios.get("/api/products/" + userid)
      //console.log(result.data)
      setProducts(result.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
    <>
      <div className="contextBody bg-white p-2 mt-3">
        <div className="flex justify-between">
          <div>
            {props.session.user.name}
          </div>
          <div>
            <button className="text-blue-600 hover:text-blue-700 mx-1">
              Kitchen
            </button>
            |
            <button className="text-blue-600 hover:text-blue-700 mx-1">
              Dining
            </button>
          </div>
        </div>
        <hr className="my-1" />

        <div className="flex justify-between items-center mt-4">
          <div>
            <h1 className="font-bold text-lg">PRODUCTS</h1>
          </div>

          <button
            onClick={() => {
              setVisible(true)
              setAddOrUpdate(true)
            }}
            className="flex items-center defaultBtn hover:bg-blue-700 pl-3 pr-1 py-1"
          >
            Add Product <RiAddFill size={22} />
          </button>
        </div>

        {visible ? (
          <ProductForm
            getData={getData}
            session={props.session}
            visible={visible}
            setVisible={setVisible}
            addOrUpdate={addOrUpdate ? true : singleProduct}
          />
        ) : (
          <></>
        )}

        <hr className="my-3" />

        {/* {products.id} */}
        {products.length == 0 ? (
          "No products available."
        ) : (
          <>
            <ProductsTable
              setVisible={setVisible}
              getData={getData}
              products={products}
              setSingleProduct={setSingleProduct}
              setAddOrUpdate={setAddOrUpdate}
            />
          </>
        )}
      </div>
    </>
  );
}

