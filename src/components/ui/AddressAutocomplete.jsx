import React, { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

function AddressAutocomplete({ register, errors }) {
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      setAddress(place.formatted_address);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDjIKHhyn9C39sPsPKf04y8ZqvAEcStaiI"
      libraries={["places"]}
    >
      <label className="block text-sm font-medium text-gray-700">
        Indirizzo
      </label>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          value={address}
          id="address"
          {...register("address", {
            required: "Address is required",
            minLength: {
              value: 5,
              message: "Address must be at least 5 characters",
            },
          })}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Inserisci il tuo indirizzo"
          className={`form-control ${
            errors.address ? "is-invalid" : ""
          } w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300`}
        />
      </Autocomplete>
      {/* <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Invia
        </button> */}
    </LoadScript>
  );
}

export default AddressAutocomplete;
