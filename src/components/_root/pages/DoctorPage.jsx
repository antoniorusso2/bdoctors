import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/api";
import CreateReviewForm from "../../forms/CreateReviewForm";
import GoogleMap from "../../ui/Map";

export default function DoctorPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState();
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Funzione per recuperare i dati del medico
    const fetchDoctor = async () => {
      try {
        const response = await api.get(`/doctors/${id}`);
        setDoctor(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  if (loading) {
    return <p>Caricamento in corso...</p>;
  }

  if (!doctor) {
    return <p>Medico non trovato.</p>;
  }

  return (
    <>
      <section className="container mt-5">
        <div className="row">
          <div className="col-8 p-4 card-background ">
            <h3 className="mb-4">
              Medico specialista in {doctor.specializations}
            </h3>
            <h2 className="mb-5">{`${doctor.first_name} ${doctor.last_name}`}</h2>
            <p>Email: {doctor.email}</p>
            <p>Telefono: {doctor.phone}</p>
            <p>Indirizzo: {doctor.address}</p>

            <button
              className="btn btn-primary my-3"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Nascondi Form" : "Mostra Form"}
            </button>
          </div>

          <div className="col-4 map-responsive">
            <GoogleMap />
          </div>
        </div>
      </section>
      <section className="form-section">
        {showForm && <CreateReviewForm doctorId={id} />}
      </section>
    </>
  );
}
