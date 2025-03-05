import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrdersApi, createOrderApi, deleteOrderApi, downloadInvoiceApi } from "../../api/ordersApi";

export const fetchOrders = createAsyncThunk("orders/fetchAll", fetchOrdersApi);
export const createOrder = createAsyncThunk("orders/add", createOrderApi);
export const deleteOrder = createAsyncThunk("orders/delete", deleteOrderApi);
export const downloadInvoice = createAsyncThunk("orders/invoice", downloadInvoiceApi);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { items: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(createOrder.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(deleteOrder.fulfilled, (state, action) => { state.items = state.items.filter(o => o.id !== action.payload); });
  },
});

export default ordersSlice.reducer;
