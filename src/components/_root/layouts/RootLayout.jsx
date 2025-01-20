import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
