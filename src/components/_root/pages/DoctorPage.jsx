import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/api";
import { Star, LoaderCircle } from "lucide-react";
import CreateReviewForm from "../../forms/CreateReviewForm";
import GoogleMap from "../../ui/Map";
import FormAlert from "../../ui/FormAlert";
import EmailDoctorForm from "../../ui/EmailDoctorForm"; // Import the new component

export default function DoctorPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await api.get(`/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  // Funzione per calcolare la media voti
  const calculateAverageRating = () => {
    if (doctor.reviews.length === 0) return 0;
    const total = doctor.reviews.reduce(
      (sum, review) => sum + parseFloat(review.rating),
      0
    );
    return (total / doctor.reviews.length).toFixed(1);
  };

  // Funzione per generare le stelle
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <Star key={`full-${index}`} fill="gold" color="gold" size={20} />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <Star key={`empty-${index}`} color="#ccc" size={20} />
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <LoaderCircle className="loader" size={60} />
      </div>
    );
  }

  if (!doctor) {
    return <FormAlert error={{ message: "Medico non trovato" }} />;
  }

  return (
    <>
      <section className="container mt-5">
        <div className="row d-flex flex-wrap" style={{ alignItems: "stretch" }}>
          <div className="col-12 col-md-8 p-4 card-background ">
            <h3 className="mb-4">
              Medico specialista in {doctor.specializations}
            </h3>
            <h2 className="mb-5">{`${doctor.first_name} ${doctor.last_name}`}</h2>
            <p>Email: {doctor.email}</p>
            <p>Telefono: {doctor.phone}</p>
            <p>Indirizzo: {doctor.address}</p>
          </div>

          <div
            className="col-12 col-md-4 mb-4"
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <div
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <GoogleMap />
            </div>
          </div>
        </div>
      </section>

      <button
        className="btn btn-primary my-3"
        onClick={() => setShowEmailForm(!showEmailForm)}
      >
        {showEmailForm ? "Chiudi form" : "Contatta tramite e-mail"}
      </button>

      <section>
        {showEmailForm && <EmailDoctorForm doctorEmail={doctor.email} />}
      </section>

      <button
        className="btn btn-primary my-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Nascondi Recensione" : "Scrivi una recensione"}
      </button>

      <section className="form-section">
        {showForm && (
          <CreateReviewForm
            doctorId={id}
            onReviewCreate={(review) =>
              setDoctor({ ...doctor, reviews: [review, ...doctor.reviews] })
            }
          />
        )}
      </section>

      <section>
        {/* Media dei voti */}
        <div className="mt-4">
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "bold",
            }}
          >
            Media delle recensioni:
            {renderStars(calculateAverageRating())}
            <span>{calculateAverageRating()}/5</span>
          </p>
        </div>
      </section>

      <section>
        <div className="mt-5">
          <h3>Recensioni:</h3>
          {doctor.reviews.length === 0 ? (
            <p>Nessuna recensione disponibile.</p>
          ) : (
            <ul className="list-group">
              {doctor.reviews.map((review) => (
                <li
                  className="list-group-item"
                  key={review.id}
                  style={{
                    padding: "15px",
                    marginBottom: "15px",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <strong>{`${review.first_name} ${review.last_name}`}</strong>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {/* Stelle accanto al rating */}
                    {renderStars(review.rating)}
                    <span>{review.rating}/5</span>
                  </div>
                  <p>{review.review_text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
