import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/_root/layouts/RootLayout";
import HomePage from "./components/_root/pages/HomePage";
import CreateDoctorPage from "./components/_root/pages/CreateDoctorPage";
import DoctorPage from "./components/_root/pages/DoctorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="doctors/:id" element={<DoctorPage />} />
        <Route path="doctors/new" element={<CreateDoctorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
