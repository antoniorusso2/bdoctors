import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Controller } from "react-hook-form";

function AddressAutocomplete({ control, defaultAddress }) {
  const [address, setAddress] = useState(defaultAddress);
  const [coordinates, setCoordinates] = useState([]);
  const autocompleteRef = useRef(null);

  return (
    <Controller
      name="address"
      control={control}
      rules={{
        required: "Address is required",
        minLength: { value: 5, message: "Address must be least 5 characters" },
      }}
      render={({
        field: { onChange, value, ...restField },
        fieldState: { error },
      }) => (
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={() => {
            const { formatted_address, geometry } =
              autocompleteRef.current.getPlace();
            if (formatted_address) {
              setAddress(formatted_address);
              setCoordinates(geometry.location.lat(), geometry.location.lng());
              onChange(formatted_address);
              console.log(geometry.location.lat(), geometry.location.lng());
            }
          }}
          restrictions={{ country: "it" }}
          className={`${error ? "is-invalid" : ""}`}
        >
          <input
            type="text"
            id="address"
            placeholder="Inserisci il tuo indirizzo"
            className={`form-control ${error ? "is-invalid" : ""}`}
            {...restField}
            value={address}
            onChange={(e) => setAddress(e.target.value.trim())}
          />
        </Autocomplete>
      )}
    />
  );
}

export default AddressAutocomplete;
