export default function Footer() {
  return (
    <>
      <footer className="text-center text-lg-start footer-custom text-muted">
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className=" col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3">Salus SRL</i>
                </h6>
                <p>
                  Azienda Sanitaria Salus offre servizi medici avanzati,
                  assistenza personalizzata e prevenzione sanitaria, garantendo
                  qualità e innovazione per migliorare la salute e il benessere
                  della comunità.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Info prestazioni
                </h6>
                <p>
                  <a href="#!" className="text-reset">
                    SSN
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Private
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    A domicilio
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Appuntamenti
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Link utili</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Prezzi e pagamenti
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Impostazioni account
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Contatti
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Aiuto
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contattaci</h6>
                <p>
                  Azienda Sanitaria Salus Via della Salute, 123, 00100 Roma
                  (RM), Italia
                </p>
                <p>Email: info@salus-sanitaria.it </p>
                <p>Tel: +39 06 1234 5678</p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}
