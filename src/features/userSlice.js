import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { current } from '@reduxjs/toolkit';
import { notify } from '../App';

const baseUrl = 'http://localhost:3003';

export const fetchUser = createAsyncThunk(
    'content/fetchUser',
    async function (userObj) {
        try {
            const rawData = await axios({
                method: 'post',
                url: `${baseUrl}/customers/send-otp`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: userObj?.email
                }
            });
            return rawData;
        } catch (e) {
            console.log(e.response.data.message);
            return Promise.reject(e);
        }
    }
);

export const fetchUserByToken = createAsyncThunk(
    'content/fetchUserByToken',
    async function () {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token exists');
            }
            const rawData = await axios({
                method: 'get',
                url: `${baseUrl}/customers/get-customer`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return rawData.data.data;
        } catch (e) {
            console.log(e.response.data.message);
            return Promise.reject(e);
        }
    }
);

export const verifyUserOtp = createAsyncThunk(
    'content/verifyUserOtp',
    async function (userObj) {
        try {
            const rawData = await axios({
                method: 'post',
                url: `${baseUrl}/customers/verify-otp`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: userObj?.email,
                    otp: userObj?.otp
                }
            });
            localStorage.setItem('token', rawData.data.data.token);
            return rawData.data.data.customerData;
        } catch (e) {
            notify(e.response.data.message);
            return Promise.reject(e);
        }
    }
);

export const updateUserDetails = createAsyncThunk(
    'content/updateUserDetails',
    async function (userObj) {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'put',
                url: `${baseUrl}/customers/update`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    name: userObj?.newName,
                    phone: userObj?.newPhone
                }
            });
            return rawData.data.data;
        } catch (e) {
            notify(e.response.data.message);
            return Promise.reject(e);
        }
    }
);

export const updateUserProileImage = createAsyncThunk(
    'content/updateUserProileImage',
    async function (formData) {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'put',
                url: 'http://localhost:3003/customers/update-profile-image',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
                data: formData
            });
            return rawData.data.data;
        } catch (e) {
            notify(e.response.data.message);
            return Promise.reject(e);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(fetchUser.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(verifyUserOtp.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(verifyUserOtp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(verifyUserOtp.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(updateUserDetails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateUserDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            notify('Your data is update successfully!', 'success');
        });
        builder.addCase(updateUserDetails.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(fetchUserByToken.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUserByToken.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(updateUserProileImage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateUserProileImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = { ...state.data, image: action.payload };
            notify('Profile picture uploaded successfully!', 'success')
        });
        builder.addCase(updateUserProileImage.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export default userSlice.reducer;
