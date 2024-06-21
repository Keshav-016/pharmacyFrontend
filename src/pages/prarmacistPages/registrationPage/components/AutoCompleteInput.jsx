import { useState } from 'react';
import getPlaces from '../../../../API/getPlaces';

export default function AutoCompleteInput({
    handleManualInputChange,
    setAddress,
    streetAndNumber
}) {
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (event) => {
        handleManualInputChange(event, 'streetAndNumber');
        handleInputChange(event.target.value);
    };

    const handleInputChange = async (query) => {
        const suggesions = await getPlaces(query);
        setSuggestions(suggesions);
    };

    const handleSuggestionClick = (suggestion) => {
        const streetAndNumber = suggestion.place_name.split(',')[0];
        const latitude = suggestion.center[1];
        const longitude = suggestion.center[0];

        const address = {
            streetAndNumber,
            place: '',
            region: '',
            postcode: '',
            country: '',
            latitude,
            longitude
        };

        suggestion.context.forEach((element) => {
            const identifier = element.id.split('.')[0];
            address[identifier] = element.text;
        });

        setAddress(address);
        setSuggestions([]);
    };

    return (
        <div>
            <div className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] p-[0.4rem] text-[0.9rem] font-medium rounded-md">
                <input
                    id="address"
                    type="text"
                    className="w-[100%] outline-none"
                    placeholder="Address"
                    value={streetAndNumber}
                    onChange={handleChange}
                />
                <ul className="absolute w-[200px] md:w-[400px] z-10 ">
                    {suggestions?.map((suggestion, index) => (
                        <li
                            className="bg-[#e1e1e1] p-2 hover:bg-[#f5f5f5]"
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.place_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
