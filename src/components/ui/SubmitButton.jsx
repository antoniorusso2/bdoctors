export default function SubmitButton({ children, className = "", pending }) {
  return (
    <button
      type="submit"
      className={`btn bg-primary text-white ${className} ${
        pending ? "opacity-75" : ""
      }`}
      disabled={pending}
    >
      {pending ? "Loading..." : children}
    </button>
  );
}
