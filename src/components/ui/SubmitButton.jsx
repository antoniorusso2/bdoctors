/* eslint-disable react/prop-types */
export default function SubmitButton({ children, className = '', pending }) {
  return (
    <button
      type="submit"
      className={`btn btn-success  ${className} ${pending ? 'opacity-75' : ''}`}
      disabled={pending}
    >
      {pending ? 'Loading...' : children}
    </button>
  );
}
