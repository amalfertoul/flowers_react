import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, deleteProduct } from "../redux/slices/productsSlice";

const ProductsComponent = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.products);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    if (productName) {
      dispatch(addProduct({ name: productName }));
      setProductName("");
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {items.map(product => (
          <li key={product.id}>
            {product.name} <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
          </li>
        ))}
      </ul>
      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default ProductsComponent;
