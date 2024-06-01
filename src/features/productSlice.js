import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = `http://localhost:3003`;

export const fetchProductLists = createAsyncThunk(
    'product/fetchProductLists',
    async function (page) {
        try {
            const rawData = await axios({
                method: 'get',
                url: `${baseUrl}/medicines/get-all?page=${page}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return rawData;
        } catch (e) {
            console.log(e);
        }
    }
);

export const searchProductList = createAsyncThunk(
    'product/searchProductList',
    async function (data) {
        try {
            const rawData = await axios({
                method: 'get',
                url: `${baseUrl}/medicines/search-medicine?name=${data}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return rawData;
        } catch (e) {
            console.log(e);
        }
    }
);

export const deleteProducts = createAsyncThunk(
    'product/deleteProducts',
    async function (id) {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'delete',
                url: `${baseUrl}/medicines/delete-medicine?id=${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return rawData;
        } catch (e) {
            console.log(e);
        }
    }
);

export const updateProducts = createAsyncThunk(
    'product/updateProducts',
    async function (medsObj) {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'put',
                url: `${baseUrl}/medicines/update-medicine?id=${medsObj.id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    name: medsObj.name,
                    price: medsObj.price,
                    pack_size_label: medsObj.pack_size_label
                }
            });
            return rawData;
        } catch (e) {
            console.log(e);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductLists.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(fetchProductLists.fulfilled, (state, action) => {
            state.data = action?.payload?.data?.data.medicineData;
            state.total = action?.payload?.data?.data?.total / 12;
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(fetchProductLists.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        });

        builder.addCase(searchProductList.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(searchProductList.fulfilled, (state, action) => {
            state.data = action.payload.data.data;
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(searchProductList.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        });

        builder.addCase(deleteProducts.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(deleteProducts.fulfilled, (state, action) => {
            state.data = state.data.filter(
                (item) => item._id !== action.payload.data.data._id
            );
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(deleteProducts.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        });

        builder.addCase(updateProducts.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(updateProducts.fulfilled, (state, action) => {
            const foundProduct = state.data.findIndex(
                (ele) => ele._id === action.payload.data.data._id
            );
            state.data[foundProduct] = action.payload.data.data;
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(updateProducts.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        });
    }
});

export default productSlice.reducer;
