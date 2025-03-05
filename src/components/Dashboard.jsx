import { useSelector } from "react-redux";
import React, { useState } from "react";
import ProductsComponent from "./ProductsComponent";
import CartComponent from "./CartComponent";
import EventsComponent from "./EventsComponent";
import OrdersComponent from "./OrdersComponent";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import UsersComponent from "./UsersComponent";
import Logout from "./Logout";

const Dashboard = () => {
  const { loading } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const [editingReview, setEditingReview] = useState(null);

  return (
    <div>
      <h2>Dashboard</h2>
      {loading ? <p>Loading...</p> :
      user ? (
        <>
          <p>Welcome, {user.fullname}!</p>
          <div>
            <ProductsComponent />
            <CartComponent />
            <EventsComponent />
            <OrdersComponent />
            <ReviewForm editingReview={editingReview} setEditingReview={setEditingReview} />
            <ReviewList setEditingReview={setEditingReview} />           
            <UsersComponent />
          </div>
        </>
      ) : (
        <p>Please log in.</p>
      )}
      {user && <Logout />}
    </div>
  );
};

export default Dashboard;


