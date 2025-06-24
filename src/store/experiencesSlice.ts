import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getAllExperiences } from '../services/experiences';
import type Project from '../models/Project';



interface ExperiencesState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ExperiencesState = {
  projects: [],
  loading: false,
  error: null,
};

export const fetchExperiences = createAsyncThunk(
  'experiences/fetchExperiences',
  async () => {
    const response = await getAllExperiences();
    return response;
  }
);

const experiencesSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {
    clearExperiences: (state) => {
      state.projects = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperiences.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch experiences';
      });
  },
});

export const { clearExperiences } = experiencesSlice.actions;
export default experiencesSlice.reducer; 