import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "./themeSlice"
import experiencesReducer from "./experiencesSlice"
import skillsReducer from "./skillsSlice"
import sketchesReducer from "./sketchesSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    experiences: experiencesReducer,
    skills: skillsReducer,
    sketches: sketchesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
