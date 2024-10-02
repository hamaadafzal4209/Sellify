import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userReducer from "./Features/user/userSlice";
import productReducer from "./Features/product/productSlice";
import categoryReducer from "./Features/category/categorySlice";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persist the store
export const persistor = persistStore(store);
export default store;
