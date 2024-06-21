import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import updateCartHelper from '../utils/updateCartHelper';
import { notify } from '../App';
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
            const foundProduct = state.find(
                (ele) =>
                    ele?.medicineData?.medicineId?.medicineId?._id ===
                    action.payload.itemProduct._id
            );
            let qty = foundProduct?.quantity;
            if (foundProduct) {
                if(foundProduct.quantity >= 10){
                    notify('You cannot add more then 10 medicines per order');
                    return;
                }
                foundProduct.quantity++;
                qty++;
            } else {
                qty = 1;
                state.push({
                    medicineData: {
                        medicineId: { medicineId: action.payload.itemProduct }
                    },
                    quantity: 1
                });
            }
            if (action.payload.user.data === null) {
                let cartArr = JSON.parse(localStorage.getItem('cartArray'));
                if (cartArr === null) {
                    cartArr = [];
                    cartArr = [
                        ...cartArr,
                        {
                            medicineId: action.payload.itemProduct._id,
                            quantity: 1
                        }
                    ];
                    localStorage.setItem('cartArray', JSON.stringify(cartArr));
                    return;
                } else {
                    const foundProduct = cartArr.find(
                        (ele) =>
                            ele.medicineId === action.payload.itemProduct._id
                    );
                    foundProduct
                        ? foundProduct.quantity++
                        : (cartArr = [
                              ...cartArr,
                              {
                                  medicineId: action.payload.itemProduct._id,
                                  quantity: 1
                              }
                          ]);

                    localStorage.setItem('cartArray', JSON.stringify(cartArr));
                }
            } else updateCartHelper(action.payload.itemProduct._id, qty);
        },
        decreaseQuantity(state, action) {
            const foundProductIndex = state.findIndex(
                (ele) =>
                    ele?.medicineData?.medicineId?.medicineId?._id ===
                    action.payload.itemProduct._id
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

                if (action.payload.user.data === null) {
                    let cartArr = JSON.parse(localStorage.getItem('cartArray'));
                    const foundIndex = cartArr.findIndex(
                        (ele) =>
                            ele?.medicineId === action.payload.itemProduct._id
                    );
                    cartArr[foundIndex].quantity > 1
                        ? cartArr[foundIndex].quantity--
                        : cartArr.splice(foundIndex, 1);
                    localStorage.setItem('cartArray', JSON.stringify(cartArr));
                } else updateCartHelper(action.payload.itemProduct._id, qty);
            }
        },
        deleteSingelCartItem(state, action) {
            const foundProductIndex = state.findIndex(
                (ele) =>
                    ele?.medicineData?.medicineId?.medicineId?._id ===
                    action.payload.item.item.medicineId.medicineId._id
            );
            let qty = 0;
            state.splice(foundProductIndex, 1);

            if (action.payload.user.data === null) {
                let cartArr = JSON.parse(localStorage.getItem('cartArray'));
                const foundIndexArr = cartArr.findIndex(
                    (ele) =>
                        ele?.medicineId ===
                        action.payload.item.item.medicineId.medicineId._id
                );
                cartArr.splice(foundIndexArr, 1);
                localStorage.setItem('cartArray', JSON.stringify(cartArr));
            } else {
                updateCartHelper(
                    action.payload.item.item.medicineId.medicineId._id,
                    qty
                );
            }
        },
        deleteFromLocalStorage(state, action) {
            const foundProductIndex = state.findIndex(
                (ele) =>
                    ele?.medicineData?.medicineId?.medicineId?._id ===
                    action.payload.cardDetails._id
            );
            state.splice(foundProductIndex, 1);
            if (action.payload.user.data === null) {
                let cartArr = JSON.parse(localStorage.getItem('cartArray'));
                const foundIndexArr = cartArr.findIndex(
                    (ele) => ele?.medicineId === action.payload.cardDetails._id
                );
                cartArr.splice(foundIndexArr, 1);
                localStorage.setItem('cartArray', JSON.stringify(cartArr));
            }
        },
        updateItemQty(state, action) {
            const foundProductIndex = state.findIndex(
                (ele) =>
                    ele?.medicineData?.medicineId?.medicineId?._id ===
                    action.payload.productObj.id
            );
            let qty = action.payload.productObj.qty;
            state[foundProductIndex].quantity = qty;
            if (action.payload.user.data === null) {
                let cartArr = JSON.parse(localStorage.getItem('cartArray'));
                const foundIndexQty = cartArr.findIndex(
                    (ele) => ele?.medicineId === action.payload.productObj.id
                );
                cartArr[foundIndexQty].quantity = action.payload.productObj.qty;
                localStorage.setItem('cartArray', JSON.stringify(cartArr));
            } else updateCartHelper(action.payload.productObj.id, qty);
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
    updateItemQty,
    deleteFromLocalStorage
} = userCartSlice.actions;

export default userCartSlice.reducer;
