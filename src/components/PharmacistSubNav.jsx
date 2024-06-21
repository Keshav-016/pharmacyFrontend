import { useNavigate } from 'react-router-dom';
import ButtonOutlined from './ButtonOutlined';
import { useSelector } from 'react-redux';
function PharmacistSubNav() {
    const numberOffers = useSelector(
        (state) => state?.quotations?.data?.length || 0
    );

    const navigate = useNavigate();
    const changePage = (route) => {
        navigate(route);
    };
    const navItems = [
        { name: 'All', url: '/pharmacist/orders/all' },
        { name: 'New Offers', url: '/pharmacist/orders/new-offers' },
        { name: 'Delivered', url: '/pharmacist/orders/delivered' },
        { name: 'Undelivered', url: '/pharmacist/orders/undelivered' }
    ];
    return (
        <div className="w-[100%] mt-4 mb-5">
            <div className="hidden sm:flex justify-around max-w-[600px] mx-auto gap-5 ">
                {navItems.map((item, index) => {
                    return (
                        <button
                            key={index}
                            className={`${
                                item.url === window.location.pathname
                                    ? 'w-[100%] border border-[#1444ef] bg-[#1444ef] text-white lg:p-3 p-[0.4rem] font-default-font-family lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]'
                                    : 'w-[100%] border border-[#1444EF] text-[#1444EF] lg:p-3 p-[0.4rem] font-default-font-family lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]'
                            }`}
                            onClick={() => {
                                changePage(item.url);
                            }}
                        >
                            {item.name}
                            {item.name === 'New Offers' ? (
                                <span className="text-white inline-block flex-col w-[25px] h-[25px] justify-center items-center mx-2 p-1 bg-red rounded-full">
                                    {numberOffers}
                                </span>
                            ) : (
                                ''
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default PharmacistSubNav;
