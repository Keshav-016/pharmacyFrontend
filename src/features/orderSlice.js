import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchFinalOrders = createAsyncThunk(
    'orders/fetchFinalOrders',
    async function () {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const orderData = await axios({
                method: 'GET',
                url: 'http://localhost:3003/final-order/get-orders-pharmacist',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return Promise.resolve(orderData);
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        data: null,
        isLoading: false,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFinalOrders.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
        });
        builder.addCase(fetchFinalOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.data = action.payload.data.data;
        });
        builder.addCase(fetchFinalOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
        });
    }
});

export default orderSlice.reducer;
