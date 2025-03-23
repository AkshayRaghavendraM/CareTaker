import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

// Default marker icon fix for Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const HospitalFinder: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        fetchHospitals(latitude, longitude);
      },
      (err) => setError("Error getting location: " + err.message)
    );
  }, []);

  const fetchHospitals = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: "hospital",
            format: "json",
            viewbox: `${lon-0.05},${lat-0.05},${lon+0.05},${lat+0.05}`,
            bounded: 1,
            addressdetails: 1,
          },
        }
      );
      setHospitals(response.data);
    } catch (error) {
      setError("Error fetching hospitals.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Hospital Finder</h1>
      {error && <p className="text-red-500">{error}</p>}
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            icon={
              new L.Icon({
                iconUrl: markerIconPng,
                shadowUrl: markerShadowPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup>You are here</Popup>
          </Marker>
          {hospitals.map((hospital, index) => (
            <Marker
              key={index}
              position={[parseFloat(hospital.lat), parseFloat(hospital.lon)]}
              icon={
                new L.Icon({
                  iconUrl: markerIconPng,
                  shadowUrl: markerShadowPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
                <Popup>
                <div>
                  <strong>{hospital.display_name}</strong>
                  <br />
                  {hospital.address ? (
                  <>
                    {hospital.address.road && <span>{hospital.address.road}, </span>}
                    {hospital.address.city && <span>{hospital.address.city}, </span>}
                    {hospital.address.state && <span>{hospital.address.state}, </span>}
                    {hospital.address.postcode && <span>{hospital.address.postcode}</span>}
                  </>
                  ) : (
                    <span>No address details available</span>
                  )}
                </div>
                </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default HospitalFinder;
