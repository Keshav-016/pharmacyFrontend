import { useMemo } from 'react';
import NothingToShow from '../../../components/NothingToShow';
import PharmacistOrderCards from '../../../components/PharmacistOrderCards';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import ErrorPage from '../../../components/ErrorPage';

function UndeliveredOrder() {
    const orders = useSelector((state) => state.orders);

    const unDeliveredOrders = useMemo(
        () =>
            orders?.data?.length &&
            orders?.data?.filter(
                (item) => item.orderId.status === 'accepted',
                [orders]
            )
    );

    return orders?.isLoading ? (
        <Loader />
    ) : orders?.error ? (
        <ErrorPage />
    ) : !unDeliveredOrders?.length ? (
        <NothingToShow />
    ) : (
        <div
            className={`flex max-w-[1200px]  mx-auto flex-col gap-3 px-2 ${orders?.data?.length === 0 && 'mt-[20vh]'}`}
        >
            {unDeliveredOrders?.map((item) => {
                return <PharmacistOrderCards key={item._id} order={item} />;
            })}
        </div>
    );
}

export default UndeliveredOrder;
