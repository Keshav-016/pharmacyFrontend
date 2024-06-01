import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = `http://localhost:3003`;

export const getMedicineItem = createAsyncThunk(
    'currentItem/getMedicineItem',
    async function (id) {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `${baseUrl}/medicines/get-medicine?medicineId=${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return rawData.data.data;
        } catch (e) {
            console.log(e);
        }
    }
);

const currentItemSlice = createSlice({
    name: 'product',
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(getMedicineItem.pending, () => {});
        builder.addCase(getMedicineItem.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(getMedicineItem.rejected, () => {});
    }
});

export default currentItemSlice.reducer;
