import { useEffect, useState } from "react";
import Select from "react-select";
import { api } from "../../lib/api";
import useFilters from "../../hooks/useFilter";

export default function SelectSpecializations({ ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [specializations, setSpecializations] = useState([]);

  const { filters, setSpecializations: setSpecializationsParams } =
    useFilters();

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const { data } = await api.get("/specializations");
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
      options={specializations}
      isLoading={isLoading}
      value={specializations.filter((specialization) =>
        filters.specializations.includes(specialization.value.toString())
      )}
      closeMenuOnSelect={false}
      placeholder="Selezionare specializzazioni"
      onChange={(specializations) =>
        setSpecializationsParams(specializations.map((s) => s.value))
      }
      isMulti
      {...props}
    />
  );
}
