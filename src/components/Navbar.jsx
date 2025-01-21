import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cerca specializzazione"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              Cerca
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
