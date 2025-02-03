import useFilters from "../../hooks/useFilter";

export default function SearchDoctorInput({ className, ...props }) {
  const { filters } = useFilters();

  // console.log(filters);

  return (
    <input
      type="text"
      defaultValue={filters.doctor}
      name="doctor"
      className={`form-control ${className}`}
      placeholder="Cerca dottore"
      aria-label="Search doctor"
      {...props}
    />
  );
}
