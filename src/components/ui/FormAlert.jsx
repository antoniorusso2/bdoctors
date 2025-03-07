export default function FormAlert({ success, error }) {
  return (
    <>
      {error?.message && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          Dati inviati con successo
        </div>
      )}
    </>
  );
}
