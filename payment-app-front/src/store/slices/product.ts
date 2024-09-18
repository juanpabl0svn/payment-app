// src/store/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import { ProductState, States } from '../../utils/interfaces';


const initialState: ProductState = {
  items: [],
  status: States.NULL,
};

// Fetch de productos simulados
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    buyProduct: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        product.price = product.price - action.payload.quantity;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = States.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = States.SUCCESS;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = States.ERROR;
      });
  },
});

export default productSlice.reducer;
