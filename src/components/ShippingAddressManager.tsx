import React, { useState } from "react";

const ShippingAddressManager = () => {
  const [address, setAddress] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [street, setStreet] = useState<string>("");

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const submit = (e: any ) => {
    e.preventDefault();
    console.log("Address submitted", {
      address,
      email,
      city,
      zip,
      street,
      latitude,
      longitude,
    });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }, // called if success
      () => {} // called in case of error (geolocation not authorized or not available)
    );
  }

  return (
    <form className="row m-3">
      <input
        className="col-md-6"
        type="text"
        placeholder="Name"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className="col-md-6"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="col-md-6"
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        className="col-md-4"
        type="text"
        placeholder="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <input
        className="col-md-2"
        type="text"
        placeholder="Zip"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
      />
      <input
        className="col-md-6"
        type="number"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(parseFloat(e.target.value))}
      />
      <input
        className="col-md-6"
        type="number"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(parseFloat(e.target.value))}
      />
      <input type="button" value="Submit" onSubmit={(e) => submit(e)} />
    </form>
  );
};

export default ShippingAddressManager;
