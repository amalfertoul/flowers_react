import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsApi, addProductApi, deleteProductApi } from "../../api/productsApi";

// Async actions
export const fetchProducts = createAsyncThunk("products/fetchAll", fetchProductsApi);
export const addProduct = createAsyncThunk("products/add", addProductApi);
export const deleteProduct = createAsyncThunk("products/delete", deleteProductApi);

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addProduct.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(deleteProduct.fulfilled, (state, action) => { state.items = state.items.filter(p => p.id !== action.payload); });
  },
});

export default productsSlice.reducer;
