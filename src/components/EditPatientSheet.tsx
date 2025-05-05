import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatient } from "@/api/patientsApi";
import { Patient } from "@/types/api.types";

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

type EditPatientSheetProps = {
  patient: Patient;
  onClose: () => void;
};

type FormValues = {
  name: string;
  age: number;
  condition: string;
};

export default function EditPatientSheet({
  patient,
  onClose,
}: EditPatientSheetProps) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: patient.name,
      age: patient.age,
      condition: patient.condition,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) => updatePatient(patient.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      onClose(); // cerrar el sheet después de actualizar
      reset();
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to the patient and click save.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Patient name
              </Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                Age
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
                Condition
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
              {mutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
