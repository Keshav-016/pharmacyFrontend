import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { notify } from '../App';
import showAlert from '../components/showAlert';
const baseUrl = 'http://localhost:3003';

export const loginPharmacist = createAsyncThunk(
    'pharmacist/loginPharmacist',
    async function ({ email, password, rememberMe }, { rejectWithValue }) {
        try {
            const rawData = await axios({
                method: 'post',
                url: `http://localhost:3003/pharmacist/login`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: email,
                    password: password
                }
            });
            rememberMe
                ? localStorage.setItem('token', rawData?.data?.data?.token)
                : sessionStorage.setItem('token', rawData?.data?.data?.token);
            return rawData;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const fetchPharmacistDetails = createAsyncThunk(
    'pharmacist/fetchPharmacistDetails',
    async function (data, { rejectWithValue }) {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `${baseUrl}/pharmacist/get-pharmacist`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return rawData;
        } catch (error) {
            console.log(error);
            rejectWithValue(error.response.data.message);
        }
    }
);

export const updatePharmacistDetails = createAsyncThunk(
    'pharmacist/updatePharmacistDetails',
    async function (updatedData, { rejectWithValue }) {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const rawData = await axios({
                method: 'PUT',
                url: `${baseUrl}/pharmacist/update-pharmacist`,
                data: updatedData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return rawData;
        } catch (error) {
            rejectWithValue(error.response.data.message);
        }
    }
);

export const updatePharmacistPassword = createAsyncThunk(
    'pharmacist/updatePharmacistPassword',
    async function (passwordData, { rejectWithValue }) {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const rawData = await axios({
                method: 'PUT',
                url: `${baseUrl}/pharmacist/update-pharmacist-password`,
                data: passwordData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return rawData;
        } catch (error) {
            return Promise.reject(error?.response?.data?.message);
        }
    }
);

export const sendOtp = createAsyncThunk(
    'pharmacist/sendOtp',
    async function ({ email, setShowOtp }, { rejectWithValue }) {
        try {
            const rawData = await axios({
                method: 'POST',
                url: `${baseUrl}/pharmacist/send-otp`,
                data: { email },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setShowOtp(true);
            return rawData;
        } catch (error) {
            return Promise.reject('error');
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'pharmacist/verifyOtp',
    async function ({ email, otp, setChangePassword }, { rejectWithValue }) {
        try {
            const rawData = await axios({
                method: 'POST',
                url: `${baseUrl}/pharmacist/verify-otp`,
                data: { email, otp },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setChangePassword(true);
            return rawData;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updatePharmacistImage = createAsyncThunk(
    'admin/updatePharmacistImage',
    async function (formData, { rejectWithValue }) {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const rawData = await axios({
                method: 'put',
                url: `${baseUrl}/pharmacist/update-profile-image`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
                data: formData
            });
            return rawData;
        } catch (error) {
            rejectWithValue(error.response.data.message);
        }
    }
);

const pharmacistSlice = createSlice({
    name: 'pharmacist',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    reducers: {
        logOut(state, action) {
            state.data = null;
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            action.payload.redirect();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPharmacist.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(loginPharmacist.fulfilled, (state, action) => {
            state.data = action.payload.data.data;
            state.isLoading = false;
            state.isError = false;
            showAlert('success', 'Login Successfull');
        });
        builder.addCase(loginPharmacist.rejected, (state, action) => {
            localStorage.removeItem('token');
            state.isLoading = false;
            state.isError = true;
            notify(action.payload);
        });

        builder.addCase(fetchPharmacistDetails.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(fetchPharmacistDetails.fulfilled, (state, action) => {
            state.data = action?.payload?.data?.data;
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(fetchPharmacistDetails.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.data = null;
        });

        builder.addCase(updatePharmacistImage.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(updatePharmacistImage.fulfilled, (state, action) => {
            state.data = { ...state.data, image: action.payload.data.data };
            state.isLoading = false;
            state.isError = false;
            notify('Profile Image Successfully Updated', 'success');
        });
        builder.addCase(updatePharmacistImage.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            notify('Profile Image Update failed');
        });

        builder.addCase(updatePharmacistDetails.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(updatePharmacistDetails.fulfilled, (state, action) => {
            state.data = action.payload.data.data;
            state.isLoading = false;
            state.isError = false;
            showAlert('success', 'Profile Updated successfully');
        });
        builder.addCase(updatePharmacistDetails.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            notify('Profile Updation failed');
        });

        builder.addCase(updatePharmacistPassword.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(updatePharmacistPassword.fulfilled, (state, action) => {
            state.data = action.payload.data.data;
            state.isLoading = false;
            state.isError = false;
            showAlert('success', 'Password Changed Successfully');
        });
        builder.addCase(updatePharmacistPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            notify(action.error.message);
        });

        builder.addCase(sendOtp.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(sendOtp.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            notify('Otp Sent Successfully', 'success');
        });
        builder.addCase(sendOtp.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            notify('Failed to send otp');
        });

        builder.addCase(verifyOtp.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(verifyOtp.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            notify('Otp verification Successful', 'success');
        });
        builder.addCase(verifyOtp.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            notify('Otp verification failed');
        });
    }
});

export const { logOut } = pharmacistSlice.actions;

export default pharmacistSlice.reducer;
