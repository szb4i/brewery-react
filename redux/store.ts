import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import breweryReducer from './breweryReducer'
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  reducer: {
    brewery: breweryReducer
  },
  devTools: true
})

const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const wrapper = createWrapper<AppStore>(makeStore)
