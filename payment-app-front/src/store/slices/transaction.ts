import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import { States, TransactionState } from '../../utils/interfaces';



const initialState: TransactionState = {
    transaction: null,
    status: States.NULL,
};

export const fetchTransaction = createAsyncThunk('transaction/fetchTransaction', async (id: string) => {
    const response = await axios.get(`${API_URL}/transactions/${id}`);
    return response.data.data[0];
});

const transactionSlide = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransaction.pending, (state) => {
                state.status = States.LOADING;
            })
            .addCase(fetchTransaction.fulfilled, (state, action) => {
                state.transaction = action.payload;
                state.status = States.SUCCESS;
            })
            .addCase(fetchTransaction.rejected, (state) => {
                state.status = States.ERROR;
            });
    },
});

export default transactionSlide.reducer;
