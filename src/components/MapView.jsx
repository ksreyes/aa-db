// import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import RasterOverlay from './RasterOverlay.jsx';
import BubbleOverlay from './BubbleOverlay.jsx';
import MapCenter from './MapCenter.jsx';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

export default function MapView({ filters }) {

    return (
        <div className="map-container w-full">

            <MapContainer
                center={[9.0, 7.5]} // initial center (latitude, longitude)
                zoom={6}
                style={{ height: "100%", width: "100%" }}
            >

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                />

                <RasterOverlay filters={filters} />
                <MapCenter filters={filters} />
                <BubbleOverlay filters={filters} />

            </MapContainer>
        </div>
    );
}