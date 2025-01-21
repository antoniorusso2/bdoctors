import { useEffect, useState } from "react";
import Select from "react-select";
import { api } from "../../lib/api";

export default function SelectSpecializations({ ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const { data } = await api.get("/doctors/specializations");
        console.log(data);

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
      options={specializations}
      isMulti
      isLoading={isLoading}
      closeMenuOnSelect={false}
    />
  );
}
