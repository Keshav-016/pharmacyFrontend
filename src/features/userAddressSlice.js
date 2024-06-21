import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllUserAddress = createAsyncThunk(
    'userAddress/fetchAllUserAddress',
    async function () {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/user-address/get-address`,
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

const userAddressSlice = createSlice({
    name: 'userAddress',
    initialState: {
        isLoading: false,
        data: [],
        deliveryAddress: [],
        isError: null
    },
    reducers: {
        deliveryAddress(state, action) {
            const foundAddress = state.data.find(
                (ele) => ele._id === action.payload
            );
            state.deliveryAddress = foundAddress;
        },
        clearUserAddress(state, action) {
            state.data = [];
            state.deliveryAddress = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUserAddress.pending, () => {});
        builder.addCase(fetchAllUserAddress.fulfilled, (state, action) => {
            if (action.payload !== null) {
                state.deliveryAddress = action?.payload[0];
                state.data = action.payload;
            } else {
                state.deliveryAddress = [];
            }
        });
        builder.addCase(fetchAllUserAddress.rejected, () => {});
    }
});

export const { deliveryAddress, clearUserAddress,updateNewAddress } = userAddressSlice.actions;
export default userAddressSlice.reducer;
