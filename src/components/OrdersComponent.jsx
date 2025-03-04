import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder } from "../redux/slices/ordersSlice";

const OrdersComponent = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {items.map(order => (
          <li key={order.id}>
            Order #{order.id}, {order.trackingNumber} status: {order.status} <button onClick={() => dispatch(deleteOrder(order.id))}>Cancel Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersComponent;
