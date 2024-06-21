import PointerIcon from '../../../assets/images/pointer.svg';
import ReactMapGl, { Marker } from 'react-map-gl';
import { useState, useEffect } from 'react';

const TOKEN =
    'pk.eyJ1IjoibmFuZGluaTIzNzciLCJhIjoiY2x2OXFjejJzMHhsYjJybXpjdDliZThpdSJ9.WCx7RhwkKf9jCW5xY6M6tQ';

function Map({ longitude, latitude, updateCoordinates, marker, setMarker }) {
    const [viewport, setViewport] = useState({
        latitude,
        longitude,
        zoom: 16
    });

    useEffect(() => {
        setViewport((oldViewport) => ({
            ...oldViewport,
            latitude,
            longitude
        }));
    }, [latitude, longitude]);

    const handleMarkerDrag = (event) => {
        const latitude = event.lngLat.lat;
        const longitude = event.lngLat.lng;
        setMarker({ latitude, longitude });
        updateCoordinates(latitude, longitude);
    };

    return (
        <div className="w-[100%] h-[100%]">
            <ReactMapGl
                {...viewport}
                mapboxAccessToken={TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onMove={(event) => {
                    setViewport(event.viewState);
                }}
            >
                <Marker
                    latitude={marker.latitude}
                    longitude={marker.longitude}
                    draggable={true}
                    onDragEnd={handleMarkerDrag}
                >
                    <img className="w-[40px] h-[40px]" src={PointerIcon} />
                </Marker>
            </ReactMapGl>
        </div>
    );
}

export default Map;
