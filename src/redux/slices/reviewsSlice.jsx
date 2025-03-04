import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchReviewsApi, addReviewApi, updateReviewApi, deleteReviewApi } from "../../api/reviewsApi";

// Async actions
export const fetchReviews = createAsyncThunk("reviews/fetchAll", fetchReviewsApi);
export const addReview = createAsyncThunk("reviews/add", addReviewApi);
export const updateReview = createAsyncThunk("reviews/update", updateReviewApi);
export const deleteReview = createAsyncThunk("reviews/delete", deleteReviewApi);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { items: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addReview.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteReview.fulfilled, (state, action) => { state.items = state.items.filter(r => r.id !== action.payload); });
  },
});

export default reviewsSlice.reducer;
