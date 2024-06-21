import pointer from '../../../../assets/images/pointer.svg';
import ReactMapGl, { Marker } from 'react-map-gl';
import { useState, useEffect } from 'react';

const TOKEN =
    'pk.eyJ1IjoibmFuZGluaTIzNzciLCJhIjoiY2x2OXFjejJzMHhsYjJybXpjdDliZThpdSJ9.WCx7RhwkKf9jCW5xY6M6tQ';

function Map({ longitude, latitude, updateCoordinates }) {
    const [viewport, setViewport] = useState({
        latitude,
        longitude,
        zoom: 16
    });

    const [marker, setMarker] = useState({
        latitude,
        longitude
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
        <div className=" w-[235px] sm:w-[350px] md:w-[350px] md:h-[350px]  h-[200px]">
            {console.log(marker.latitude, marker.longitude)}
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
                    <img src={pointer} className="w-[40px] h-[40px]" />
                </Marker>
            </ReactMapGl>
        </div>
    );
}

export default Map;
