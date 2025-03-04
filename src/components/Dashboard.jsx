import { useSelector } from "react-redux";
import ProductsComponent from "./ProductsComponent";
import CartComponent from "./CartComponent";
import EventsComponent from "./EventsComponent";
import OrdersComponent from "./OrdersComponent";
import ReviewsComponent from "./ReviewsComponent";
import UsersComponent from "./UsersComponent";
import Logout from "./Logout";

const Dashboard = () => {
  const { loading } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

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
            <ReviewsComponent />
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


