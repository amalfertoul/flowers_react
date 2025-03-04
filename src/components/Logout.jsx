import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(logoutUser())}>Logout</button>;
};

export default Logout;
