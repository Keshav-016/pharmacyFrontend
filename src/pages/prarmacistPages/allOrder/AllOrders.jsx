import ErrorPage from '../../../components/ErrorPage';
import Loader from '../../../components/Loader';
import NothingToShow from '../../../components/NothingToShow';
import PharmacistOrderCards from '../../../components/PharmacistOrderCards';
import { useSelector } from 'react-redux';

function AllOrders() {
    const orders = useSelector((state) => state.orders);
    return orders?.isLoading ? (
        <Loader />
    ) : orders?.error ? (
        <ErrorPage />
    ) : !orders?.data?.length ? (
        <NothingToShow />
    ) : (
        <div
            className={`flex max-w-[1200px] mx-auto flex-col gap-3 px-2 ${orders?.data?.length === 0 && 'mt-[20vh]'}`}
        >
            {orders?.data?.map((item) => (
                <PharmacistOrderCards key={item._id} order={item} />
            ))}
        </div>
    );
}

export default AllOrders;
