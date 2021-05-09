import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.reducer';
import noteReducer from './note.reducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer
  }
});

export default store;