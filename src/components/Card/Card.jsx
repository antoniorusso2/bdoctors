export default function Card({ doctor }) {
  return (
    <div className="card p-3">
      <p className="card-title">
        {doctor.first_name}
        <span> </span>
        {doctor.last_name}
      </p>
    </div>
  );
}
