import { useSearchParams } from "react-router-dom";

export default function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    doctor: searchParams.get("doctor") || "",
    specializations: searchParams.get("specializations")?.split(",") || [],
    min_rating: searchParams.get("min_rating") || "",
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = Object.fromEntries(formData);

    if (!params.doctor && !params.specializations?.length && !params.min_rating)
      return;

    setSearchParams(params);
  }

  const setSpecializations = (specializations) =>
    setSearchParams({
      ...filters,
      specializations: specializations.length ? specializations.join(",") : [],
    });

  const resetDoctor = () => setSearchParams({ ...filters, doctor: "" });

  const resetFilters = () => setSearchParams();

  return {
    searchParams,
    filters,
    handleSubmit,
    setSpecializations,
    resetDoctor,
    resetFilters,
  };
}
