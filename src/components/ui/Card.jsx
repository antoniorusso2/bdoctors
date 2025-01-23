import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

export default function Card({ doctor }) {
  const voteStars = [1, 2, 3, 4, 5];
  return (
    <>
      <Link to={`doctors/${doctor.id}`} className="card border-0 main-card p-3">
        <div className="card-body card-body-background">
          <p className="card-title">
            {doctor.first_name}
            <span> </span>
            {doctor.last_name}
          </p>
          <p className="mb-3">Specialista in {doctor.specialization}</p>

          <div
            className="mb-4
          "
          >
            {voteStars.map((n, i) => {
              return n <= doctor.rating ? (
                <StarSolid key={i} className="starAvg text-warning"></StarSolid>
              ) : (
                <StarIcon key={i} className="starAvg text-warning"></StarIcon>
              );
            })}
          </div>
          <div className="d-flex justify-content-center ">
            <div className="btn-contact-container ">
              <a href="#" className=" btn contact-btn">
                Contatta lo specialista
              </a>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
