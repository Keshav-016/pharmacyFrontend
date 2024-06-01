import AddressForm from './AddressForm';
import Map from './Map';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AddressMap = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [address, setAddress] = useState({
        streetAndNumber: '',
        place: '',
        region: '',
        postcode: '',
        country: '',
        latitude: '',
        longitude: ''
    });

    const [marker, setMarker] = useState({
        latitude: address.latitude,
        longitude: address.longitude
    });

    const [id, setId] = useState('');
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userBuilding, setUserBuilding] = useState('');
    const [type, setType] = useState('');
    const handleHome = () => {
        setType('home');
    };

    const handleWork = () => {
        setType('work');
    };

    const handleHotel = () => {
        setType('hotel');
    };

    const handleOther = () => {
        setType('other');
    };

    const updateCoordinates = (latitude, longitude) => {
        console.log(latitude, longitude);
        setAddress({ ...address, latitude, longitude });
    };

    const getEditableAddress = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token exists');
            }
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/user-address/get-single-address?id=${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setUserName(rawData.data.data.receiverName);
            setUserPhone(rawData.data.data.phone);
            setUserBuilding(rawData.data.data.address.building);
            setAddress({
                streetAndNumber: rawData.data.data.address.area,
                place: rawData.data.data.address.city,
                region: rawData.data.data.address.state,
                postcode: rawData.data.data.address.postcode,
                country: rawData.data.data.address.country,
                latitude: rawData.data.data.location.coordinates[0],
                longitude: rawData.data.data.location.coordinates[1]
            });
            setType(rawData.data.data.type);
            console.log(rawData);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const addressId = params.get('item');
        setId(addressId);
        if (addressId) {
            setIsEditable(true);
            getEditableAddress(addressId);
            setMarker({
                latitude: address.latitude,
                longitude: address.longitude
            });
        } else {
            navigator.geolocation.getCurrentPosition(function (position) {
                setMarker({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                setAddress({
                    ...address,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                console.log(2);
            });
        }
    }, [address.longitude, address.latitude]);

    return (
        <div className="bg-[#EBF6F9] min-h-[90vh] p-7">
            <div className="max-w-[1200px] h-[100%] bg-[#fff] mx-auto grid grid-cols-12 p-5  gap-4 rounded-lg ">
                <div className="col-span-12  md:col-span-6 ">
                    <AddressForm
                        address={address}
                        setAddress={setAddress}
                        isEditable={isEditable}
                        id={id}
                        userName={userName}
                        userPhone={userPhone}
                        userBuilding={userBuilding}
                        setUserBuilding={setUserBuilding}
                        setUserName={setUserName}
                        setUserPhone={setUserPhone}
                        type={type}
                        handleHome={handleHome}
                        handleWork={handleWork}
                        handleOther={handleOther}
                        handleHotel={handleHotel}
                    />
                </div>

                <div className="col-span-12 h-[300px] md:h-[100%] md:col-span-6 ">
                    {address.longitude && address.latitude && (
                        <Map
                            longitude={marker.longitude}
                            latitude={marker.latitude}
                            updateCoordinates={updateCoordinates}
                            setMarker={setMarker}
                            marker={marker}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressMap;
