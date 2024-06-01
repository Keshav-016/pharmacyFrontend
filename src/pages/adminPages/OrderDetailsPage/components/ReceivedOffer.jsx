import React from 'react';
import ReceivedCard from './ReceivedCard.jsx';

const ReceivedCardData = [
    {
        pharmaName: 'INTAS PHARMACEUTICALS LTD',
        price: 1233,
        discount: 22,
        deliveryDate: '12 April 2024',
        time: '10pm'
    },
    {
        pharmaName: 'INTAS PHARMACEUTICALS LTD',
        price: 1233,
        discount: 22,
        deliveryDate: '12 April 2024',
        time: '10pm'
    },
    {
        pharmaName: 'INTAS PHARMACEUTICALS LTD',
        price: 1170,
        discount: 25,
        deliveryDate: '12 April 2024',
        time: '10pm'
    },
    {
        pharmaName: 'LINUX LABORATORIES',
        price: 1117,
        discount: 30,
        deliveryDate: '12 April 2024',
        time: '10pm'
    },
    {
        pharmaName: 'LINUX LABORATORIES',
        price: 1117,
        discount: 22,
        deliveryDate: '12 April 2024',
        time: '10pm'
    }
];

const ReceivedOffer = () => {
    return (
        <div>
            <div className="flex flex-col gap-3  items-center mt-5 border  p-5 rounded-2xl h-[80vh] overflow-y-scroll no-scrollbar bg-white ">
                <h1>Received Offers</h1>
                {ReceivedCardData.map((item) => {
                    return (
                        <ReceivedCard
                            pharmaName={item.pharmaName}
                            price={item.price}
                            discount={item.discount}
                            deliveryDate={item.deliveryDate}
                            time={item.time}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ReceivedOffer;
