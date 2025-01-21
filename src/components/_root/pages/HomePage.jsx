import axios from "axios";
import fetchDoctors from "../../../lib/api/queries";
import { useEffect } from "react";
import { useState } from "react";

export default function HomePage() {
  const defArray = [
    {
      id: 1,
      email: "mario.rossi@example.com",
      nome: "Mario",
      cognome: "Rossi",
      numeroTelefono: "+39 333 1234567",
      citta: "Roma",
    },
    {
      id: 2,
      email: "luca.bianchi@example.com",
      nome: "Luca",
      cognome: "Bianchi",
      numeroTelefono: "+39 333 9876543",
      citta: "Milano",
    },
    {
      id: 3,
      email: "anna.verdi@example.com",
      nome: "Anna",
      cognome: "Verdi",
      numeroTelefono: "+39 333 4567890",
      citta: "Napoli",
    },
    {
      id: 4,
      email: "giulia.neri@example.com",
      nome: "Giulia",
      cognome: "Neri",
      numeroTelefono: "+39 333 1122334",
      citta: "Firenze",
    },
    {
      id: 5,
      email: "paolo.mancini@example.com",
      nome: "Paolo",
      cognome: "Mancini",
      numeroTelefono: "+39 333 5566778",
      citta: "Torino",
    },
  ];

  const [doctorsList, setDoctorsList] = useState(defArray);

  // fetchDoctors(setDoctorsList);

  useEffect(() => {
    axios
      .get(`${api}/doctors`)
      .then((res) => {
        setDoctorsList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(defArray);

  return (
    <>
      <section className="container">
        <div>
          <h1>I migliori medici specialisti vicino a te</h1>
        </div>
      </section>
      <section className="container">
        <div className="row">
          {defArray.map((doctor) => (
            <div key={doctor.id} className="col card">
              <p>
                {doctor.nome}
                <span> </span>
                {doctor.cognome}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
