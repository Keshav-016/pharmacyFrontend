import PharmacistOrderCards from '../../../components/PharmacistOrderCards';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import ErrorPage from '../../../components/ErrorPage';
import { useMemo } from 'react';
import NothingToShow from '../../../components/NothingToShow';

function DeliveredOrder() {
    const orders = useSelector((state) => state.orders);

    const deliveredOrders = useMemo(
        () =>
            orders?.data?.length &&
            orders?.data?.filter(
                (item) => item.status === 'delivered',
                [orders]
            )
    );
    return orders?.isLoading ? (
        <Loader />
    ) : orders?.error ? (
        <ErrorPage />
    ) : !deliveredOrders?.length ? (
        <div className=' h-[68vh]'><NothingToShow /></div>
    ) : (
        <div
            className={`flex max-w-[1200px] no-scrollbar h-[68vh] overflow-y-scroll  mx-auto flex-col gap-3 px-2 ${orders?.data?.length === 0 && 'mt-[20vh]'}`}
        >
            {deliveredOrders?.map((item) => {
                return <PharmacistOrderCards key={item._id} order={item} />;
            })}
        </div>
    );
}

export default DeliveredOrder;
