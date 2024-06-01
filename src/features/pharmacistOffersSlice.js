import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = `http://localhost:3003`;

export const getAllPharmacistOffer = createAsyncThunk(
    'offers/getAllPharmacistOffer',
    async function (id) {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `${baseUrl}/quotation/get-offers-user?orderId=${id}`,
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

const pharmacistOffers = createSlice({
    name: 'pharmacistOffers',
    initialState: {
        data: null
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPharmacistOffer.pending, () => {});
        builder.addCase(getAllPharmacistOffer.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(getAllPharmacistOffer.rejected, () => {});
    }
});

export default pharmacistOffers.reducer;
