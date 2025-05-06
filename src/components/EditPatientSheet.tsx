import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatient } from "@/api/patientsApi";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import EDITPATIENTSHEET from "@/constants/EditPatientSheet";
import { EditPatientSheetProps } from "@/types/patients.types";
import { EditPatientSheetFormValues } from "@/types/patients.types";
import { toast } from "react-toastify";

export default function EditPatientSheet({
  patient,
  onClose,
}: EditPatientSheetProps) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<EditPatientSheetFormValues>(
    {
      defaultValues: {
        name: patient.name,
        age: patient.age,
        condition: patient.condition,
      },
    }
  );

  const mutation = useMutation({
    mutationFn: (data: EditPatientSheetFormValues) =>
      updatePatient(patient.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      onClose();
      reset();
      toast.success("Patient has been edited", {
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

  const onSubmit = (data: EditPatientSheetFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SheetHeader>
            <SheetTitle>{EDITPATIENTSHEET.EDIT_PROFILE}</SheetTitle>
            <SheetDescription>
              {EDITPATIENTSHEET.EDIT_DESCRIPTION}
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {EDITPATIENTSHEET.PATIENT_NAME}
              </Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                {EDITPATIENTSHEET.AGE}
              </Label>
              <Input
                id="age"
                type="number"
                {...register("age", { valueAsNumber: true, required: true })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="condition" className="text-right">
                {EDITPATIENTSHEET.CONDITION}
              </Label>
              <Input
                id="condition"
                {...register("condition", { required: true })}
                className="col-span-3"
              />
            </div>
          </div>

          <SheetFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending
                ? EDITPATIENTSHEET.SAVING
                : EDITPATIENTSHEET.SAVE_CHANGES}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
