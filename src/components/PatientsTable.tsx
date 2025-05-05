import { Link } from "react-router-dom";
import { Patient } from "@/types/api.types";
import { useState } from "react";
import { deletePatient } from "@/api/patientsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EditPatientSheet from "./EditPatientSheet";

type PatientsTableProps = {
  patients: Patient[];
};

export function PatientsTable({ patients }: PatientsTableProps) {
  const queryClient = useQueryClient();
  const [openSheetPatient, setOpenSheetPatient] = useState<Patient | null>(
    null
  );

  const mutation = useMutation({
    mutationFn: (id: string) => deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Patient removed", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  const removePatient = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <Table>
      <TableCaption>A list of your recent patients.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Patient Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead className="text-right">Condition</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-medium">
              {patient.id.slice(0, 3)}...{patient.id.slice(-3)}
            </TableCell>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.age}</TableCell>
            <TableCell className="text-right">{patient.condition}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-2">
                  <Button variant="outline" size="icon">
                    <Settings />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link className=" w-full" to={`/patients/${patient.id}`}>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setOpenSheetPatient(patient)}
                      className="p-0 focus:bg-transparent cursor-pointer w-full"
                    >
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => removePatient(patient.id)}
                      className="p-0 focus:bg-transparent cursor-pointer w-full text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {openSheetPatient && (
        <EditPatientSheet
          patient={openSheetPatient}
          onClose={() => setOpenSheetPatient(null)}
        />
      )}
    </Table>
  );
}
