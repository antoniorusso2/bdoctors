import { useEffect } from "react";
import { useState } from "react";
import Card from "../../ui/Card";
import { api } from "../../../lib/api";
import SelectSpecializations from "../../ui/SelectSpecializations";
import { LoaderCircle } from "lucide-react";
import { useFilter } from "../../../context/FilterProvider";
import { Link } from "react-router-dom";

import useParallaxEffect from "../../ui/Parallax";
import FormAlert from "../../../components/ui/FormAlert";
import { Link } from "react-router-dom";

export default function HomePage() {
  useParallaxEffect();

  const [isLoading, setIsLoading] = useState(true);
  const [doctorsList, setDoctorsList] = useState([]);

  const {
    filters: { specializations, doctor },
  } = useFilter();

  console.log(specializations);

  useEffect(() => {
    api
      .get(`/doctors`, {
        params: {
          specializations: specializations.map((s) => s.value),
          doctor,
        },
      })
      .then((res) => {
        console.log(res.data);
        setDoctorsList(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [specializations, doctor]);

  return (
    <>
      <div className="parallax-bg"></div>

      <section className="d-flex flex-column justify-content-center hero-title mb-4">
        <div className="container-fluid d-flex flex-column align-items-center mb-4 justify-content-between p-4">
          <h1 className="mb-4 text-center">
            I migliori medici specialisti<br></br>vicino a te
          </h1>
          <div className="search-link-container">
            <Link to="/doctors/search" className="search-link">
              Ricerca avanzata
            </Link>
          </div>
        </div>

        <SelectSpecializations
          placeholder="Tutte le specializzazioni"
          className="select specializations mb-5 p-4"
        />
      </section>
      <section>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <LoaderCircle className="loader" size={60} />
          </div>
        ) : doctorsList.length ? (
          <div className="row g-4 align-itmes-center">
            {doctorsList.map((doctor) => (
              <div key={doctor.id} className="col-fluid col-md-6 col-xl-3 mb-3">
                <Card doctor={doctor} />
              </div>
            ))}
          </div>
        ) : (
          <FormAlert error={{ message: "Nessun medico disponibile" }} />
        )}
      </section>
    </>
  );
}
