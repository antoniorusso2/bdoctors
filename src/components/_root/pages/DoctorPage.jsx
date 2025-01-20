import { useParams } from "react-router-dom";
import CreateReviewForm from "../../forms/CreateReviewForm";

export default function DoctorPage() {
  const { id } = useParams();

  return (
    <>
      <section>
        <h2>Crea la tua recensione</h2>
        <CreateReviewForm doctorId={id} />
      </section>
    </>
  );
}
