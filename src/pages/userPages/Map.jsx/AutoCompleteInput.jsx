import { useState } from 'react';
import getPlaces from '../../../API/getPlaces';

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
            <div>
                <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    value={streetAndNumber}
                    onChange={handleChange}
                    className="outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] bg-[#f5f5f5] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md w-[100%]"
                />
                <ul className="border-black">
                    {suggestions?.map((suggestion, index) => (
                        <li
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
