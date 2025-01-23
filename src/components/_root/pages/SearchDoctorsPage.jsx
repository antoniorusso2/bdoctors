import React, { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import { useFilter } from "../../../context/FilterProvider";
import SearchDoctorInput from "../../ui/SearchDoctorInput";
import SelectSpecializations from "../../ui/SelectSpecializations";
import SubmitButton from "../../ui/SubmitButton";
import Card from "../../ui/Card";

export default function SearchDoctorsPage() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { filters } = useFilter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await api.get("/doctors/search", {
        params: { ...data, specializations: filters.specializations },
      });
      setResults(response.data);
    } catch (err) {
      setError("An error occurred while fetching results. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(filters);

  return (
    <div className="">
      <div className="row">
        {/* Sidebar for filters */}
        <div
          className={`col-xl-3 py-4 rounded-4 d-md-block bg-light sidebar collapse ${
            isSidebarOpen ? "show" : ""
          }`}
          id="sidebarMenu"
        >
          <div className="position-sticky">
            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-2 text-muted">
              <span>Filtri di Ricerca</span>
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 px-3">
                <label htmlFor="doctor" className="form-label">
                  Nome, Cognome o Email
                </label>
                <SearchDoctorInput
                  id="doctor"
                  placeholder="Es. Marco Rossi o marco@example.com"
                />
              </div>
              <div className="mb-3 px-3">
                <label htmlFor="minRating" className="form-label">
                  Valutazione Minima
                </label>
                <select
                  className="form-select"
                  id="minRating"
                  name="min_rating"
                  defaultValue={filters.minRating}
                >
                  <option value="">Tutte le valutazioni</option>
                  <option value="5">5 stelle</option>
                  <option value="4">4 stelle o più</option>
                  <option value="3">3 stelle o più</option>
                  <option value="2">2 stelle o più</option>
                  <option value="1">1 stella o più</option>
                </select>
              </div>
              <div className="mb-3 px-3">
                <label htmlFor="specializations" className="form-label">
                  Specializzazione
                </label>
                <SelectSpecializations id="specializations" className="z-100" />
              </div>
              <div className="px-3">
                <SubmitButton pending={isLoading} className="w-100">
                  Cerca
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>

        {/* Main content */}
        <main className="ms-sm-auto col-xl-9 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Ricerca Avanzata Medici</h1>
            <button
              className="btn btn-primary d-md-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              Toggle Filters
            </button>
          </div>
          {error && (
            <div className="alert alert-danger mt-4" role="alert">
              {error}
            </div>
          )}
          {!!results.length && (
            <div className="mt-4">
              <h2>Risultati della ricerca</h2>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {results.map((doctor) => (
                  <Card key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </div>
          )}
          {!results.length && !isLoading && !error && (
            <div className="alert alert-info mt-4" role="alert">
              Nessun risultato trovato. Prova a modificare i criteri di ricerca.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
