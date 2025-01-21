import { Link } from "react-router-dom";

export default function Card({ doctor }) {
  return (
    <>
      <Link to={`doctors/${doctor.id}`} className="card p-3">
        <div className="card-body">
          <p className="card-title">
            {doctor.first_name}
            <span> </span>
            {doctor.last_name}
          </p>
          <p className="mb-0">Specialista in {doctor.specialization}</p>
        </div>
      </Link>
    </>
  );
}
