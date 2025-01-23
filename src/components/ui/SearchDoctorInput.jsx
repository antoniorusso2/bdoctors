import { useFilter } from "../../context/FilterProvider";

export default function SearchDoctorInput({ className, ...props }) {
  const { filters, setFilters } = useFilter();

  return (
    <input
      type="text"
      value={filters.doctor}
      className={`form-control ${className}`}
      placeholder="Cerca dottore"
      aria-label="Search doctor"
      onChange={(e) =>
        setFilters({ ...filters, doctor: e.target.value.toLowerCase() })
      }
      {...props}
    />
  );
}
