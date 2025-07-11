import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk('recipes/fetch', async () => {
  const res = await axios.get('http://localhost:5000/api/recipes');
  return res.data;
});

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: { list: [], status: 'idle', favorites: [] },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      });
  },
});

export const { addFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;
