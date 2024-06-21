import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { notify } from '../App';

export const getPharmaciesDetails = createAsyncThunk(
    'pharmacies/getPharmaciesDetails',
    async function (page) {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/pharma-data/getAll?page=${page}`,
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return Promise.resolve(rawData);
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
);

export const searchedPharmacy = createAsyncThunk(
    'pharmacies/searchPharmacy',
    async function (data) {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/pharma-data/search?name=${data}`,
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return Promise.resolve(rawData);
        } catch (e) {
            console.log(e);
            return Promise.reject(e);
        }
    }
);

export const pharmaciesApproval = createAsyncThunk(
    'pharmacies/pharmaciesApproval',
    async function (id) {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'put',
                url: `http://localhost:3003/pharma-data/approve?id=${id}`,
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    isApproved: true
                }
            });
            return Promise.resolve(rawData);
        } catch (err) {
            console.log(err);
            return Promise.reject(rawData);
        }
    }
);

export const pharmaciesReject = createAsyncThunk(
    'pharmacies/pharmaciesReject',
    async function (id) {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'delete',
                url: `http://localhost:3003/pharma-data/reject?id=${id}`,
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    isApproved: true
                }
            });
            return Promise.resolve(rawData);
        } catch (err) {
            console.log(err);
            return Promise.reject(rawData);
        }
    }
);

export const pharmaciesBlock = createAsyncThunk(
    'pharmacies/pharmaciesBlock',
    async function ({ id, checked }) {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'put',
                url: `http://localhost:3003/pharmacist/update-pharmacist?id=${id}`,
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    isBlocked: checked
                }
            });
            checked
                ? notify('Pharmacist has been successfully blocked')
                : notify(
                      'Pharmacist has been successfully unblocked',
                      'success'
                  );
            return Promise.resolve(rawData);
        } catch (err) {
            console.log(err);
            return Promise.reject(rawData);
        }
    }
);

const pharmaciesSlice = createSlice({
    name: 'pharmacies',
    initialState: {
        data: [],
        isLoading: false,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(getPharmaciesDetails.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getPharmaciesDetails.fulfilled, (state, action) => {
            state.data = action?.payload?.data?.data?.pharmaData;
            state.total = action?.payload?.data?.data?.total;
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(getPharmaciesDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(searchedPharmacy.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(searchedPharmacy.fulfilled, (state, action) => {
            state.data = action?.payload?.data?.data;
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(searchedPharmacy.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(pharmaciesApproval.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(pharmaciesApproval.fulfilled, (state, action) => {
            const isApproved = action.payload.data.data.isApproved;
            state?.data?.forEach((item, ind) => {
                if (item?._id === action.payload.data.data._id) {
                    state.data[ind].isApproved = isApproved;
                }
            });
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(pharmaciesApproval.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(pharmaciesReject.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(pharmaciesReject.fulfilled, (state, action) => {
            state.data = state?.data?.filter((item) => {
                item?._id !== action?.payload?.data?.data?._id;
            });
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(pharmaciesReject.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(pharmaciesBlock.pending, (state, action) => {
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(pharmaciesBlock.fulfilled, (state, action) => {
            const isBlocked = action.payload.data.data.isBlocked;
            state?.data?.forEach((item, ind) => {
                if (item?.pharmacistId._id === action.payload.data.data._id) {
                    state.data[ind].pharmacistId.isBlocked = isBlocked;
                }
            });
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(pharmaciesBlock.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export default pharmaciesSlice.reducer;
