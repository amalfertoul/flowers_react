import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersApi, addUserApi, deleteUserApi } from "../../api/usersApi";

export const fetchUsers = createAsyncThunk("users/fetchAll", fetchUsersApi);
export const addUser = createAsyncThunk("users/add", addUserApi);
export const deleteUser = createAsyncThunk("users/delete", deleteUserApi);

const usersSlice = createSlice({
  name: "users",
  initialState: { items: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addUser.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(deleteUser.fulfilled, (state, action) => { state.items = state.items.filter(u => u.id !== action.payload); });
  },
});

export default usersSlice.reducer;
