import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getAllSketches } from '../services/sktetches';
import type Sketches from '../models/Sketches';

interface SketchesState {
  sketches: Sketches[];
  loading: boolean;
  error: string | null;
}

const initialState: SketchesState = {
  sketches: [],
  loading: false,
  error: null,
};

export const fetchSketches = createAsyncThunk(
  'sketches/fetchSketches',
  async () => {
    const response = await getAllSketches();
    return response;
  }
);

const sketchesSlice = createSlice({
  name: 'sketches',
  initialState,
  reducers: {
    clearSketches: (state) => {
      state.sketches = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSketches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSketches.fulfilled, (state, action: PayloadAction<Sketches[]>) => {
        state.loading = false;
        state.sketches = action.payload;
      })
      .addCase(fetchSketches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch sketches';
      });
  },
});

export const { clearSketches } = sketchesSlice.actions;
export default sketchesSlice.reducer; 