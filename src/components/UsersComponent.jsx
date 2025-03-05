import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/slices/usersSlice";

const UsersComponent = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {items.map(user => (
          <li key={user.id}>
            {user.fullname} <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersComponent;
