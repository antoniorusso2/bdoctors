import React from "react";
import { Link } from "react-router-dom";
import { useFilter } from "../context/FilterProvider";
import SearchDoctorInput from "./ui/SearchDoctorInput";

const Navbar = () => {
  const { setFilters } = useFilter();

  function handleSearch(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const doctor = formData.get("doctor");

    setFilters((p) => ({ ...p, doctor }));
  }

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
              <Link className="nav-link" to="/doctors/search">
                Ricerca Avanzata
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/doctors/new">
                Registrati come Medico
              </Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
            <SearchDoctorInput className="me-2" />
            <button className="btn btn-outline-primary">Cerca</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
