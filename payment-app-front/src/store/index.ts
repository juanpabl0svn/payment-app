import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product';
import userReducer from './slices/user';
import PaymentReducer from './slices/payment';
import transactionReducer from './slices/transaction';


export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    payment: PaymentReducer,
    transaction: transactionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;