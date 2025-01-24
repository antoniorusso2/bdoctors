import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/api";
import { Star } from "lucide-react";
import CreateReviewForm from "../../forms/CreateReviewForm";
import FormAlert from "../../ui/FormAlert";
import { LoaderCircle } from "lucide-react";

export default function DoctorPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [showForm, setShowForm] = useState(false);

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


    // Funzione per recuperare le recensioni
    const fetchReviews = async () => {
      try {
        console.log("Fetching reviews for doctor with ID:", id);
        const response = await api.get(`/doctors/${id}/reviews`);
        console.log("Reviews fetched successfully:", response.data);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchDoctor(); 
    fetchReviews();
  }, [id]);

  // Funzione per calcolare la media voti
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
    return (total / reviews.length).toFixed(1); 
  };

  // Funzione per generare le stelle
  const renderStars = (rating) => {
     const fullStars = Math.floor(rating); 
     const emptyStars = 5 - fullStars; 
     return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <Star key={`full-${index}`} fill="gold" color="gold" size={20} /> // Stelle piene
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <Star key={`empty-${index}`} color="#ccc" size={20} /> // Stelle vuote
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

  console.log(doctor);

  return (
    <>
      <section>

          <h2>{`${doctor.first_name} ${doctor.last_name}`}</h2>
          <p>Email: {doctor.email}</p>
          <p>Telefono: {doctor.phone}</p>
          <p>Indirizzo: {doctor.address}</p>

        <button
          className="btn btn-primary my-3"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Nascondi Form" : "Mostra Form"}
        </button>

          {showForm && <CreateReviewForm doctorId={id} />}

          {/* Media dei voti */}
            <div className="mt-4">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {renderStars(calculateAverageRating())}
                <span>{calculateAverageRating()}/5</span>
              </div>
            </div>

         {/* Sezione recensioni */}
          <div className="mt-5">
            <h3>Recensioni:</h3>
            {reviews.length === 0 ? (
              <p>Nessuna recensione disponibile.</p>
            ) : (
              <ul className="list-group">
                {reviews.map((review) => (
                  <li className="list-group-item" key={review.id}>
                    <strong>{`${review.first_name} ${review.last_name}`}</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
      {showForm && (
        <CreateReviewForm
          doctorId={id}
          onReviewCreate={(review) =>
            setDoctor({ ...doctor, reviews: [review, ...doctor.reviews] })
          }
        />
      )}
    </>
  );
}
