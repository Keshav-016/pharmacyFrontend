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
            <input
                id="address"
                type="text"
                placeholder="Address"
                value={streetAndNumber}
                onChange={handleChange}
                className="outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] bg-[#f5f5f5] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md w-[100%]"
            />
            <ul
                className={
                    suggestions.length > 0
                        ? ` p-3 md:w-[520px] w-[280px] absolute bg-[#d5d4d4] flex flex-col gap-1`
                        : ` p-3 md:w-[520px] w-[280px] absolute flex flex-col gap-1`
                }
            >
                {suggestions?.map((suggestion, index) => (
                    <li
                        className=" hover:bg-[#868585] hover:cursor-pointer "
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        <span className=" p-2">{suggestion.place_name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
