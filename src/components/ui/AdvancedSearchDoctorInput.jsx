import { useFilter } from "../../context/FilterProvider";

export default function AdvancedSearchDoctorInput({ className, ...props }) {
  return (
    <input
      type="text"
      value={advancedFilters.doctor}
      className={`form-control ${className}`}
      placeholder="Cerca dottore per nome, cognome o e-mail"
      aria-label="Search doctor"
      onChange={(e) =>
        setAdvancedFilters({ ...filters, doctor: e.target.value.toLowerCase() })
      }
      {...props}
    />
  );
}
