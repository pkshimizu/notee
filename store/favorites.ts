import { createSlice } from '@reduxjs/toolkit'

export type FavoritesState = {
  itemIds: string[]
}

export const favoritesInitialState: FavoritesState = {
  itemIds: [],
}

// actions

// selectors

// slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: favoritesInitialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default favoritesSlice
