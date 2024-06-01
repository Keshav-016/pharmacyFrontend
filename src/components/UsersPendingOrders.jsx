import Footer from './Footer';
import UserOrderPreview from './UserOrderPreview';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showCurrentOrder } from '../features/userFinalOrderSlice';
import { getAllPharmacistOffer } from '../features/pharmacistOffersSlice';

const UsersPendingOrders = () => {
    const dispatch = useDispatch();
    const userOrder = useSelector((state) => state.userOrders.viewingOrder);

    useEffect(() => {
        dispatch(showCurrentOrder(window.location.search.slice(4)));
        dispatch(getAllPharmacistOffer(window.location.search.slice(4)));
    }, []);

    return (
        <>
            <UserOrderPreview subHeading="My Orders" userOrder={userOrder} />
        </>
    );
};

export default UsersPendingOrders;
