import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { notify } from '../App';

export const fetchAllCustomerList = createAsyncThunk(
    'adminAllCustomer/fetchAllCustomerList',
    async function (page) {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/customers/get-all?page=${page}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(page);
            return rawData;
        } catch (err) {
            notify(err.response.data.message);
        }
    }
);

export const deleteFromCustomerList = createAsyncThunk(
    'adminAllCustomer/deleteFromCustomerList',
    async function (id) {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'delete',
                url: `http://localhost:3003/customers/delete?id=${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return rawData;
        } catch (err) {
            notify(err.response.data.message);
        }
    }
);

const adminAllCustomerDetails = createSlice({
    name: 'adminAllCustomer',
    initialState: {
        data: [],
        totalPageCount: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCustomerList.pending, () => {});
        builder.addCase(fetchAllCustomerList.fulfilled, (state, action) => {
            console.log(action.payload);
            state.totalPageCount = action.payload.data.totalCustomer;
            state.data = action.payload.data.data;
        });
        builder.addCase(fetchAllCustomerList.rejected, () => {});

        builder.addCase(deleteFromCustomerList.pending, () => {});
        builder.addCase(deleteFromCustomerList.fulfilled, (state, action) => {
            state.data = state.data.filter(
                (item) => item._id !== action.payload.data.data._id
            );
            state.totalPageCount = action.payload.data.totalCustomer;
        });
        builder.addCase(deleteFromCustomerList.rejected, () => {});
    }
});

export default adminAllCustomerDetails.reducer;
