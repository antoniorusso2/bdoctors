import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Card({ doctor }) {
  return (
    <>
      <Link
        to={`/doctors/${doctor.id}`}
        className="card border-0 main-card p-3 card-background text-decoration-none"
      >
        <div className="card-body">
          <p className="card-title">
            {doctor.first_name}
            <span> </span>
            {doctor.last_name}
          </p>
          <p className="purple mb-3">Specialista in {doctor.specializations}</p>

          <div
            className="mb-4"
            >
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className="starAvg text-warning"
                fill={_ + 1 <= doctor.avg_vote ? "currentColor" : "transparent"}
              />
            ))}
          </div>
          <div className="d-flex justify-content-center">
            <div className="btn-contact-container">
              <button className="btn contact-btn">
                Contatta lo specialista
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
