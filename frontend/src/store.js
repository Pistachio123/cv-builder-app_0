/** @format */

import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./state/reducers/index";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import skillReducer from "./state/reducers/skillsReducer";

// import {
//   addSkill,
//   removeSkill,
//   manageFile,
//   manageAbout,
//   manageProfile,
//   addExperience,
//   editExperience,
//   removeExperience,
//   addEducation,
//   editEducation,
//   removeEducation,
// } from "./state/action-creators/index";
import educationReducer from "./state/reducers/educationReducer";
import experienceReducer from "./state/reducers/experienceReducer";
import profileReducer from "./state/reducers/profileReducer";
import fileReducer from "./state/reducers/fileReducer";
import aboutReducer from "./state/reducers/aboutReducer";

// Combine the reducers from the 'reducers' object
const rootReducer = combineReducers({
  ...reducers,
  auth: authReducer,
  skills: skillReducer,
  file: fileReducer,
  about: aboutReducer,
  profile: profileReducer,
  experienceList: experienceReducer,
  educationList: educationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Create the store with middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, thunk),
  devTools: true,
});

// Add the action creators to the store

export default store;
