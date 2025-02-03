import React from "react";
import { Link, useMatch } from "react-router-dom";
import SearchDoctorInput from "./ui/SearchDoctorInput";
import useFilters from "../hooks/useFilter";

const Navbar = () => {
  const { searchParams, filters, handleSubmit, resetDoctor } = useFilters();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="/bdoctors-logo.png"
            alt="Bdoctors Logo"
            className="d-inline-block align-text-top me-2
            img-fluid"
            style={{ maxHeight: "50px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/doctors/search?${searchParams.toString()}`}
              >
                Ricerca Avanzata
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/doctors/new">
                Registrati come Medico
              </Link>
            </li>
          </ul>
          {!!useMatch("/") && (
            <form onSubmit={handleSubmit} className="d-flex">
              <SearchDoctorInput className="me-2" />
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-outline-primary">
                  Cerca
                </button>
                {!!filters.doctor && (
                  <button
                    type="reset"
                    className="btn btn-outline-danger"
                    onClick={resetDoctor}
                  >
                    Resetta
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
