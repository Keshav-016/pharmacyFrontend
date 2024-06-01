import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPharmaModalDetails = createAsyncThunk(
    'pharmaciesModal/getPharmaModalDetails',
    async function () {
        try {
            const adminToken = localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/pharma-data/get?id=663e0eec4ed0524b3c2dd5f8`,
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return rawData;
        } catch (err) {
            console.log(err);
        }
    }
);

const pharmaciesModalSlice = createSlice({
    name: 'pharmaciesModal',
    initialState: {
        data: []
    },
    extraReducers: (builder) => {
        builder.addCase(getPharmaModalDetails.pending, () => {});
        builder.addCase(getPharmaModalDetails.fulfilled, (state, action) => {
            state.data = action.payload.data.data;
        });
        builder.addCase(getPharmaModalDetails.rejected, () => {});
    }
});

export default pharmaciesModalSlice.reducer;
