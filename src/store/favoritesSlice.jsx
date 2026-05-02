// src/store/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.find(
        (u) => u.login.uuid === action.payload.login.uuid
      )
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(
        (u) => u.login.uuid !== action.payload
      )
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer