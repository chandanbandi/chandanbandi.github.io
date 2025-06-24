import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getAllSkills } from '../services/skills';
import type Skills from '../models/Skills';

interface SkillsState {
  skills: Skills[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillsState = {
  skills: [],
  loading: false,
  error: null,
};

export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async () => {
    const response = await getAllSkills();
    return response;
  }
);

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearSkills: (state) => {
      state.skills = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action: PayloadAction<Skills[]>) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch skills';
      });
  },
});

export const { clearSkills } = skillsSlice.actions;
export default skillsSlice.reducer; 