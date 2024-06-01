import Footer from './Footer';
import UserOrderPreview from './UserOrderPreview';
import OuderOfferCards from './OuderOfferCards';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showCurrentOrder } from '../features/userFinalOrderSlice';
import { getAllPharmacistOffer } from '../features/pharmacistOffersSlice';

const CurrentOrder = () => {
    const dispatch = useDispatch();
    const userOrder = useSelector((state) => state.userOrders.viewingOrder);
    const userOrderOffers = useSelector((state) => state.pharmacistOffers.data);

    useEffect(() => {
        dispatch(showCurrentOrder(window.location.search.slice(4)));
        dispatch(getAllPharmacistOffer(window.location.search.slice(4)));
    }, []);

    return (
        <>
            <div className="bg-[#EBF6F9] flex flex-col items-center justify-between min-h-[90vh]">
                <div className="   sm:w-[80%] w-[100%] grid grid-cols-12 mx-auto py-5  justify-start justify-items-start gap-5 lg:gap-0  m-width-[1200px]">
                    <div className="w-[100%] lg:col-span-8 xl:col-span-8 col-span-12 lg:px-10 px-5">
                        <UserOrderPreview
                            subHeading="Current Order"
                            userOrder={userOrder}
                        />
                    </div>
                    <div className="w-[100%] lg:col-span-4 xl:col-span-4 col-span-12  ps-5">
                        <div className="lg:w-[100%] w-[95%] bg-white lg:p-5 p-4  lg:flex  hidden flex-col gap-3 rounded-lg">
                            <h1 className=" font-default-font-family text-xl">
                                Order Offers
                            </h1>
                            <div className="p-2">
                                {userOrderOffers?.map((item) => (
                                    <OuderOfferCards
                                        key={item._id}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default CurrentOrder;
