import { useEffect } from "react";
import { useState } from "react";
import Card from "../../ui/Card";
import { api } from "../../../lib/api";
import SelectSpecializations from "../../ui/SelectSpecializations";

export default function HomePage() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get(`/doctors`, { params: { specializations: search } })
      .then((res) => {
        setDoctorsList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [search]);

  console.log(search);

  // useEffect(() => {
  //   // Filtra i medici in base alla specializzazione selezionata
  //   if (search === "") {
  //     setDoctorsList(defaultDoctorsArray); // Mostra tutti i medici se non c'è filtro
  //   } else {
  //     const filteredDoctors = defaultDoctorsArray.filter(
  //       (doctor) => doctor.specialization === search
  //     );
  //     setDoctorsList(filteredDoctors);
  //   }
  // }, [search]);

  return (
    <>
      <section className=" d-flex flex-column justify-content-center hero-title mb-4 ">
        <div className=" container d-flex  flex-column align-items-center mb-4 justify-content-between p-4">
          <h1 className="mb-4 text-center ">
            I migliori medici specialisti<br></br>vicino a te
          </h1>
          <div className="search-link-container">
            <a className="search-link" href="#">
              Ricerca avanzata
            </a>
          </div>
        </div>

        <section className="container d-flex justify-content-center mb-5 ">
          <SelectSpecializations
            placeholder="Tutte le specializzazioni"
            className="w-50"
            onChange={(values) => setSearch(values.map(({ value }) => value))}
          />
        </section>
      </section>
      <section className="container">
        <div className="row g-4 align-itmes-center">
          {doctorsList.map((doctor) => (
            <div key={doctor.id} className="col-6">
              <Card doctor={doctor} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
