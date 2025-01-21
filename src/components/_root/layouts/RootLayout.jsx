import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="container my-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
