import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/_root/layouts/RootLayout";
import HomePage from "./components/_root/pages/HomePage";
import CreateDoctorPage from "./components/_root/pages/CreateDoctorPage";
import DoctorPage from "./components/_root/pages/DoctorPage";
import SearchDoctorsPage from "./components/_root/pages/SearchDoctorsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="doctors">
          <Route path=":id" element={<DoctorPage />} />
          <Route path="new" element={<CreateDoctorPage />} />
          <Route path="search" element={<SearchDoctorsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
