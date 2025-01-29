import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center">
      <LoaderCircle className="loader" size={60} />
    </div>
  );
}
