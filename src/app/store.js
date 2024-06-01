import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import userCartReducer from '../features/userCartSlice';
import productReducer from '../features/productSlice';
import currentItemReducer from '../features/currentItemSlice';
import addressReducer from '../features/userAddressSlice';
import amdinReducer from '../features/adminDetailsSlice';
import adminAllCustomersReducers from '../features/adminAllCustomersSlice';
import userOrdersReducers from '../features/userFinalOrderSlice';
import pharmacistOffersReducers from '../features/pharmacistOffersSlice';
import pharmacistReducer from '../features/pharmacistDetailsSlice';
import getPharmaciesSlice from '../features/getPharmaciesSlice';
import orderReducer from '../features/orderSlice';
import quotationsReducer from '../features/quotationsSlice';
import getPharmaModalSlice from '../features/getPharmaModalSlice';
import adminAllOrderReducer from '../features/adminAllOrderSlice';
import allOrdersSlice from '../features/adminAllOrderSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        userCart: userCartReducer,
        product: productReducer,
        currentItem: currentItemReducer,
        userAddress: addressReducer,
        admin: amdinReducer,
        pharmacist: pharmacistReducer,
        pharmacies: getPharmaciesSlice,
        orders: orderReducer,
        quotations: quotationsReducer,
        adminAllCustomer: adminAllCustomersReducers,
        adminAllOrder: adminAllOrderReducer,
        userOrders: userOrdersReducers,
        pharmacistOffers: pharmacistOffersReducers,
        pharmaciesModal: getPharmaModalSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
