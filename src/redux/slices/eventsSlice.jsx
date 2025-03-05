import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEventsApi, addEventApi, updateEventApi, deleteEventApi, exportEventsApi } from "../../api/eventsApi";

export const fetchEvents = createAsyncThunk("events/fetchAll", fetchEventsApi);
export const addEvent = createAsyncThunk("events/add", addEventApi);
export const updateEvent = createAsyncThunk("events/update", updateEventApi);
export const deleteEvent = createAsyncThunk("events/delete", deleteEventApi);
export const exportEvents = createAsyncThunk("events/export", exportEventsApi);

const eventsSlice = createSlice({
  name: "events",
  initialState: { items: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addEvent.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.items.findIndex(e => e.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => { state.items = state.items.filter(e => e.id !== action.payload); });
  },
});

export default eventsSlice.reducer;
