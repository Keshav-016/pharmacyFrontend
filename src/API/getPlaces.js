import axios from 'axios';

export default async function getPlaces(query) {
    try {
        const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
            {
                params: {
                    access_token:
                        'pk.eyJ1IjoibmFuZGluaTIzNzciLCJhIjoiY2x2OXFjejJzMHhsYjJybXpjdDliZThpdSJ9.WCx7RhwkKf9jCW5xY6M6tQ'
                }
            }
        );

        return response.data.features;
    } catch (error) {
        console.error('There was an error while fetching places:', error);
    }
}
