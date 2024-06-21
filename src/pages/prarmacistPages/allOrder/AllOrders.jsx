import { useMemo } from 'react';
import ErrorPage from '../../../components/ErrorPage';
import Loader from '../../../components/Loader';
import NothingToShow from '../../../components/NothingToShow';
import PharmacistOrderCards from '../../../components/PharmacistOrderCards';
import { useSelector } from 'react-redux';

function AllOrders() {
    const orders = useSelector((state) => state.orders);
    const allOrders = useMemo(
        () =>
            orders?.data?.length &&
            orders?.data?.filter(
                (item) =>
                    item.status === 'confirmed' || item.status === 'delivered',
                [orders]
            )
    );
    return orders?.isLoading ? (
        <Loader />
    ) : orders?.error ? (
        <ErrorPage />
    ) : !orders?.data?.length ? (
        <NothingToShow />
    ) : (
        <div
            className={` flex max-w-[1200px] mx-auto flex-col gap-[0.3rem] px-2 h-[68vh] no-scrollbar overflow-y-scroll ${orders?.data?.length === 0 && 'mt-[20vh]'}`}
        >
            {orders?.data?.map(
                (item) =>
                    item.orderId.status !== 'pending' && (
                        <PharmacistOrderCards key={item._id} order={item} />
                    )
            )}
        </div>
    );
}

export default AllOrders;
