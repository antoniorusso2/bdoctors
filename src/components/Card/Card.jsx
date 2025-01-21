import { Link } from "react-router-dom";

export default function Card({ doctor }) {
  return (
    <>
      <div className="card p-3">
        <div className="card-body">
          <p className="card-title">
            {doctor.first_name}
            <span> </span>
            {doctor.last_name}
          </p>
          <p>Specialista in {doctor.specialization}</p>
        </div>
        <Link to={`doctors/${doctor.id}`} className="btn stretched-link"></Link>
      </div>
    </>
  );
}
