import Home from './pages/userPages/HomePages/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/userPages/LoginPage/Login';
import VerifyEmail from './pages/userPages/RegistrationPages/VerifyEmail';
import Products from './pages/userPages/ProductPage.jsx/ProductsListPage';
import IndiviualProduct from './pages/userPages/ProductPage.jsx/Product';
import Empty from './components/Empty';
import Cart from './pages/userPages/CartPages/Cart';
import UploadPrescription from './pages/userPages/CartPages/UploadPrescription';
import ForgotPassword from './pages/prarmacistPages/LoginPage/ForgotPassword';
import ProfileSettings from './components/ProfileSettings';
import UserProfileComponent from './components/UserProfileComponent';
import UserAddressComponent from './components/UserAddressComponent';
import UserOrderComponent from './components/UserOrderComponent';
import UserOrderPreview from './components/UserOrderPreview';
import CurrentOrder from './components/CurrentOrder';
import AddressMap from './pages/userPages/Map.jsx/AddressMap';
import PharmaLogin from './pages/prarmacistPages/LoginPage/PharmaLogin';
import AllOrder from './pages/prarmacistPages/allOrder/AllOrders.jsx';
import AllMedicinesPage from './pages/adminPages/AllMedicinesPage/AllMedicinesPage';
import AllOrderPage from './pages/adminPages/AllOrderPage/AllOrderPage';
import CustomerListPage from './pages/adminPages/CustomerListPage/CustomerListPage';
import OrderDetailsPage from './pages/adminPages/OrderDetailsPage/OrderDetailsPage';
import ProfilePage from './pages/adminPages/ProfilePage/ProfilePage';
import AdminProfileComponent from './pages/adminPages/ProfilePage/components/AdminProfileComponent';
import AdminProfilePassword from './pages/adminPages/ProfilePage/components/AdminProfilePassword';
import Admin from './components/Admin';
import LoginPage from './pages/adminPages/LoginPage/LoginPage';
import PharmaProfile from './pages/prarmacistPages/ProfilePage/PharmaProfile.jsx';
import PharmaTemplate from './components/PharmaTemplate.jsx';
import PharmacistProfileComponent from './pages/prarmacistPages/ProfilePage/component/PharmacistProfileComponent.jsx';
import Quotation from './pages/prarmacistPages/QuotationPage/Quotation';
import PharmaRegister from './pages/prarmacistPages/registrationPage/PharmaRegister.jsx';
import PharmacistProfilePassword from './pages/prarmacistPages/ProfilePage/component/PharmacistProfilePassword.jsx';
import PharmaSecondaryTemplate from './components/PharmaSecondaryTemplate.jsx';
import DeliveredOrder from './pages/prarmacistPages/deliveredOrder/DeliveredOrder.jsx';
import UndeliveredOrder from './pages/prarmacistPages/undeliveredOrder/UndeliveredOrder.jsx';
import AllPharmaciesPage from './pages/adminPages/AllPharmacies/AllPharmaciesPage.jsx';
import MedicineModal from './pages/adminPages/AllMedicinesPage/components/MedicineModal.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOrderPreview from './pages/adminPages/AllOrderPage/components/AdminOrderPreview.jsx';
import UsersPendingOrders from './components/UsersPendingOrders.jsx'

const notify = (msg, type = 'error') =>
    toast(msg, {
        type,
        autoClose: 3000,
        pauseOnFocusLoss: false,
        hideProgressBar: true
    });

function App() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/admin-login" element={<LoginPage />} />

                <Route path="/admin" element={<Admin />}>
                    <Route
                        path="/admin/all-pharmacies"
                        element={<AllPharmaciesPage />}
                    />
                    <Route path="/admin/all-order" element={<AllOrderPage />} />
                    <Route
                        path="/admin/admin-preview"
                        element={<AdminOrderPreview />}
                    />
                    <Route
                        path="/admin/all-pharmacies"
                        element={<AllPharmaciesPage />}
                    />
                    <Route
                        path="/admin/all-medicines"
                        element={<AllMedicinesPage />}
                    />
                    <Route
                        path="/admin/customer-list"
                        element={<CustomerListPage />}
                    />
                    <Route
                        path="/admin/order-details"
                        element={<OrderDetailsPage />}
                    />
                    <Route
                        path="/admin/admin-profile"
                        element={<ProfilePage />}
                    >
                        <Route
                            path="/admin/admin-profile/edit"
                            element={<AdminProfileComponent />}
                        />
                        <Route
                            path="/admin/admin-profile/password"
                            element={<AdminProfilePassword />}
                        />
                    </Route>
                </Route>

                <Route path="/modal" element={<MedicineModal />} />
                <Route
                    path="/all-pharmacies-page"
                    element={<AllPharmaciesPage />}
                />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<PharmaRegister />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/password" element={<ForgotPassword />} />
                <Route path="/pharma-login" element={<PharmaLogin />} />
                <Route path="/" element={<Empty />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/meds" element={<Products />} />
                    <Route path="/item" element={<IndiviualProduct />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/prescription"
                        element={<UploadPrescription />}
                    />
                    <Route path="/user-address" element={<AddressMap />} />
                    <Route path="/user-profile" element={<ProfileSettings />}>
                        <Route
                            path="/user-profile"
                            element={<UserProfileComponent />}
                        />
                        <Route
                            path="/user-profile/address"
                            element={<UserAddressComponent />}
                        />
                        <Route
                            path="/user-profile/order"
                            element={<UserOrderComponent />}
                        />
                        <Route
                            path="/user-profile/order-preview"
                            element={<UserOrderPreview subHeading="My order" />}
                        />
                        <Route
                            path="/user-profile/view-order"
                            element={
                                <UsersPendingOrders subHeading="My order" />
                            }
                        />
                    </Route>
                    <Route
                        path="/user-profile/current-order"
                        element={<CurrentOrder />}
                    />
                </Route>
                <Route path="/pharmacist" element={<PharmaTemplate />}>
                    <Route
                        path="/pharmacist/orders"
                        element={<PharmaSecondaryTemplate />}
                    >
                        <Route
                            path="/pharmacist/orders/all"
                            element={<AllOrder />}
                        />
                        <Route
                            path="/pharmacist/orders/new-offers"
                            element={<Quotation />}
                        />
                        <Route
                            path="/pharmacist/orders/delivered"
                            element={<DeliveredOrder />}
                        />
                        <Route
                            path="/pharmacist/orders/undelivered"
                            element={<UndeliveredOrder />}
                        />
                    </Route>
                    <Route
                        path="/pharmacist/profile"
                        element={<PharmaProfile />}
                    >
                        <Route
                            path="/pharmacist/profile/"
                            element={<PharmacistProfileComponent />}
                        />
                        <Route
                            path="/pharmacist/profile/change-password"
                            element={<PharmacistProfilePassword />}
                        />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
export { notify };
