import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllOrdersDetails = createAsyncThunk(
    'adminAllOrder/getAllOrdersDetails',
    async function ({ page }) {
        try {
            const adminToken = localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/user-order/get-all?page=${page}`,
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return Promise.resolve(rawData);
        } catch (error) {
            notify(error.response.data.message);
            return Promise.reject(rawData);
        }
    }
);

const allOrdersSlice = createSlice({
    name: 'adminAllOrder',
    initialState: {
        data: [],
        total: null,
        isError: false,
        isLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrdersDetails.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getAllOrdersDetails.fulfilled, (state, action) => {
            state.data = action.payload.data.data.orderData;
            state.total = action.payload.data.data.total;
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(getAllOrdersDetails.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        });
    }
});

export default allOrdersSlice.reducer;
