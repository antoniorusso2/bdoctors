import { useEffect, useState } from "react";
import Select from "react-select";
import { api } from "../../lib/api";
import { useFilter } from "../../context/FilterProvider";

export default function SelectSpecializations({ ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [specializations, setSpecializations] = useState([]);

  const { filters, setFilters } = useFilter();

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const { data } = await api.get("/doctors/specializations");
        setSpecializations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  return (
    <Select
      {...props}
      defaultValue={filters.specializations}
      options={specializations}
      isLoading={isLoading}
      closeMenuOnSelect={false}
      placeholder="Select specializations"
      onChange={(specializations) =>
        setFilters({ ...filters, specializations: specializations.map(s => s.value) })
      }
      isMulti
    />
  );
}
