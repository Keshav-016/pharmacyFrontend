import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notify } from '../App';
import axios from 'axios';

export const fetchAdminDetails = createAsyncThunk(
    'admin/fetchAdminDetails',
    async function () {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'get',
                url: 'http://localhost:3003/admin/details',
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return Promise.resolve(rawData);
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

export const updateAdminImage = createAsyncThunk(
    'admin/updateAdminImage',
    async function (formData) {
        try {
            const token = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'put',
                url: 'http://localhost:3003/admin/update-image',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
                data: formData
            });
            return Promise.resolve(rawData);
        } catch (err) {
            notify(err.response.data.message);
            return Promise.reject(rawData);
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        data: null,
        isError: false,
        isLoading: true
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdminDetails.pending, (state, action) => {
            (state.isLoading = true), (state.isError = false);
        });
        builder.addCase(fetchAdminDetails.fulfilled, (state, action) => {
            state.data = action.payload.data.data;
            (state.isLoading = false), (state.isError = false);
        });
        builder.addCase(fetchAdminDetails.rejected, (state, action) => {
            (state.isLoading = false), (state.isError = true);
        });

        builder.addCase(updateAdminImage.pending, (state, action) => {
            (state.isLoading = true), (state.isError = false);
        });
        builder.addCase(updateAdminImage.fulfilled, (state, action) => {
            state.data = { ...state.data, image: action.payload.data.data };
            (state.isLoading = false), (state.isError = false);
            notify('Profile picture updated successfully!', 'success');
        });
        builder.addCase(updateAdminImage.rejected, (state, action) => {
            (state.isLoading = false), (state.isError = true);
        });
    }
});

export default adminSlice.reducer;
