import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFlowersDiskApi, updateFlowersDiskApi } from "../../api/flowersdiskapi";

export const fetchFlowersDisk = createAsyncThunk("flowersdisk/fetchAll", fetchFlowersDiskApi);
export const updateFlowersDisk = createAsyncThunk("flowersdisk/update", updateFlowersDiskApi);

const flowersDiskSlice = createSlice({
  name: "flowersdisk",
  initialState: { items: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlowersDisk.fulfilled, (state, action) => { 
        state.items = action.payload; 
      })
      .addCase(updateFlowersDisk.fulfilled, (state, action) => {
        const updatedFlower = action.payload;
        if (updatedFlower && updatedFlower.id) {
          const index = state.items.findIndex((flower) => flower.id === updatedFlower.id);
          if (index !== -1) state.items[index] = updatedFlower;
        } else {
          console.error("Update failed: Flower not found or invalid.");
        }
      });
  },
});

export default flowersDiskSlice.reducer;
