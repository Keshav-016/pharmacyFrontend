import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { notify } from '../App';
import { userSocket } from '../components/NavbarDefault';
import Swal from 'sweetalert2';

const baseUrl = `http://localhost:3003`;
export const getAllUserOrders = createAsyncThunk(
    'orders/getUserOrders',
    async function () {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `${baseUrl}/user-order/user-get-all`,
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

export const showCurrentOrder = createAsyncThunk(
    'orders/showCurrentOrder',
    async function (id) {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `${baseUrl}/user-order/get-order?orderId=${id}`,
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

const showOrderConfirmed = (continueShopping,viewOrder) => {
    Swal.fire({
        html: `<span class="font-default-font-family text-[#737A83] text-[1rem]">${'Your order has been successfully placed'}</span>`,
        icon: `success`,
        showCancelButton: true,
        confirmButtonColor: '#1444ef',
        cancelButtonColor: '#929292',
        cancelButtonText: 'Continue Shopping',
        confirmButtonText: `${'View Order'}`
    })
        .then(function (confirm) {
            if (confirm.isConfirmed) {
                // let url = location.href;
                // location.href = 'http://localhost:5173/user-profile/order';
                viewOrder()
            } else {
                // let url = location.href;
                // location.href = 'http://localhost:5173/meds';
                continueShopping()
                
            }
        })
        .catch(function (reason) {
            alert('The alert was dismissed by the user: ' + reason);
        });
};

export const addNewOrder = createAsyncThunk(
    'orders/addNewOrder',
    async function ({formData,continueShopping,viewOrder}) {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'post',
                url: 'http://localhost:3003/user-order/make-order',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
                data: formData
            });
            showOrderConfirmed(continueShopping,viewOrder);
            userSocket.emit('placeOrder', rawData);
            return rawData.data.data;
        } catch (error) {
            notify(error.response.data.message);
        }
    }
);

const userOrders = createSlice({
    name: 'orders',
    initialState: {
        data: null,
        viewingOrder: null,
        totalPendingOrders: 0
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUserOrders.pending, () => {});
        builder.addCase(getAllUserOrders.fulfilled, (state, action) => {
            state.data = action.payload;
            let countPendingOrders = 0;
            action.payload.forEach((ele) => {
                if (ele.status === 'pending') {
                    countPendingOrders++;
                }
            });
            state.totalPendingOrders = countPendingOrders;
        });
        builder.addCase(getAllUserOrders.rejected, () => {});

        builder.addCase(addNewOrder.pending, () => {});
        builder.addCase(addNewOrder.fulfilled, (state, action) => {
            state.data.push(action.payload);
        });
        builder.addCase(addNewOrder.rejected, () => {});

        builder.addCase(showCurrentOrder.pending, () => {});
        builder.addCase(showCurrentOrder.fulfilled, (state, action) => {
            state.viewingOrder = action.payload;
        });
        builder.addCase(showCurrentOrder.rejected, () => {});
    }
});

export default userOrders.reducer;
