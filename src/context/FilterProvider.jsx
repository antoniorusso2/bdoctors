import { createContext, useContext, useState } from "react";

const FilterContext = createContext(null);

const defaultFilters = {
  doctor: "",
  specializations: [],
};

export default function FilterProvider({ children }) {
  const [filters, setFilters] = useState(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (!context)
    throw new Error("useFilter should be used inside FilterProvider");

  return context;
};
