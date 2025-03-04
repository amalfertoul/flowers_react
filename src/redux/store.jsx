import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import eventsReducer from "./slices/eventsSlice";
import ordersReducer from "./slices/ordersSlice";
import reviewsReducer from "./slices/reviewsSlice";
import usersReducer from "./slices/usersSlice";
import authReducer from "./slices/authSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    events: eventsReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
    users: usersReducer,
  },
});

export default store;
