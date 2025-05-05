import { Routes, Route, Navigate } from "react-router-dom";
import PatientsList from "@/pages/PatientsList";
import PatientDetail from "@/pages/PatientDetail";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react/jsx-runtime";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/patients" />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
