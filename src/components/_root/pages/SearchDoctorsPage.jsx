import React, { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import SearchDoctorInput from "../../ui/SearchDoctorInput";
import SelectSpecializations from "../../ui/SelectSpecializations";
import SubmitButton from "../../ui/SubmitButton";
import Card from "../../ui/Card";
import Loader from "../../Loader";
import useFilters from "../../../hooks/useFilter";

export default function SearchDoctorsPage() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { filters, handleSubmit, resetFilters } = useFilters();

  const handleSetResults = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/doctors", { params: filters });
      setResults(response.data);
    } catch (err) {
      setError("An error occurred while fetching results. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSetResults();
  }, [filters.doctor, filters.min_rating, filters.specializations.join(",")]);

  return (
    <div className="search-doctors">
      <div className="row">
        {/* Sidebar for filters */}
        <div
          className={`col-xl-3 d-md-block sidebar collapse z-3 ${
            isSidebarOpen ? "show" : ""
          }`}
          id="sidebarMenu"
        >
          <div className="position-sticky bg-light p-4 p-xl-2 rounded-4 mb-4 mb-xl-0">
            <h5
              className="sidebar-heading d-flex justify-content-between align-items-center
             mb-2 text-muted"
            >
              <span>Filtri di Ricerca</span>
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="doctor" className="form-label">
                  Nome, Cognome o Email
                </label>
                <SearchDoctorInput
                  id="doctor"
                  placeholder="Es. Marco Rossi o marco@example.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="minRating" className="form-label">
                  Valutazione Minima
                </label>
                <select
                  className="form-select"
                  id="minRating"
                  defaultValue={filters.min_rating}
                  name="min_rating"
                >
                  <option value="">Tutte le valutazioni</option>
                  <option value="5">5 stelle</option>
                  <option value="4">4 stelle o più</option>
                  <option value="3">3 stelle o più</option>
                  <option value="2">2 stelle o più</option>
                  <option value="1">1 stella o più</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="specializations" className="form-label">
                  Specializzazione
                </label>
                <SelectSpecializations
                  id="specializations"
                  className="advanced-select-specializations"
                />
              </div>
              <div className="row g-2">
                <div className="col-6 col-xl-12">
                  <button
                    type="reset"
                    className="btn bg-danger w-100 text-white"
                    onClick={resetFilters}
                  >
                    Resetta filtri
                  </button>
                  {/* <Link
                    className="btn bg-danger text-white w-100"
                    to="/doctors/search"
                  >
                    Resetta filtri
                  </Link> */}
                </div>
                <div className="col-6 col-xl-12">
                  <SubmitButton pending={isLoading} className="w-100">
                    Cerca
                  </SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Main content */}
        <main className="ms-sm-auto col-xl-9 px-md-4">
          <div
            className="d-flex justify-content-between flex-wrap flex-md-nowrap
           align-items-center pb-2 mb-3 border-bottom"
          >
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
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {results.map((doctor) => (
                <div key={doctor.id} className="col">
                  <Card doctor={doctor} />
                </div>
              ))}
            </div>
          )}
          {isLoading && <Loader />}
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
