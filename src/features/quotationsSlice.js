import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuotations = createAsyncThunk(
    'quotations/getQuotations',
    async () => {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: 'http://localhost:3003/user-order/pharmacist-get-all',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return Promise.resolve(rawData.data.data);
        } catch (e) {
            return Promise.reject(e);
        }
    }
);

export const makeOffer = createAsyncThunk(
    'quotations/makeOffer',
    async (data) => {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const rawData = await axios({
                method: 'post',
                url: 'http://localhost:3003/quotation/offer',
                data,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return Promise.resolve(rawData.data.data);
        } catch (e) {
            console.log(e);
            return Promise.reject(e);
        }
    }
);

const quotationSlice = createSlice({
    name: 'quotations',
    initialState: {
        data: null,
        isLoading: false,
        error: false
    },
    reducers: {
        addMedicine(state, action) {
            state.data.forEach((item, index) => {
                if (item._id === action.payload.id) {
                    state.data[index].medicines.push({
                        medicineId: action.payload.medicineId,
                        quantity: action.payload.quantity
                    });
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuotations.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
        });
        builder.addCase(fetchQuotations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.data = action.payload;
        });
        builder.addCase(fetchQuotations.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
        });
        builder.addCase(makeOffer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.data = state?.data?.filter(
                (item) => item._id !== action.payload.orderId
            );
        });
        builder.addCase(makeOffer.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
        });
        builder.addCase(makeOffer.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
        });
    }
});

export const { addMedicine } = quotationSlice.actions;

export default quotationSlice.reducer;
