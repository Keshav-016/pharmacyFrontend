import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import updateCartHelper from '../utils/updateCartHelper';
import axios from 'axios';

const baseUrl = `http://localhost:3003`;

export const getCartItems = createAsyncThunk(
    'usercart/getCartItems',
    async function () {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `${baseUrl}/cart/get-cart-data`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const cartItems = rawData?.data?.data?.cartItems?.map((item) => {
                const medsData = { ...item };
                const quantity = item.quantity;
                delete medsData.quantity;
                return { medicineData: { medicineId: medsData }, quantity };
            });
            return cartItems;
        } catch (e) {
            console.log(e);
        }
    }
);

const userCartSlice = createSlice({
    name: 'userCart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            console.log(action.payload);
            const foundProduct = state.find(
                (ele) =>
                    ele?.medicineData?.medicineId?.medicineId?._id ===
                    action.payload._id
            );
            let qty = foundProduct?.quantity;
            if (foundProduct) {
                foundProduct.quantity++;
                qty++;
            } else {
                qty = 1;
                state.push({
                    medicineData: {
                        medicineId: { medicineId: action.payload }
                    },
                    quantity: 1
                });
            }
            updateCartHelper(action.payload._id, qty);
        },
        decreaseQuantity(state, action) {
            const foundProductIndex = state.findIndex(
                (ele) =>
                    ele?.medicineData?.medicineId?.medicineId?._id ===
                    action.payload._id
            );
            let qty =
                foundProductIndex >= 0 ? state[foundProductIndex].quantity : 0;
            if (foundProductIndex >= 0) {
                if (state[foundProductIndex].quantity > 1) {
                    state[foundProductIndex].quantity--;
                    qty--;
                } else {
                    state.splice(foundProductIndex, 1);
                    qty = 0;
                }
                updateCartHelper(action.payload._id, qty);
            }
        },
        deleteSingelCartItem(state, action) {
            const foundProductIndex = state.findIndex(
                (ele) =>
                    ele?.medicineData?.medicineId?._id ===
                    action.payload.item.medicineId._id
            );
            let qty = 0;
            state.splice(foundProductIndex, 1);
            updateCartHelper(
                action.payload.item.medicineId.medicineId._id,
                qty
            );
        },
        updateItemQty(state, action) {
            const foundProductIndex = state.findIndex(
                (ele) =>
                    ele?.medicineData?.medicineId?.medicineId?._id ===
                    action.payload.id
            );
            let qty = action.payload.qty;
            state[foundProductIndex].quantity = qty;
            updateCartHelper(action.payload.id, qty);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, () => {});
        builder.addCase(getCartItems.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(getCartItems.rejected, () => {});
    }
});

export const {
    addToCart,
    decreaseQuantity,
    deleteSingelCartItem,
    updateItemQty
} = userCartSlice.actions;

export default userCartSlice.reducer;
