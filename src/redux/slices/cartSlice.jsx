import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartApi, addToCartApi, updateCartItemApi, removeCartItemApi } from "../../api/cartApi";

export const fetchCart = createAsyncThunk("cart/fetchAll", fetchCartApi);
export const addToCart = createAsyncThunk("cart/add", addToCartApi);
export const updateCartItem = createAsyncThunk("cart/update", updateCartItemApi);
export const removeCartItem = createAsyncThunk("cart/remove", removeCartItemApi);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addToCart.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => { state.items = state.items.filter(i => i.id !== action.payload); });
  },
});

export default cartSlice.reducer;
