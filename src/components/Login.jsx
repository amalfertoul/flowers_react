import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error} = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      console.log("User after login:", result.payload); // ✅ Debugging
    });
  };
  

  return (
    <div>
      <h2>Login</h2>
      {user ? <p>Welcome, {user.fullname}!</p> : <p>Please log in.</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
      <Link to="/dashboard">Dashboard</Link>
      <Logout />
    </div>
  );
};

export default Login;
