import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { notify } from '../App';

export const fetchAllCustomerList = createAsyncThunk(
    'adminAllCustomer/fetchAllCustomerList',
    async function (page) {
        try {
            const token = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/customers/get-all?page=${page}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return Promise.resolve(rawData);
        } catch (error) {
            notify(error.response.data.message);
            return Promise.reject(error);
        }
    }
);

export const searchedCustomer = createAsyncThunk(
    'adminAllCustomer/searchedCustomer',
    async function (data) {
        try {
            const token = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/customers/search?name=${data}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return Promise.resolve(rawData);
        } catch (error) {
            notify(error.response.data.message);
            return Promise.reject(error);
        }
    }
);

export const deleteFromCustomerList = createAsyncThunk(
    'adminAllCustomer/deleteFromCustomerList',
    async function (id) {
        try {
            const token = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'delete',
                url: `http://localhost:3003/customers/delete?id=${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return Promise.resolve(rawData);
        } catch (err) {
            notify(err.response.data.message);
            return Promise.reject(err);
        }
    }
);

export const blockUser = createAsyncThunk(
    'adminAllCustomer/blockUser',
    async function ({ userId, checked }) {
        try {
            const token = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'put',
                url: `http://localhost:3003/customers/update?id=${userId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: { isBlocked: !checked }
            });
            !checked
                ? notify('User has been successfully blocked')
                : notify('User has been successfully unblocked', 'success');
            return rawData;
        } catch (error) {
            console.log(error);
        }
    }
);

const adminAllCustomerDetails = createSlice({
    name: 'adminAllCustomer',
    initialState: {
        data: [],
        total: null,
        isLoading: false,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCustomerList.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(fetchAllCustomerList.fulfilled, (state, action) => {
            state.total = action.payload.data.total;
            state.data = action.payload.data.data;
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(fetchAllCustomerList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(searchedCustomer.pending, () => {});
        builder.addCase(searchedCustomer.fulfilled, (state, action) => {
            state.data = action.payload.data.data;
        });
        builder.addCase(searchedCustomer.rejected, () => {});

        builder.addCase(deleteFromCustomerList.pending, () => {});
        builder.addCase(deleteFromCustomerList.fulfilled, (state, action) => {
            state.data = state.data.filter(
                (item) => item._id !== action.payload.data.data._id
            );
            state.total = action.payload.data.total;
        });
        builder.addCase(deleteFromCustomerList.rejected, () => {});

        builder.addCase(blockUser.pending, () => {});
        builder.addCase(blockUser.fulfilled, (state, action) => {
            const isBlocked = action?.payload?.data?.data?.isBlocked;
            state?.data?.forEach((item, ind) => {
                if (item?._id === action?.payload?.data?.data._id) {
                    state.data[ind].isBlocked = isBlocked;
                }
            });
        });
        builder.addCase(blockUser.rejected, () => {});
    }
});

export default adminAllCustomerDetails.reducer;
