import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, addToCart, removeCartItem } from "../redux/slices/cartSlice";

const CartComponent = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            Product ID: {item.product_id} - Quantity: {item.quantity} <button onClick={() => dispatch(removeCartItem(item.id))}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(addToCart({ id: 1, name: "Sample Item", quantity: 1 }))}>Add Sample Item</button>
    </div>
  );
};

export default CartComponent;
