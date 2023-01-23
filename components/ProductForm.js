import axios from "axios";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

export default function ProductForm(props) {
  const userId = props.session.user.image.id;
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState("");
  const [product, setProduct] = useState({
    id: null,
    userid: "",
    name: "",
    price: 0,
  });

  // if (props.addOrUpdate !== true) {
  //   setProduct(props.addOrUpdate)
  // }
  
  useEffect(() => {
    if (props.addOrUpdate !== true) {
      setProduct(props.addOrUpdate)
    }
  }, [])

  const handleChange = ({ target: { name, value } }) => {
    if (name === "name") {
      setProduct({
        ...product,
        [name]: value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
          letter.toUpperCase()
        ),
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (props.addOrUpdate !== true) {
        const result  = await axios.put("/api/products/update/" + product.id, product)

        if (result.data.success) {
          setMessage(result.data.message)
          setStyle("text-center text-green-700 italic")
          props.getData()
        }
      } else {
        const result = await axios.post("/api/products", product);

        if (result.data.success) {
          setMessage(result.data.message);
          setStyle("text-center text-green-700 italic");
          setProduct({
            id: null,
            userid: userId,
            name: "",
            price: 0,
          });
          props.getData();
        } else {
          setMessage(result.data.message);
          setStyle("text-center text-red-700 italic");
        }
      }
  
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex w-full justify-center my-3">
      <div className="border p-3 rounded-md">
        <button
          className="flex ml-auto"
          onClick={() => props.setVisible(!props.visible)}
        >
          <GrClose size={14} color="red" />
        </button>
        <div className="flex justify-between mb-2">
          <h1 className="font-bold">{props.addOrUpdate === true ? "Add Product" : "Update Product"}</h1>
        </div>
        <div className={style}>{message}</div>
        <form onSubmit={handleSubmit}>
          <div className="lg:grid lg:grid-cols-2 gap-4">
            <div className="mb-2">
              <label htmlFor="name" className="text-sm">
                Product Name:
              </label>
              <br />
              <input
                className="w-full border px-2 py-1"
                type="text"
                placeholder="product name.."
                name="name"
                required
                maxLength="32"
                onChange={handleChange}
                value={product.name}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="price" className="text-sm">
                Product Price:
              </label>
              <br />
              <input
                className="w-full border px-2 py-1"
                type="number"
                placeholder="product price.."
                name="price"
                required
                maxLength="32"
                onChange={handleChange}
                value={product.price}
              />
            </div>
          </div>

          <div className="mt-5">
            <button className="w-full defaultBtn py-1 px-3 hover:bg-blue-700">
              {props.addOrUpdate === true ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
