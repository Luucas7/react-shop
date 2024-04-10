import React, { useCallback, useRef, useState } from "react";
import { ShippingAdress } from "../interfaces/ShippingAddress";
import { ShippingAddressImpl } from "../interfaces/ShippingAddress";

const ShippingAddressManager = () => {

  const SERVER_URL = "2020";

  const [data, setData] = useState<ShippingAdress>(new ShippingAddressImpl());
  const addressRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);
  const zipRef = useRef<HTMLInputElement | null>(null);
  const streetRef = useRef<HTMLInputElement | null>(null);

  const latitudeRef = useRef<HTMLInputElement | null>(null);
  const longitudeRef = useRef<HTMLInputElement | null>(null);

  const submit = (e: any) => {
    e.preventDefault();

    const name = addressRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const city = cityRef.current?.value;
    const zip = zipRef.current?.value;
    const street = streetRef.current?.value;
    const latitude = latitudeRef.current?.value || "";
    const longitude = longitudeRef.current?.value || "";

    reverseGeocode(name, email, latitude, longitude).then((shippingAddress) => {
      setData(shippingAddress);
    });

    sendToServer().then((status) => {
      if (status) {
        alert("Order received");
      } else {
        alert("Order failed");
      }
    });
  }

  const sendToServer = useCallback(async () => {


    let response = await fetch(SERVER_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let resultJson = await response.json();
    return resultJson["status"] === "order_received";

  }, []);



  const reverseGeocode = async (name: string, email: string, lat: string, lon: string): Promise<ShippingAdress> => {
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`
    );
    const data = await response.json();
    return new ShippingAddressImpl(name, email, data.features[0].properties.city, data.features[0].properties.postcode, data.features[0].properties.name);

  }


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (latitudeRef.current && longitudeRef.current) {
          latitudeRef.current.value = position.coords.latitude.toString();
          longitudeRef.current.value = position.coords.longitude.toString();

        }
      },
      () => { }
    );
  }



  return (
    <form className="row m-3">
      <input
        className="col-md-6"
        type="text"
        placeholder="Name"
        ref={addressRef}
      />
      <input
        className="col-md-6"
        type="email"
        placeholder="Email"
        ref={emailRef}
      />
      <input
        className="col-md-6"
        type="text"
        placeholder="City"
        ref={cityRef}
      />

      <input
        className="col-md-4"
        type="text"
        placeholder="Street"
        ref={streetRef}
      />
      <input className="col-md-2" type="text" placeholder="Zip" ref={zipRef} />
      <input
        className="col-md-6"
        type="number"
        placeholder="Latitude"
        ref={latitudeRef}
      />
      <input
        className="col-md-6"
        type="number"
        placeholder="Longitude"
        ref={longitudeRef}
      />
      <input type="button" value="Submit" onClick={(e) => submit(e)} />
    </form>
  );
};

export default ShippingAddressManager;
