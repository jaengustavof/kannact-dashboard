import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/api/patientsApi";
import { Patient } from "@/types/api.types";
import { useState } from "react";
import { PatientsTable } from "@/components/PatientsTable";
import { PatientsPagination } from "@/components/PatientsPagination";
import AddPatient from "@/components/AddPatient";

export default function PatientsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const {
    data: patients,
    isLoading,
    error,
  } = useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  if (isLoading) return <div>Loading patients...</div>;
  if (error) return <div>Error loading patients.</div>;

  const filteredPatients =
    patients?.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="patients-list">
      <h1 className="patients-list__heading">Patients List</h1>

      <div className="patients-list__actions">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-sm"
        />
        <AddPatient onPatientAdded={() => setCurrentPage(1)} />
      </div>
      <div className="patients-list__table">
        <PatientsTable
          key={patients?.length}
          patients={currentPatients || []}
        />

        <PatientsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
