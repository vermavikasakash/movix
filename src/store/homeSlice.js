import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    url: {},
    genres:{},
};
export const homeSlice = createReducer(initialState, {
 
    getApiConfiguration: (state, action) => {
    state.url = action.payload;
  },
  getGenres: (state, action) => {
    state.genres = action.payload;
  },
});


