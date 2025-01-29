import { useEffect, useState } from "react";
import { useFilter } from "../../context/FilterProvider";

export default function SearchDoctorInput({ className, ...props }) {
  const { filters } = useFilter();
  const [doctor, setDoctor] = useState(filters.doctor);

  useEffect(() => {
    if (!filters.doctor) setDoctor("");
  }, [filters.doctor]);

  return (
    <input
      type="text"
      value={doctor}
      name="doctor"
      className={`form-control ${className}`}
      placeholder="Cerca dottore"
      aria-label="Search doctor"
      onChange={(e) => setDoctor(e.target.value)}
      {...props}
    />
  );
}
