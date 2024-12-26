import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  isPropertiesloading: false,
  error: null,
};

const propertySlices = createSlice({
  name: "property",
  initialState,
  reducers: {
    fetchPropertiesStart(state) {
      state.isPropertiesloading = true;
    },
    fetchPropertiesSuccess(state, action) {
      state.isPropertiesloading = false;
      state.properties = action.playload;
    },
    fetchPropertiesFailure(state, action) {
      state.isPropertiesloading = false;
      state.error = action.payload;
    },
  },
});

export const {fetchPropertiesStart,fetchPropertiesSuccess,fetchPropertiesFailure} = propertySlices.actions;
export default propertySlices.reducer;
