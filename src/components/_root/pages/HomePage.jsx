import axios from "axios";
import { api } from "../../../lib/api";
import fetchDoctors from "../../../lib/api/queries";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../../Card/Card";

export default function HomePage() {
  // ARRAY TEMPORANEI
  const defaultDoctorsArray = [
    {
      id: 1,
      email: "mario.rossi@example.com",
      first_name: "Mario",
      last_name: "Rossi",
      phone: "+39 333 1234567",
      address: "Roma",
      specalization: "Ematologia",
    },
    {
      id: 2,
      email: "luca.bianchi@example.com",
      first_name: "Luca",
      last_name: "Bianchi",
      phone: "+39 333 9876543",
      address: "Milano",
      specalization: "Geriatria",
    },
    {
      id: 3,
      email: "anna.verdi@example.com",
      first_name: "Anna",
      last_name: "Verdi",
      phone: "+39 333 4567890",
      address: "Napoli",
      specalization: "Cardiologia",
    },
    {
      id: 4,
      email: "giulia.neri@example.com",
      first_name: "Giulia",
      last_name: "Neri",
      phone: "+39 333 1122334",
      address: "Firenze",
      specalization: "Ginecologia",
    },
    {
      id: 5,
      email: "paolo.mancini@example.com",
      first_name: "Paolo",
      last_name: "Mancini",
      phone: "+39 333 5566778",
      address: "Torino",
      specalization: "Tossicologia",
    },
  ];

  const defaultSpecalizationsArray = [
    { id: 1, name: "Cardiologia" },
    { id: 2, name: "Dermatologia" },
    { id: 3, name: "Pediatria" },
    { id: 4, name: "Neurologia" },
    { id: 5, name: "Ortopedia" },
    { id: 6, name: "Chirurgia Generale" },
    { id: 7, name: "Psichiatria" },
    { id: 8, name: "Radiologia" },
    { id: 9, name: "Anestesiologia" },
    { id: 10, name: "Oftalmologia" },
    { id: 11, name: "Ginecologia e Ostetricia" },
    { id: 12, name: "Oncologia" },
    { id: 13, name: "Urologia" },
    { id: 14, name: "Gastroenterologia" },
    { id: 15, name: "Endocrinologia" },
    { id: 16, name: "Ematologia" },
    { id: 17, name: "Nefrologia" },
    { id: 18, name: "Reumatologia" },
    { id: 19, name: "Medicina Interna" },
    { id: 20, name: "Medicina dello Sport" },
    { id: 21, name: "Chirurgia Plastica e Ricostruttiva" },
    { id: 22, name: "Medicina Estetica" },
    { id: 23, name: "Tossicologia" },
    { id: 24, name: "Medicina Fisica e Riabilitativa" },
    { id: 25, name: "Geriatria" },
    { id: 26, name: "Otorinolaringoiatria" },
    { id: 27, name: "Allergologia e Immunologia" },
    { id: 28, name: "Patologia Clinica" },
    { id: 29, name: "Medicina del Lavoro" },
    { id: 30, name: "Medicina di Emergenza e Urgenza" },
  ];

  //

  const [doctorsList, setDoctorsList] = useState(defaultDoctorsArray);
  const [specalizations, setSpecalizations] = useState(
    defaultSpecalizationsArray
  );
  const [search, setSearch] = useState("");

  // FETCH DA DB

  // fetchDoctors(setDoctorsList);

  // useEffect(() => {
  //   axios
  //     .get(`${api}/doctors`, { params: { specialization: search } })
  //     .then((res) => {
  //       setDoctorsList(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  //

  // fetchSpecializations(setSpecializations)

  // useEffect(() => {
  //   axios
  //     .get(`${api}/specializations`)
  //     .then((res) => {
  //       setSpecalizations(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  useEffect(() => {
    // Filtra i medici in base alla specializzazione selezionata
    if (search === "") {
      setDoctorsList(defaultDoctorsArray); // Mostra tutti i medici se non c'è filtro
    } else {
      const filteredDoctors = defaultDoctorsArray.filter(
        (doctor) => doctor.specalization === search
      );
      setDoctorsList(filteredDoctors);
    }
  }, [search]);

  console.log(defaultDoctorsArray);
  console.log(defaultSpecalizationsArray);

  return (
    <>
      <section className="container mb-4 d-flex align-items-center justify-content-between">
        <div>
          <h1 className="">I migliori medici specialisti vicino a te</h1>
        </div>
        <div>
          <a href="#">Ricerca avanzata</a>
        </div>
      </section>
      <section className="container mb-5">
        <form className="form">
          <select
            className="form-select"
            name="specs-filter"
            id="specs-filter"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          >
            <option defaultValue={""} value={""}>
              Tutte le specializzazioni
            </option>
            {defaultSpecalizationsArray.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </form>
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
