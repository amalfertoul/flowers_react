import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, deleteProduct } from "../redux/slices/productsSlice";

const ProductsComponent = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.products);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
  });


  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] }); // Store file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.image || !product.price || !product.stock) {
      alert("Please fill all fields!");
      return;
    }

    dispatch(addProduct(product)); // Dispatch with file
    setProduct({ name: "", price: "", stock: "", image: null });
    e.target.reset(); // Reset file input
  };


  return (
    <div>
      <h2>Products</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {items.map(product => (
          <li key={product.id}>
            
            {product.name} - ${product.price} (Stock: {product.stock})
          
          <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>

          </li>
        ))}
      </ul>
      
      <h3>Add Product</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {status === "loading" ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductsComponent;
