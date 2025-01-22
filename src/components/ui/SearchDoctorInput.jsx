import { useFilter } from "../../context/FilterProvider";

export default function SearchDoctorInput({ className, ...props }) {
  const { filters } = useFilter();

  return (
    <input
      type="text"
      defaultValue={filters.doctor}
      className={`form-control ${className}`}
      name="doctor"
      placeholder="Cerca dottore"
      aria-label="Search doctor"
      {...props}
    />
  );
}
